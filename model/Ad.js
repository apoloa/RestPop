'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const adSchema = new Schema({
    name: String,
    typeAd: {type: String, enum: ['sell', 'want']},
    price: Number,
    typeMoney: {type: String, enum: ['euro', 'dollar']},
    photo: String,
    tags: {type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile']}
});

adSchema.index({'name': 1});
adSchema.index({'price': 1});



adSchema.statics.list = function (filters, options) {
    return new Promise((result, reject) => {
        const query = Ad.find(filters); //eslint-disable-line

        query.sort(options.sort);
        query.limit(options.limit);
        query.skip(options.skip);

        query.exec((err, rows) => {
            if (err) {
                reject(err);
            } else {
                result(rows);
            }
        });
    });
};

const Ad = mongoose.model('Ad', adSchema); // jshint ignore:line

// Export model in module
module.exports = Ad;
