{
  /* (2019-06-07) - This is the config file that outlines the functions used
    for nodemailer. Nodemailer is used as the main library for sending out emails.
  */
}
'use strict';

const nodemailer = require('nodemailer');
const sgTransportBuilder = require('nodemailer-sendgrid-transport');

// https://nodemailer.com/transports/stream/
const dev_transporter = nodemailer.createTransport({
  name: 'dev-email',
  version: 0,
  send: (mail, callback) => {
    let input = mail.message.createReadStream();
    input.pipe(process.stdout);
    input.on('end', function() {
      callback(null, true);
    });
  }
});

const smtp_transporter = nodemailer.createTransport({
  host: process.env.email_smtp_host,
  port: process.env.email_smtp_port,
  secure: false,
  auth: {
    user: process.env.email_smtp_user,
    pass: process.env.email_smtp_password
  },
  tls: {
    rejectUnauthorized: false
  }
});

var sg_transporter = nodemailer.createTransport(sgTransportBuilder({
  auth: {
    api_user: 'burgeron1',
    api_key: 'Sendgrid@2018'
  }
}));

if (process.env.SENDGRID_USERNAME) {
  module.exports = sg_transporter;
} else if (process.env.email_smtp_host && process.env.email_smtp_user && process.env.email_smtp_password) {
  module.exports = smtp_transporter;
} else {
  module.exports = sg_transporter;
}
