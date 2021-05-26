const Appointment = require('./appointment');
const Auth = require('./auth');
const Language = require('./language');
const LawyerAvailability = require('./lawyerAvailability');
const Role = require('./role');
const Specialization = require('./specialization');
const TimeSlot = require('./timeSlot');
const User = require('./user');
const UserLanguage = require('./userLanguage');
const UserSpecialization = require('./userSpecialization');
const WeekDay = require('./weekDay');
const UserMessages = require('./userMessages');
const TutorialSlot = require('./tutorialSlots');
const TutorialSlotDefault = require('./tutorialSlotsDefault');
const ExpertTypes = require('./expertTypes');
const ResetToken = require('./resetToken');
const ConfirmationToken = require('./confirmationToken');

module.exports = {
  Appointment,
  Auth,
  Language,
  LawyerAvailability,
  Role,
  Specialization,
  TimeSlot,
  User,
  UserLanguage,
  UserSpecialization,
  WeekDay,
  UserMessages,
  TutorialSlot,
  TutorialSlotDefault,
  ExpertTypes,
  ResetToken,
  ConfirmationToken,
};
