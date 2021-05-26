const { QueryTypes } = require('sequelize');

const sequelize = require('../connectors/database');

exports.getTutorialAvailability = async (fromDate, toDate) => {
  return sequelize.query(
    'select fromTime, toTime, date, null as dayOfWeek from tutorial_availabilities where  date > ? AND date < ? union  select fromTime, toTime, null as date, dayOfWeek from tutorial_availability_defaults where dayOfWeek not in (select distinct DAYOFWEEK(date) from tutorial_availabilities where date > ? AND date < ?);',
    {
      replacements: [fromDate, toDate, fromDate, toDate],
      type: QueryTypes.SELECT,
    }
  );
};
