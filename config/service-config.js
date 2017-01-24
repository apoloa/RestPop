'use strict';

module.exports = {
    cluster: false,
    apiPort: 9000,
    jwt: {
        secret: 'supersecret',
        expiresInMinutes: 1440
    }
};
