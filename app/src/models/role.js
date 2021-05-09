const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Role = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Role;
