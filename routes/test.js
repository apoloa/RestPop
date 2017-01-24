'use strict';

const restify = require('restify');

function test (req, res, next) {
    return next(res.send(200, 'Service is Running'));
}

module.exports = {
    GET: test,
    POST: test,
    PUT: test,
    DELETE: test
};
