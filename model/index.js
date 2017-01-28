'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./User');
require('./Ad');
