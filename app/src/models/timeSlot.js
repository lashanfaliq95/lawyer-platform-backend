const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const TimeSlot = sequelize.define('time_slot', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  timeRange: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = TimeSlot;
