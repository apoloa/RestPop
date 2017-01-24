'use strict';

const path = require('path');
const fs = require('fs');

const map = new Map();

function readFolder (routesName, pathFolder) {
    fs.readdirSync(pathFolder).forEach(file => {
        if (!file.startsWith('.')) {
            const pathIn = path.join(pathFolder, file);
            const statsFile = fs.lstatSync(pathIn);
            if (statsFile.isDirectory()) {
                readFolder(`${routesName}${file}/`, pathIn);
            } else {
                if (file.split('.')[1] === 'js') {
                    // eslint-disable-next-line global-require
                    map.set(routesName + file.split('.')[0], require(pathIn));
                }
            }
        }
    });
}

function populateRoute (value, key, method, server) {
    if (value.hasOwnProperty(method)) {
        if (value[method] instanceof Function) {
            server[method.toLowerCase()](key, value[method]);
        } else {
            if (value[method].hasOwnProperty('endPoint') && value[method].hasOwnProperty('function')) {
                server[method.toLowerCase()](`${key}/${value[method].endPoint}`, value[method].function);
            }
        }
    }
}

module.exports = function (server, pathRoutes) {
    readFolder('/', pathRoutes);
    map.forEach((value, key) => {
        populateRoute(value, key, 'GET', server);
        populateRoute(value, key, 'POST', server);
        populateRoute(value, key, 'PUT', server);
        populateRoute(value, key, 'DEL', server);
    });
};

