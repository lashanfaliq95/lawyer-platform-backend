const getConnection = require('../connectors/mysqlConnector');

exports.getPasswordOfUser = async ({ email }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT id, password, role_id AS roleId FROM users WHERE email=?',
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getPasswordOfUserFromId = async (id) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT password FROM users WHERE id=?',
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getUserIdFromEmail = async ({ email }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT id FROM users WHERE email=?',
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getIdOfUser = async ({ email }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT id FROM users WHERE email=?',
        [email],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.registerUser = async ({
  id,
  firstName,
  lastName,
  email,
  mobilePhone,
  password,
  roleId,
}) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'INSERT INTO users(id, first_name, last_name, email, mobile_phone, password, role_id, gender) VALUES(?, ? , ?, ?, ?, ?, ?, ?)',
        [id, firstName, lastName, email, mobilePhone, password, roleId, 0],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};
``;
exports.getLawyer = async (id) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        "SELECT DISTINCT id, CONCAT(first_name,' ', last_name ) as name,email, address, firm, image_url as imgUrl, mobile_phone as mobilePhone, fax, gender, latitude, longitude, specializationIds, languageIds FROM users" +
          ' left join (select user_id, group_concat(specialization_id) as specializationIds from user_specializations group by user_id) a on users.id=a.user_id' +
          ' left join (select user_id, group_concat(language_id) as languageIds from user_languages group by user_id) b on users.id=b.user_id' +
          ' WHERE role_id=2 AND users.id=?',
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getLawyers = async () => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT id, CONCAT(first_name," ", last_name ) as name,email, address, firm, image_url as imgUrl, mobile_phone as mobilePhone, latitude, longitude FROM users WHERE role_id=2',
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getLawyerAvailability = async ({ id, startDate }) => {
  console.log(id, startDate);
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'SELECT lawyer_id AS id, time_slot AS timeSlot, date, day_of_week as dayOfWeek FROM lawyer_availability WHERE available=true AND lawyer_id=? AND date > ? AND date <= DATE_ADD(?,INTERVAL 5 DAY)',
        [id, startDate, startDate],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.saveUserPassword = async (id, password) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'UPDATE users SET password=? where id = ?',
        [password, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.savePasswordResetToken = async ({
  id,
  resetToken,
  expirationTimeString,
}) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'UPDATE users SET reset_token=?, reset_token_expiration=? where id = ?',
        [resetToken, expirationTimeString, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getUserAppointments = async ({ id, password }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'UPDATE users SET password=? where id = ?',
        [password, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.getLawyerAppointments = async ({ id, password }) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'UPDATE users SET password=? where id = ?',
        [password, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.deleteUser=async (id) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'DELETE FROM users WHERE id=?',
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.updatePassword=async (id) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'DELETE FROM users WHERE id=?',
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};

exports.updateUser = async ({id, firstName, lastName, email, phoneNumber}) => {
  return await new Promise((resolve, reject) => {
    return getConnection(async (connection) => {
      connection.query(
        'UPDATE users SET first_name=?, last_name=?, email=?, mobile_phone=? WHERE id = ?',
        [firstName,lastName,email,phoneNumber, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  });
};