const mailJet = require('node-mailjet');

if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}

const mailJetConnection = mailJet.connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

module.exports = mailJetConnection;
