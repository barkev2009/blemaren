const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, name, login) => {
    return jwt.sign(
        {
            id,
            name,
            login
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async register(req, resp, next) {
        const { name, login } = req.body;

        if (!name || !login) {
            return next(ApiError.badRequest('Некорректные имя и логин'));
        }
        if (!name) {
            return next(ApiError.badRequest('Некорректное имя'));
        }
        if (!login) {
            return next(ApiError.badRequest('Некорректный логин'));
        }

        const candidate = await User.findOne({ where: { login } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
        }

        const user = await User.create({ name, login });
        const token = generateJWT(user.id, user.name, user.login);

        return resp.json({ token })

    }

    async login(req, resp, next) {
        const { login } = req.body;
        const candidate = await User.findOne({ where: { login } });

        if (!candidate) {
            return next(ApiError.internalError('Пользователь не найден'))
        }

        const token = generateJWT(candidate.id, candidate.name, candidate.login);
        return resp.json({ token })
    }

    async checkAuth(req, resp, next) {

        const token = generateJWT(req.user.id, req.user.name, req.user.login);
        return resp.json({ token })
    }

    async checkCode(req, resp, next) {
        const token = await req.body;
        console.log(token);
        return resp.json({ token })
    }
}

module.exports = new UserController();