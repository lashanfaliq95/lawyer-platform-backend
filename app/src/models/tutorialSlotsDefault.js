const { TIME, INTEGER } = require('sequelize');

const sequelize = require('../connectors/database');
const WeekDay = require('./weekDay');

const TutorialAvailabilityDefault = sequelize.define(
  'tutorial_availability_defaults',
  {
    fromTime: {
      type: TIME,
      allowNull: false,
    },
    toTime: {
      type: TIME,
      allowNull: false,
    },
    dayOfWeek: {
      type: INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

TutorialAvailabilityDefault.belongsTo(WeekDay, {
  targetKey: 'id',
  foreignKey: 'dayOfWeek',
});

module.exports = TutorialAvailabilityDefault;
