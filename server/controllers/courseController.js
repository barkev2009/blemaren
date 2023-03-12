const { Course, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const { logWithIP } = require('../logs/logger');

class CourseController {
    async create(req, resp, next) {
        try {
            const { start_date, end_date, course_status, userId } = req.body;

            const course = await Course.create({ start_date, end_date, course_status, userId });

            logWithIP('info', {message: 'CREATE', course});
            return resp.json({ course })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getByLogin(req, resp) {
        let { login } = req.params;

        let { page, limit } = req.query;

        page = page || 1;
        limit = limit || 5;

        let offset = limit * (page - 1);
        let courses;

        if (login) {

            const user = await User.findOne({ where: { login } });
            if (!user) {
                next(ApiError.badRequest('Пользователь не найден'))
            }
            const userId = user.id;
            courses = await Course.findAll({ where: { userId }, limit, offset });
        }

        logWithIP('info', {message: 'GET_COURSES_BY_LOGIN'});
        return resp.json(courses);
    }

    async getById(req, resp, next) {
        try {
            let { id } = await req.query;
            if (id) {
                const course = await Course.findOne({ where: { id } });
                logWithIP('info', {message: 'GET_COURSES_BY_ID', course});
                return resp.json(course)
            }
            next(ApiError.internalError('Не вышло найти курс'))
        } catch (error) {
            next(ApiError.internalError(error.message))
        }

    }
}

module.exports = new CourseController();