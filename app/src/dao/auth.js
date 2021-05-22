const { Auth, ResetToken, ConfirmationToken } = require('../models/index');

exports.setRefreshToken = ({ refreshToken }) => {
  return Auth.create({ refreshToken });
};

exports.getRefreshToken = ({ refreshToken }) => {
  return Auth.findAll({ where: { refreshToken } });
};

// exports.deleteResetToken = ({ token }) => {
//   return User.destroy({ where: { reset_token: token } });
// };

// exports.deleteResetToken = ({ token }) => {
//   return User.destroy({ where: { reset_token: token } });
// };

exports.deleteRefreshToken = ({ refreshToken }) => {
  return Auth.destroy({ where: { refreshToken } });
};

exports.savePasswordResetToken = ({ id, resetToken }) => {
  return ResetToken.create({ token: resetToken, userId: id });
};

exports.saveAccountConfirmationToken = ({ id, confirmationToken }) => {
  return ConfirmationToken.create({ token: confirmationToken, userId: id });
};

exports.getResetTokenExpiration = ({ token }) => {
  return ResetToken.findAll({
    attributes: ['userId', 'createdAt'],
    where: { token },
  });
};

exports.getConfirmationTokenExpiration = ({ token }) => {
  return ConfirmationToken.findAll({
    attributes: ['userId', 'createdAt'],
    where: { token },
  });
};
