const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Auth = sequelize.define('auth', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Auth;
