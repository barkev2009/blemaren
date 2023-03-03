const { Measure, MeasureCycle } = require('../models/models');
const ApiError = require('../error/ApiError');

class MeasureController {
    async create(req, resp, next) {
        try {
            const { measure_date, ph_level, day_time, pill_quantity, courseId, cycleId } = req.body;

            const measure = await Measure.create({ measure_date, ph_level, day_time, pill_quantity, courseId });

            if (cycleId) {
                const measureCycle = MeasureCycle.create({measureId: measure.id, cycleId})
                return resp.json({ measure, measureCycle })
            }

            return resp.json({ measure })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, resp, next) {
        try {
            let { id, courseId } = await req.query;
            console.log(req.query);
            if (id) {
                const measure = await Measure.findOne({ where: { id } });
                return resp.json(measure)
            }
            if (courseId) {
                const measure = await Measure.findAll({ where: { courseId } });
                return resp.json(measure)
            }
            next(ApiError.internalError('Не вышло найти измерение'))
        } catch (error) {
            next(ApiError.internalError(error.message))
        }
    }
}

module.exports = new MeasureController();