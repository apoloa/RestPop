'use strict';

module.exports = {
    cluster: false,
    apiPort: 8080,
    jwt: {
        secret: 'supersecret',
        expiresInMinutes: 1440
    },
    mongoDB: {
        url: 'mongodb://localhost:27017/restpop'
    }
};
