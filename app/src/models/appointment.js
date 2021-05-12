const Sequelize = require('sequelize');

const sequelize = require('../connectors/database');
const User = require('./user');
const TimeSlot = require('./timeSlot');

const Appointment = sequelize.define(
  'appointments',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Appointment.belongsTo(User, { targetKey: 'id', foreignKey: 'user_id' });
Appointment.belongsTo(User, { targetKey: 'id', foreignKey: 'lawyer_id' });
Appointment.belongsTo(TimeSlot, {
  targetKey: 'id',
  foreignKey: 'time_slot_id',
});

module.exports = Appointment;
