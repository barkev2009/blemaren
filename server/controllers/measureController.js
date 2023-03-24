const { Measure, Course } = require('../models/models');
const ApiError = require('../error/ApiError');
const fs = require('fs');
const { logWithIP } = require('../logs/logger');
const { testSend } = require('../mail/mailSender');

const getDate = (dateString) => {
    const [day, month, year] = dateString.split('.')
    return `${year}-${month}-${day}`
}

class MeasureController {
    async create(req, resp, next) {
        try {
            const { measure_date, ph_level, day_time, pill_quantity, courseId, cycleId } = req.body;

            const measureDate = new Date(measure_date).toLocaleDateString().slice(0, 10);

            const course = await Course.findOne({where: {uuid: courseId, active: true}});

            const startDate = course.start_date;
            let cycle = Math.floor((new Date(getDate(measureDate)) - new Date(getDate(startDate.toLocaleDateString()))) / (1000 * 60 * 60 * 24 * 3));
            console.log(cycle);
            console.log((new Date(getDate(measureDate)) - startDate) / (1000 * 60 * 60 * 24 * 3));
            console.log(measureDate);
            console.log(startDate);
            if (new Date(getDate(measureDate)).toLocaleDateString() === new Date(startDate).toLocaleDateString()) {
                cycle = 0
            }

            let check = await Measure.findAll({where: {cycle, day_time, active: true, courseId: course.id}});
            check = check.map(({id, measure_date}) => ({id, date: new Date(measure_date).toLocaleDateString().slice(0, 10)})).filter(item => item.date === measureDate);
            if (check.length !== 0) {
                next(ApiError.badRequest(`Запись с циклом ${cycle}, датой измерения ${measureDate} и временем дня ${day_time} уже существует: id=${check.map(({id}) => id)}`))
            } else {
                const measure = await Measure.create({ measure_date: getDate(measureDate), ph_level, day_time, pill_quantity, courseId: course.id, cycle });
                
                logWithIP('info', {message: 'CREATE', measure});
                testSend();
                return resp.json({ measure })
            }

        } catch (e) {
            next(ApiError.badRequest({function: 'MeasureController.create', message: e.message}))
        }
    }

    async get(req, resp, next) {
        try {
            let { id, courseId } = await req.query;
            if (id) {
                const measure = await Measure.findOne({ where: { id } });
                return resp.json(measure)
            }
            if (courseId) {
                const course = await Course.findOne({where: {uuid: courseId, active: true}});
                const measure = await Measure.findAll({ where: { courseId: course.id, active: true } });

                const content = JSON.stringify(measure);
                const currentDate = new Date().toJSON().slice(0, 10);
                if (measure.length !== 0) {
                    const fileName = `backup/measures_of_cycle_${measure[0].cycle}_${currentDate}.json`
                    fs.writeFile(
                        fileName, content, 'utf-8', (err) => {
                            if (err) {throw err};
                            console.log(`Saved to ${fileName}`)
                        }
                    )
                }
                return resp.json(measure)
            }
            next(ApiError.internalError('Не вышло найти измерение'))
        } catch (error) {
            next(ApiError.badRequest({function: 'MeasureController.get', message: error.message}))
        }
    }

    async delete(req, resp, next) {
        try {
            let { id } = await req.params;
            if (id) {
                const measure = await Measure.findOne({ where: { id } });
                await measure.update({active: false})
                await measure.save();
                logWithIP('info', {message: 'DELETE', measure});
                return resp.json(
                    {
                        measure,
                        result: 1
                    }
                )
            }
            next(ApiError.internalError('Не вышло удалить измерение'))
        } catch (error) {
            next(ApiError.badRequest({function: 'MeasureController.delete', message: error.message}))
        }
    }
}

module.exports = new MeasureController();