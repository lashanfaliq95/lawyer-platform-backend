const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

exports.encryptPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });

exports.comparePassword = (inputPassword, dbPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, dbPassword, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });

exports.createUserId = () => uuidv4();
