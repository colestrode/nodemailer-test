'use strict';

let nodemailerApi = require('./nodemailer-api');
let backwardsCompatApi = require('./backwards-compat');

if (process.env.MODE === 'compat') {
  backwardsCompatApi();
} else {
  nodemailerApi();
}