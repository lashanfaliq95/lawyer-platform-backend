const { Auth, ResetToken, ConfirmationToken } = require('../models/index');

exports.setRefreshToken = ({ refreshToken }) => {
  return Auth.create({ refresh_token: refreshToken });
};

exports.getRefreshToken = ({ refreshToken }) => {
  return Auth.findAll({ where: { refresh_token: refreshToken } });
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

exports.savePasswordResetToken = ({ id, resetToken }) => {
  return ResetToken.create({ token: resetToken, user_id: id });
};

exports.saveAccountConfirmationToken = ({ id, confirmationToken }) => {
  return ConfirmationToken.create({ token: confirmationToken, user_id: id });
};

exports.getResetTokenExpiration = ({ token }) => {
  return ResetToken.findAll({
    attributes: ['user_id', 'created_at'],
    where: { token },
  });
};

exports.getConfirmationTokenExpiration = ({ token }) => {
  return ConfirmationToken.findAll({
    attributes: ['user_id', 'created_at'],
    where: { token },
  });
};
