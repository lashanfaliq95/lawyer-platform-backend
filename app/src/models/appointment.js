const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const Appointment = sequelize.define('appointments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lawyerId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timeSlot: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Appointment;
