const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');

const LawyerAvailability = sequelize.define(
  'lawyer_availability',
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

// foreign keys and primary key to be added
// FOREIGN KEY (dayOfWeek) REFERENCES week_days(id),
// FOREIGN KEY (time_slot) REFERENCES time_slot(id),
// FOREIGN KEY (laweyerId) REFERENCES users(id),
// PRIMARY KEY(laweyerId,time_slot,date)

module.exports = LawyerAvailability;
