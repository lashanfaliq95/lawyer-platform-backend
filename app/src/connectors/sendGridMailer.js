const sgMail = require('@sendgrid/mail')

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

module.exports=sgMail;
