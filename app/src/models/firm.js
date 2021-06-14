const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Firm = sequelize.define(
  'firms',
  {
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
  },
  { timestamps: false }
);

module.exports = Firm;
