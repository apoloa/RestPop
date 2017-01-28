'use strict';

module.exports = {
    parseLanguage: (req, res, next) => {
        req.lang = undefined;
        if (req.headers.hasOwnProperty('lang')) {
            req.lang = req.headers.lang;
        }
        return next();
    }
};

