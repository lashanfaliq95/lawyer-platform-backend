const { QueryTypes } = require('sequelize');

const sequelize = require('../connectors/database');

exports.getTutorialAvailability = async (fromDate, toDate) => {
  return sequelize.query(
    'select from_time as fromTime, to_time as toTime, date, null as day_of_week from tutorial_availabilities where  date > ? AND date < ? union  select from_time, to_time, null as date, day_of_week from tutorial_availability_defaults where day_of_Week not in (select distinct DAYOFWEEK(date) from tutorial_availabilities where date > ? AND date < ?);',
    {
      replacements: [fromDate, toDate, fromDate, toDate],
      type: QueryTypes.SELECT,
    }
  );
};
