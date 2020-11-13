const sgMail = require('../connectors/sendGridMailer');

const fromEmail = 'lashanfaliq@gmail.com';
const host = 'http://lawyer-platform.s3-website.eu-central-1.amazonaws.com';

const createEmail = ({ to, subject, text, resetToken }) => {
  return {
    to: to,
    from: fromEmail,
    subject: subject || 'Node.js Password Reset',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' +
      host +
      '/auth/reset/' +
      resetToken +
      '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };
};

const createPasswordResetSuccessEmail = ({ to, subject, text, resetToken }) => {
  return {
    to: to,
    from: fromEmail,
    subject: subject || 'Your password has been changed',
    text: 'Hello,\n\n' +
      'This is a confirmation that the password for your account ' + to + ' has just been changed.\n'
  };
};

exports.sendMail = ({ to, subject, text, resetToken }) => {
  const email = createEmail({
    to,
    subject,
    text,
    resetToken,
  });
  return new Promise((resolve, reject) => {
    sgMail.send(email).then(
      () => {
        resolve({ message: 'Successfully send email' });
      },
      (error) => {
        reject({ error });
      }
    );
  });
};

exports.sendPasswordResetSuccessEmail = ({ to, subject, text, resetToken }) => {
  const email = createPasswordResetSuccessEmail({
    to,
    subject,
    text,
    resetToken,
  });
  return new Promise((resolve, reject) => {
    sgMail.send(email).then(
      () => {
        resolve({ message: 'Successfully send email' });
      },
      (error) => {
        reject({ error });
      }
    );
  });
};
