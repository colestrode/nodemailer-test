'use strict';

let sparkpostTransport = require('nodemailer-sparkpost-transport');
let nodemailer = require('nodemailer');

// TODO ip_pool, reply_to
module.exports = function() {
  let transporter = nodemailer.createTransport(sparkpostTransport({
    sparkPostApiKey: process.env.SPARKPOST_API_KEY,
    campaign_id: 'nodemailer-test',
    metadata: {meta: 'data'},
    substitution_data: {subject: 'Sub Data Subject'},
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
    to: process.env.TO,
    from: process.env.FROM,
    subject: '{{ subject }}',
    text: 'Nodemailer and SparkPost!',
    html: '<h1>Nodemailer and SparkPost!</h1> <a href="http://www.google.com">gooogle</a>',
  }, afterSend);
}


function withOverrides(transporter) {
  transporter.sendMail({
    to: process.env.TO,
    from: process.env.FROM,
    subject: '{{ subject }}',
    text: 'Nodemailer and SparkPost!',
    html: '<h1>Nodemailer and SparkPost!</h1> <a href="http://www.google.com">gooogle</a>',

    campaign_id: 'nodemailer-test-override',
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

