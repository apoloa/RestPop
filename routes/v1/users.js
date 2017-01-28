'use strict';

const restify = require('restify');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sha512 = require('js-sha512').sha512;
const validator = require('validator');

/**
 * @api {post} /apiV1/users/ Register
 * @apiVersion 1.0.1
 * @apiGroup Users
 * @apiDescription Register a new user
 * @apiParam {String} name Name of the user
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 *
 * @apiHeader {String} lang=en Language of the results of the API.
 *
 * @apiHeaderExample {json} Request-Example:
 *  "name" : "A"
 *  "email":"a@a.com",
 *  "password":"********"
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "success": true,
 *  "user": {
 *      "__v": 0,
 *      "name": "a",
 *      "email": "a@a.com",
 *      "password": "XXXXXXXX",
 *      "_id": "XXXXXXXX"
 *      }
 *  }
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
function registerUser (req, res, next) {
    if (!req.params.name) {
        return next(new restify.errors.NameRequiredError());
    }

    if (!req.params.email) {
        return next(new restify.errors.EmailRequiredError());
    }

    if (!validator.isEmail(req.params.email)) {
        return next(new restify.errors.InvalidMailError());
    }

    if (!req.params.password) {
        return next(new restify.errors.PasswordRequiredError());
    }

    const user = new User({
        name: req.params.name,
        email: req.params.email,
        password: sha512(req.params.password)
    });

    user.save()
        .then(user => {
            next(res.send(201, user));
        })
        .catch(err => {
            if (err.code === 11000) {
                return next(new restify.errors.EmailAlreadyRegisteredError());
            }
            return next(new restify.errors.RegisterUserError(err));
        });
}

module.exports = {
    POST: registerUser
};
