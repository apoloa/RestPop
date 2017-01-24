'use strict';
/**
 * Module Dependencies
 */
const util = require('util');

/**
 * Function that capitalize first letter. Ex: hello --> Hello
 * @returns {string} string capitalized
 */
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Function that convert snake_underscore_case to CamelCase.
 * @param {String} string string to be converted
 * @returns {String} string converted
 */
function camelCase (string) {
    return string.replace(/_([a-z])/g, (m, w) => w.toUpperCase());
}
/**
 * Factory that create the errors using RestError Template
 * @param {String} functionName name of the error
 * @param {Object} error contains the information of the error
 * @returns {Function} to create errors.
 */
function factoryErrors (restify, functionName, error) {
    return function (object, lang = 'EN') {
        if (!error.hasOwnProperty(lang)) {
            lang = 'EN';
        }
        if (object === null) {
            restify.RestError.call(this, {
                body: {
                    statusCode: error.status,
                    message: error.message[lang],
                    code: error.code
                },
                statusCode: error.status,
                constructOpt: functionName
            });
        }
        if (object instanceof Object) {
            restify.RestError.call(this, {
                body: {
                    statusCode: object.statusCode || error.status,
                    message: object.message || object,
                    code: object.code || error.code
                },
                statusCode: object.statusCode || error.status,
                constructOpt: functionName
            });
        } else {
            restify.RestError.call(this, {
                body: {
                    statusCode: error.status,
                    message: object || error.message[lang],
                    code: error.code
                },
                statusCode: error.status,
                constructOpt: functionName
            });
        }
    };
}

class Injector {
    constructor (restify) {
        this.restify = restify;
    }

    /**
     * Function that can inject errors in restify
     * @param {Object} errors object that can be injected
     */
    inject (errors) {
        const functions = {};
        for (const error in errors) {
            if (errors.hasOwnProperty(error)) {
                const nameFunction = camelCase(error.toLowerCase()).capitalizeFirstLetter();
                functions[nameFunction] = factoryErrors(this.restify, nameFunction, errors[error]);
                util.inherits(functions[nameFunction], this.restify.RestError);
                this.restify.errors[`${nameFunction}Error`] = functions[nameFunction];
            }
        }
    }
}

function InjectorCreator (restify) {
    return new Injector(restify);
}

module.exports = InjectorCreator;
