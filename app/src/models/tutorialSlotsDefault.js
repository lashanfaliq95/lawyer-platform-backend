const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');
const WeekDay = require('./user');

const TimeSlot = sequelize.define(
  'tutorial_availability',
  {
    from_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    to_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    day_of_week: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

TimeSlot.belongsTo(WeekDay, {
  targetKey: 'id',
  foreignKey: 'day_of_week',
});

module.exports = TimeSlot;
