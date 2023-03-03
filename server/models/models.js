const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { model, Sequelize } = require('../db');
const {ACTIVE, FINISHED, MORNING, DAY, EVENING} = require('./enum');

const User = sequelize.define(
    'user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: {type: DataTypes.STRING, allowNull: false},
        login: {type: DataTypes.STRING, unique: true, allowNull: false}
    }
)

const Course = sequelize.define(
    'course',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        start_date: {type: DataTypes.DATE, allowNull: false},
        end_date: {type: DataTypes.DATE, allowNull: true},
        course_status: {type: DataTypes.ENUM(ACTIVE, FINISHED), allowNull: false, defaultValue: ACTIVE}
    }
)

const Cycle = sequelize.define(
    'cycle',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        cycle_status: {type: DataTypes.ENUM(ACTIVE, FINISHED), allowNull: false, defaultValue: ACTIVE},
        avg_ph_level: {type: DataTypes.FLOAT, allowNull: false}
    }
)

const Measure = sequelize.define(
    'measure',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        measure_date: {type: DataTypes.DATE, allowNull: false},
        ph_level: {type: DataTypes.FLOAT, allowNull: false},
        day_time: {type: DataTypes.ENUM(MORNING, DAY, EVENING), allowNull: false},
        pill_quantity: {type: DataTypes.FLOAT, allowNull: false}
    }
)

const MeasureCycle = sequelize.define(
    'measure_cycle',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    }
)

Course.belongsTo(User);
User.hasMany(Course);

Measure.belongsTo(Course);
Course.hasMany(Measure);

Measure.belongsToMany(Cycle, {through: MeasureCycle});
Cycle.belongsToMany(Measure, {through: MeasureCycle})

module.exports = {
    User, Course, Cycle, Measure, MeasureCycle
};
