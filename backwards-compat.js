'use strict';

let sparkpostTransport = require('nodemailer-sparkpost-transport');
let nodemailer = require('nodemailer');

module.exports = function() {
  let transporter = nodemailer.createTransport(sparkpostTransport({
    sparkPostApiKey: process.env.SPARKPOST_API_KEY,
    campaign_id: 'compat-nodemailer-test',
    metadata: {meta: 'compat'},
    substitution_data: {subject: 'Compat Sub Data Subject'},
    content: {
      from: process.env.FROM,
      subject: '{{ subject }}',
      text: 'Compat Nodemailer and SparkPost!',
      html: '<h1>Compat Nodemailer and SparkPost!</h1> <a href="http://www.google.com">gooogle</a>'
    },
    options: {
      open_tracking: false,
      click_tracking: false,
      transactional: true
    }
  }));

  withDefaults(transporter);
  withOverrides(transporter);
};

function withDefaults(transporter) {
  transporter.sendMail({
    to: process.env.TO
  }, afterSend);
}


function withOverrides(transporter) {
  transporter.sendMail({
    to: process.env.TO,

    content: {
      from: process.env.FROM,
      subject: '{{ subject }}',
      text: 'Compat Override Nodemailer and SparkPost!',
      html: '<h1>Compat Override Nodemailer and SparkPost!</h1> <a href="http://www.google.com">gooogle</a>'
    },

    campaign_id: 'compat-nodemailer-test-override',
    metadata: {meta: 'override'},
    substitution_data: {subject: 'Override Sub Data Subject'},
    options: {
      open_tracking: true,
      click_tracking: true,
      transactional: true
    }
  }, afterSend);
}

function afterSend(err, info) {
  if (err) {
    return console.log('error', err);
  }

  console.log('success', info);
}

