const mailJetConnector = require('../connectors/mailJetConnector');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const fromEmail = process.env.FROM_EMAIL;
const fromName = process.env.FROM_NAME;
const host = process.env.HOSTED_URL;
const resetPasswordTemplateId = process.env.RESET_PASSWORD_TEMPLATE_ID;
const confirmPasswordTemplateId = process.env.CONFIRM_ACCOUNT_TEMPLATE_ID;
const confirmRegistrationTemplateId = process.env.REGISTER_ACCOUNT_TEMPLATE_ID;
const sendHelpNotificationTemplateId =
  process.env.HELP_NOTIFICATION_TEMPLATE_ID;

const sendEmail = ({ toEmail, toName, subject, templateID, variables }) => {
  console.log(toEmail, toName, subject, templateID, variables);
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

exports.sendConfirmAccountEmail = (toEmail, variables) =>
  sendEmail({
    toEmail,
    variables,
    templateID: parseInt(confirmPasswordTemplateId),
    Subject: 'Confirm account',
  });

exports.sendConfirmRegistrationEmail = (toEmail, variables) =>
  sendEmail({
    toEmail,
    variables,
    templateID: parseInt(confirmRegistrationTemplateId),
    Subject: 'Successfully registered account',
  });

exports.sendHelpNotification = (variables) =>
  sendEmail({
    toEmail: fromEmail,
    variables,
    templateID: parseInt(sendHelpNotificationTemplateId),
    Subject: 'Notification from user',
  });
