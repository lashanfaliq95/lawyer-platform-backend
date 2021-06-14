const { DATE, BOOLEAN, INTEGER } = require('sequelize');

const sequelize = require('../connectors/database');
const User = require('./user');
const TimeSlot = require('./timeSlot');
const WeekDay = require('./weekDay');

const LawyerAvailability = sequelize.define(
  'lawyer_availability',
  {
    date: {
      type: DATE,
      allowNull: false,
    },
    available: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

LawyerAvailability.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'lawyerId',
});
LawyerAvailability.belongsTo(WeekDay, {
  targetKey: 'id',
  foreignKey: 'dayOfWeek',
});
LawyerAvailability.belongsTo(TimeSlot, {
  targetKey: 'id',
  foreignKey: 'timeSlot',
});

module.exports = LawyerAvailability;
