'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "myApp"});
module.exports = log;