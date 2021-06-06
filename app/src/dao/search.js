const { Op, QueryTypes } = require('sequelize');

const { Specialization, Language, User } = require('../models/index');
const sequelize = require('../connectors/database');
const queryHelper = require('../utils/queryHelper');

exports.getSpecializationsFilters = () => {
  return Specialization.findAll();
};

exports.getLanguagesFilters = () => {
  return Language.findAll();
};

exports.getNameOrFirmSuggestions = (nameOrFirm) => {
  return sequelize.query(
    'SELECT name from specializations WHERE name LIKE ?' +
      " UNION select CONCAT(firstName,' ', lastName ) as name from users where roleId=2 AND CONCAT(firstName, ' ', lastName) LIKE ?",
    {
      replacements: [nameOrFirm, nameOrFirm],
      type: QueryTypes.SELECT,
    }
  );
};

exports.getLocationSuggestions = (nameOrFirm) => {
  return User.findAll({ where: { location: { [Op.substring]: nameOrFirm } } });
};

exports.getSearchResults = ({
  specializations,
  languages,
  nameOrFirm,
  page,
  location,
  isAppointmentNotRequireApproval,
}) => {
  console.log(
    'isAppointmentNotRequireApproval',
    isAppointmentNotRequireApproval === 'false'
  );
  const searchQuery = queryHelper.createSearchQuery({
    specializations,
    languages,
    nameOrFirm,
    page,
    location,
    isAppointmentNotRequireApproval,
  });

  return sequelize.query(searchQuery, { type: QueryTypes.SELECT });
};
