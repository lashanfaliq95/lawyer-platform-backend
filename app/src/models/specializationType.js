const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const SpecializationType = sequelize.define(
  'specialization_types',
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

module.exports = SpecializationType;
