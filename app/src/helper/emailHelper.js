const mailJetConnector = require('../connectors/mailJetConnector');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const fromEmail = process.env.FROM_EMAIL;
const fromName = process.env.FROM_NAME;
const host = process.env.HOSTED_URL;
const resetPasswordTemplateId = process.env.RESET_PASSWORD_TEMPLATE_ID;

const sendEmail = ({ toEmail, toName, subject, templateID, variables }) => {
  return mailJetConnector.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: fromEmail,
          Name: fromName,
        },
        To: [
          {
            Email: toEmail,
            Name: toName || 'passenger 1',
          },
        ],
        Subject: subject,
        TemplateID: templateID,
        TemplateLanguage: true,
        Variables: { host, ...variables },
      },
    ],
  });
};

exports.sendResetPasswordEmail = (toEmail, variables) =>
  sendEmail({
    toEmail,
    variables,
    templateID: parseInt(resetPasswordTemplateId),
    Subject: 'Rest you password',
  });
