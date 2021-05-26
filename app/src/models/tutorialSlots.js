const { TIME, DATEONLY, BOOLEAN } = require('sequelize');

const sequelize = require('../connectors/database');

const TutorialAvailability = sequelize.define(
  'tutorial_availability',
  {
    fromTime: {
      type: TIME,
      allowNull: false,
    },
    toTime: {
      type: TIME,
      allowNull: false,
    },
    date: {
      type: DATEONLY,
      allowNull: false,
    },
    isBlocked: {
      type: BOOLEAN,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = TutorialAvailability;
