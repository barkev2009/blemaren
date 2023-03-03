const { Cycle } = require('../models/models');
const ApiError = require('../error/ApiError');

class CycleController {
    async create(req, resp, next) {
        try {
            const { avg_ph_level, cycle_status } = req.body;

            const cycle = await Cycle.create({ avg_ph_level, cycle_status });

            return resp.json({ cycle })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getById(req, resp, next) {
        try {
            let { id } = await req.query;
            if (id) {
                const cycle = await Cycle.findOne({ where: { id } });
                return resp.json(cycle)
            }
            next(ApiError.internalError('Не вышло найти цикл'))
        } catch (error) {
            next(ApiError.internalError(error.message))
        }

    }
}

module.exports = new CycleController();