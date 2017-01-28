'use strict';

const restify = require('restify');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const config = require('../../config/service-config');
const sha512 = require('js-sha512').sha512;
const validator = require('validator');
const jwt = require('jsonwebtoken');

/**
 * @api {post} /apiV1/users/authenticate Authenticate
 * @apiVersion 1.0.1
 * @apiGroup Users
 * @apiDescription Authenticate a registered user
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 *
 * @apiHeader {String} lang=en Language of the results of the API.
 *
 * @apiHeaderExample {json} Request-Example:
 *  "email":"a@a.com",
 *  "password":"********"
 *
 * @apiSuccessExample {json} Success-Response:
 * {"success":true,
 *  "token": "XXXXXXXX"}
 *
 * @apiError success 'False'
 * @apiError message Error message
 * @apiError message.id Error id message
 * @apiError message.status Response status code
 * @apiError message.description Description of the error
 *
 * @apiErrorExample {json} Error-Response:
 * {"success":false,
 *  "message":{
 *      "identifier": "ERROR_DATABASE",
 *       "statusCode": "400",
 *       "messages": "Error in database"
 *    }
 * }
 *
 */
function authUser (req, res, next) {
    if (!req.params.email) {
        return next(new restify.errors.EmailRequiredError(null, req.lang));
    }

    if (!req.params.password) {
        return next(new restify.errors.PasswordRequiredError(null, req.lang));
    }

    User.findOne({email: req.params.email}).then(user => {
        if (!user) {
            return next(new restify.errors.UserNotFoundError(null, req.lang));
        }
        if (user.password !== sha512(req.params.password)) {
            return next(new restify.errors.PasswordRequiredError(null, req.lang));
        }
        const token = jwt.sign(user, config.jwt.secret, {
            expiresInMinutes: config.jwt.expiresInMinutes
        });
        next(res.send(200, {success: true, token: token}));
    }).catch(err => next(new restify.errors.DatabaseError(null, req.lang)));
}

module.exports = {
    POST: authUser
};
