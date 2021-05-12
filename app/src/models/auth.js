const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Auth = sequelize.define(
  'auth',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    refresh_token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Auth;
