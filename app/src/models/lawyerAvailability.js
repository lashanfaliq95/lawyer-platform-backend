const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const LawyerAvailability = sequelize.define('lawyer_availability', {
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
  dayOfWeek: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = LawyerAvailability;
