const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const WeekDay = sequelize.define('week_days', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = WeekDay;
