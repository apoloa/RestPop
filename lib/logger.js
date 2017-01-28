'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'NodeRest'});
module.exports = log;
