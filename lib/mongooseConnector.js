'use strict';

const mongoose = require('mongoose');
const config = require('../config/service-config').mongoDB;
const logger = require('../lib/logger');
const db = mongoose.connection;

// error handler
db.on('error', function (err) {
    logger.error('Error:', err);
    process.exit(-1);
});

// connection handler
db.once('open', function () {
    logger.info('Connected to Mongo');
});

mongoose.connect(config.url);
