const { TIME, INTEGER } = require('sequelize');

const sequelize = require('../connectors/database');
const WeekDay = require('./weekDay');

const TutorialAvailabilityDefault = sequelize.define(
  'tutorial_availability_defaults',
  {
    from_time: {
      type: TIME,
      allowNull: false,
    },
    to_time: {
      type: TIME,
      allowNull: false,
    },
    day_of_week: {
      type: INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

TutorialAvailabilityDefault.belongsTo(WeekDay, {
  targetKey: 'id',
  foreignKey: 'day_of_week',
});

module.exports = TutorialAvailabilityDefault;
