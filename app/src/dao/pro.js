const { QueryTypes } = require('sequelize');

const sequelize = require('../connectors/database');

exports.getTutorialAvailability = async (fromDate, toDate) => {
  return sequelize.query(
    'select from_time, to_time, date, null as day_of_week from tutorial_availability where  date > ? AND date < ? union  select from_time, to_time, null as date, day_of_week from default_tutorial_availability where day_of_Week not in (select distinct DAYOFWEEK(date) from tutorial_availability where date > ? AND date < ?);',
    {
      replacements: [fromDate, toDate, fromDate, toDate],
      type: QueryTypes.SELECT,
    }
  );
};
