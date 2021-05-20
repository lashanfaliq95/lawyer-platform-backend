const { Auth, User } = require('../models/index');

exports.setRefreshToken = ({ refreshToken }) => {
  return Auth.create({ refresh_token: refreshToken });
};

exports.getRefreshToken = ({ refreshToken }) => {
  return Auth.findAll({ where: { refresh_token: refreshToken } });
};

exports.getResetTokenExpiration = ({ token }) => {
  return User.findAll({
    attributes: ['id', 'reset_token_expiration', 'email'],
    where: { reset_token: token },
  });
};

exports.getConfirmationTokenExpiration = ({ token }) => {
  return User.findAll({
    attributes: ['id', 'confirmation_token_expiration', 'email'],
    where: { confirmation_token: token },
  });
};

// exports.deleteResetToken = ({ token }) => {
//   return User.destroy({ where: { reset_token: token } });
// };

// exports.deleteResetToken = ({ token }) => {
//   return User.destroy({ where: { reset_token: token } });
// };

exports.deleteRefreshToken = ({ refreshToken }) => {
  return Auth.destroy({ where: { refresh_token: refreshToken } });
};
