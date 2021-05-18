const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Specialization = sequelize.define(
  'specializations',
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

module.exports = Specialization;
