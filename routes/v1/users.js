'use strict';

const restify = require('restify');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sha512 = require('js-sha512').sha512;
const validator = require('validator');


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
