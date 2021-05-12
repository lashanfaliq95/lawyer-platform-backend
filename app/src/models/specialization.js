const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');
const SpecializationType = require('./specializationType');

const Specialization = sequelize.define(
  'specializations',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    specialization: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Specialization.belongsTo(SpecializationType, {
  targetKey: 'id',
  foreignKey: 'type',
});

module.exports = Specialization;
