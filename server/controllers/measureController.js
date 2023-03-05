const { Measure, Course } = require('../models/models');
const ApiError = require('../error/ApiError');
const fs = require('fs');

class MeasureController {
    async create(req, resp, next) {
        try {
            const { measure_date, ph_level, day_time, pill_quantity, courseId, cycleId } = req.body;

            const measureDate = new Date(measure_date).toJSON().slice(0, 10);

            const course = await Course.findOne({where: {id: courseId}});

            const startDate = course.start_date;
            const cycle = Math.floor((new Date(measureDate) - startDate) / (1000 * 60 * 60 * 24 * 3));

            let check = await Measure.findAll({where: {cycle, day_time}});
            check = check.map(item => new Date(item.measure_date).toJSON().slice(0, 10)).filter(item => item === measureDate);
            if (check.length !== 0) {
                next(ApiError.badRequest(`Запись с циклом ${cycle}, датой измерения ${measureDate} и временем дня ${day_time} уже существует: id=${check.id}`))
            } else {
                const measure = await Measure.create({ measure_date: measureDate, ph_level, day_time, pill_quantity, courseId, cycle });
                return resp.json({ measure })
            }

        } catch (e) {
            next(ApiError.badRequest(e.message))
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
                const measure = await Measure.findAll({ where: { courseId } });

                const content = JSON.stringify(measure);
                fs.writeFile(
                    `backup/measures_of_cycle_${measure[0].cycle}.json`, content, 'utf-8', (err) => {
                        if (err) {throw err};
                        console.log('Saved to test.json')
                    }
                )

                return resp.json(measure)
            }
            next(ApiError.internalError('Не вышло найти измерение'))
        } catch (error) {
            next(ApiError.internalError(error.message))
        }
    }

    async delete(req, resp, next) {
        try {
            let { id } = await req.params;
            if (id) {
                const measure = await Measure.findOne({ where: { id } });
                const result = await Measure.destroy({ where: { id } });
                return resp.json(
                    {
                        measure,
                        result
                    }
                )
            }
            next(ApiError.internalError('Не вышло удалить измерение'))
        } catch (error) {
            next(ApiError.internalError(error.message))
        }
    }
}

module.exports = new MeasureController();