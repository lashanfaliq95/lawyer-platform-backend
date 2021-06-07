const { STRING, INTEGER, DECIMAL, BOOLEAN } = require('sequelize');

const sequelize = require('../connectors/database');
const Role = require('./role');
const ExpertTypes = require('./expertTypes');
const  Firm  = require('./firm');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    mobilePhone: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    fax: STRING,
    road: STRING,
    houseNumber: STRING,
    city: STRING,
    zipCode: STRING,
    gender: STRING,
    profileImageUrl: STRING,
    coverImageUrl:STRING,
    longitude: DECIMAL(9, 6),
    latitude: DECIMAL(8, 6),
    expertId: INTEGER,
    legalIssues:STRING,
    buildingParking:STRING,
    buildingFloor:STRING,
    isAccountConfirmed: {
      type: BOOLEAN,
      defaultValue: 0,
    },
    isLawyerAcceptingNewClients: {
      type: BOOLEAN,
      defaultValue: 0,
    },
    isLawyerOfferingPhoneAndVisitingAppointments: {
      type: BOOLEAN,
      defaultValue: 0,
    },
    isRequireShortSummary:{
      type: BOOLEAN,
      defaultValue: 0,
    },
    isAppointmentRequireApproval:{
      type: BOOLEAN,
      defaultValue: 0,
    },
    isBuildingDisabledFriendly:{
      type: BOOLEAN,
      defaultValue: 0,
    },
  },
  { timestamps: false }
);

Users.belongsTo(Role, { targetKey: 'id', foreignKey: 'roleId' });
Users.belongsTo(ExpertTypes, { targetKey: 'id', foreignKey: 'expertId' });
Users.belongsTo(Firm, { targetKey: 'id', foreignKey: 'firmId' });
module.exports = Users;
