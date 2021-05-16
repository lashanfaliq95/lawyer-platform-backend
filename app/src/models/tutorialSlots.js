const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

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
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    is_blocked: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = TimeSlot;
