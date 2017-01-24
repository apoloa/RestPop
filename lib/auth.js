'use strict';

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/service-config').jwt;

function verifyToken (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
}

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.headers.hasOwnProperty('x_access_token') || req.headers.hasOwnProperty('x-access-token');
        if (token) {
            verifyToken(token)
                .then(decoded => {
                    req.token = decoded;
                    next();
                })
                .catch(error => {
                    req.errToken = error;
                    next();
                });
        } else {
            return next();
        }
    }
};

