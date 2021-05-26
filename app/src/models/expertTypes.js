const { INTEGER, STRING } = require('sequelize');

const sequelize = require('../connectors/database');

const ExpertTypes = sequelize.define(
  'expert_types',
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = ExpertTypes;
