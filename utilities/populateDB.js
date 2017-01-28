'use strict';

const logger = require('../lib/logger');

require('../lib/mongooseConnector');
require('../model');
const Ad = require('../model/Ad');
const User = require('../model/User');

const populateCollection = require('./populateCollection');

populateCollection(Ad,'utilities/AdsExample.json').then(res => {
    logger.debug(res);
    populateCollection(User,'utilities/UsersExample.json').then(res => {
        logger.debug(res);
        process.exit(0);
    });
}).catch(err => {
    logger.error('Error to populateCollection', err);
});
