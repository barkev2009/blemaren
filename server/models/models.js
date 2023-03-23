const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { model, Sequelize } = require('../db');
const {ACTIVE, FINISHED, MORNING, DAY, EVENING} = require('./enum');

const User = sequelize.define(
    'user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {type: DataTypes.STRING, allowNull: false},
        login: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: true}
    }
)

const Course = sequelize.define(
    'course',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: {type: DataTypes.UUID, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        start_date: {type: DataTypes.DATE, allowNull: false},
        end_date: {type: DataTypes.DATE, allowNull: true},
        course_status: {type: DataTypes.ENUM(ACTIVE, FINISHED), allowNull: false, defaultValue: ACTIVE}
    }
)

const Measure = sequelize.define(
    'measure',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        measure_date: {type: DataTypes.DATE, allowNull: false},
        ph_level: {type: DataTypes.FLOAT, allowNull: false},
        day_time: {type: DataTypes.ENUM(MORNING, DAY, EVENING), allowNull: false},
        pill_quantity: {type: DataTypes.FLOAT, allowNull: false},
        cycle: {type: DataTypes.INTEGER, allowNull: false},
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
    }
)

Course.belongsTo(User);
User.hasMany(Course);

Measure.belongsTo(Course);
Course.hasMany(Measure);

module.exports = {
    User, Course, Measure
};
