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
            next(ApiError.badRequest({function: 'CourseController.create', message: e.message}))
        }
    }

    async getByLogin(req, resp) {
        let { page, limit, login } = req.query;

        page = page || 1;
        limit = limit || 10;

        let offset = limit * (page - 1);
        let courses;

        if (login) {

            const user = await User.findOne({ where: { login } });
            if (!user) {
                next(ApiError.badRequest({function: 'CourseController.getByLogin', message: 'Пользователь не найден'}))
            }
            const userId = user.id;
            courses = await Course.findAll({ where: { userId, active: true }, limit, offset });
        }

        logWithIP('info', {message: 'GET_COURSES_BY_LOGIN'});
        return resp.json(courses);
    }

    async getById(req, resp, next) {
        try {
            let { id } = await req.params;
            if (id) {
                const course = await Course.findOne({ where: { uuid: id, active: true } });
                logWithIP('info', {message: 'GET_COURSE_BY_ID', course});
                return resp.json(course)
            }
            next(ApiError.internalError('Не вышло найти курс'))
        } catch (error) {
            next(ApiError.badRequest({function: 'CourseController.getById', message: error.message}))
        }

    }

    async delete(req, resp, next) {
        try {
            let { id } = await req.params;
            if (id) {
                const course = await Course.findOne({ where: { uuid: id, active: true } });
                await course.update({active: false})
                await course.save();
                logWithIP('info', {message: 'DELETE', course});
                return resp.json(
                    {
                        course,
                        result: 1
                    }
                )
            }
            next(ApiError.internalError('Не вышло удалить курс'))
        } catch (error) {
            next(ApiError.badRequest({function: 'CourseController.delete', message: error.message}))
        }
    }
}

module.exports = new CourseController();