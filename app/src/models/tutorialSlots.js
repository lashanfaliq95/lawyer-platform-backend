const { TIME, DATEONLY, BOOLEAN } = require('sequelize');

const sequelize = require('../connectors/database');

const TutorialAvailability = sequelize.define(
  'tutorial_availability',
  {
    from_time: {
      type: TIME,
      allowNull: false,
    },
    to_time: {
      type: TIME,
      allowNull: false,
    },
    date: {
      type: DATEONLY,
      allowNull: false,
    },
    is_blocked: {
      type: BOOLEAN,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = TutorialAvailability;
