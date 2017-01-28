'use strict';

const restify = require('restify');
const path = require('path');
const errorInjector = require('../lib/error-injector')(restify);
const routerInjector = require('../lib/router-injector');

const server = restify.createServer();
const errors = require('../config/errors.json');
const auth = require('../lib/auth');
const lang = require('../lib/lang');
errorInjector.inject(errors);

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());
server.use(restify.jsonp());
server.use(restify.dateParser());
// Setting CORS
restify.CORS.ALLOW_HEADERS.push('x-access-token');
restify.CORS.ALLOW_HEADERS.push('x_access_token');
restify.CORS.ALLOW_HEADERS.push('x-refresh-token');
restify.CORS.ALLOW_HEADERS.push('x_refresh_token');

server.use(restify.CORS({
    credentials: true
}));

require('../lib/mongooseConnector');
require('../model');

server.use(auth.checkToken); //Add middleware for jwt token
server.use(lang.parseLanguage);
routerInjector(server, path.join(__dirname, '../routes'));

module.exports = server;
