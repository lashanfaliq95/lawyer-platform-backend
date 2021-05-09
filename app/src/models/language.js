const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Language = sequelize.define('languages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Language;
