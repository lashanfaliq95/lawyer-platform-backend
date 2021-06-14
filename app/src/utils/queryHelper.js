const mysql = require('mysql2');

const leftJoin = 'LEFT JOIN ?? on ??=?? ';
const inArray = '?? in (?) AND ';

const getJoinQuery = ({
  specializations,
  languages,
  isAppointmentNotRequireApproval,
}) => {
  let joinStatement = '';
  let whereConditions = '';

  if (specializations && specializations.length > 0) {
    joinStatement =
      joinStatement +
      mysql.format(leftJoin, [
        'user_specializations',
        'users.id',
        'user_specializations.userId',
      ]);

    whereConditions =
      whereConditions +
      mysql.format(inArray, ['specialization_id', specializations]);
  }
  if (languages && languages.length > 0) {
    joinStatement =
      joinStatement +
      mysql.format(leftJoin, [
        'user_languages',
        'users.id',
        'user_languages.userId',
      ]);

    whereConditions =
      whereConditions + mysql.format(inArray, ['languageId', languages]);
  }
  if (isAppointmentNotRequireApproval) {
    whereConditions = whereConditions + 'isAppointmentRequireApproval=0 AND';
  }
  return `${joinStatement} WHERE ${whereConditions} roleId=2 `;
};

const getLikeStatement = ({ nameOrFirm, location }) => {
  let likeStatement='';
  if (nameOrFirm) {
    const matchNameOrFirm = `%${nameOrFirm}%`;
    likeStatement=mysql.format(
      "(CONCAT(firstName, ' ', lastName) LIKE ? OR firms.name LIKE ?)",
      [matchNameOrFirm, matchNameOrFirm]
    );
  }
  if (location) {
    const matchLocation = `%${location}%`;
    if(likeStatement){
      likeStatement=`${likeStatement} AND ${mysql.format('city LIKE ?', [matchLocation])}`
    }
    else{
      likeStatement=mysql.format('city LIKE ?', [matchLocation])
    }
  }
  console.log(likeStatement ? `AND ${likeStatement}` : '')
  return likeStatement ? `AND ${likeStatement}` : '';
};

const getLimitStatement = (page = 0) => {
  const startRecord = (page - 1) * 20;
  const uptoRecord = page * 20;
  return mysql.format(' LIMIT ?, ? ', [startRecord, uptoRecord]);
};

exports.createSearchQuery = ({
  specializations,
  languages,
  nameOrFirm,
  page,
  location,
  isAppointmentNotRequireApproval,
}) => {
  const selectUsersStatement =
    "SELECT DISTINCT users.id, CONCAT(firstName,' ', lastName ) as name, email, road, houseNumber, city, zipCode, firms.name as firm, profileImageUrl as imgUrl, mobilePhone, latitude, longitude, expertId, city, gender, specializationIds FROM users" +
    ' left join (select userId, group_concat(specialization_id) as specializationIds from user_specializations group by userId) a on users.id=a.userId' +
    ' left join firms on users.firmId=firms.id';
  const joinStatement = getJoinQuery({
    specializations,
    languages,
    isAppointmentNotRequireApproval,
  });
  const likeStatement = getLikeStatement({ nameOrFirm, location });

  const limitStatement = getLimitStatement(page);
  console.log(
    `${selectUsersStatement} ${joinStatement} ${likeStatement} ${limitStatement};`
  );
  return `${selectUsersStatement} ${joinStatement} ${likeStatement} ${limitStatement};`;
};
