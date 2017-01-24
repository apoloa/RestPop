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
            if (file.split('.')[ 1 ] === 'js') {
                // eslint-disable-next-line global-require
                map.set(routesName + file.split('.')[ 0 ], require(pathIn));
            }
        }
    }
});
}

module.exports = function (server, pathRoutes) {
    readFolder('/', pathRoutes);
    map.forEach((value, key) => {
        if (value.hasOwnProperty('GET')) {
        if (value.GET instanceof Function) {
            server.get(key, value.GET);
        } else {
            if (value.GET.hasOwnProperty('endPoint') && value.GET.hasOwnProperty('function')) {
                server.get(`${key}/${value.GET.endPoint}`, value.GET.function);
            }
        }
    }
    if (value.hasOwnProperty('POST')) {
        if (value.POST instanceof Function) {
            server.post(key, value.POST);
        } else {
            if (value.POST.hasOwnProperty('endPoint') && value.POST.hasOwnProperty('function')) {
                server.post(`${key}/${value.POST.endPoint}`, value.POST.function);
            }
        }
    }
    if (value.hasOwnProperty('PUT')) {
        if (value.PUT instanceof Function) {
            server.put(key, value.PUT);
        } else {
            if (value.PUT.hasOwnProperty('endPoint') && value.PUT.hasOwnProperty('function')) {
                server.put(`${key}/${value.PUT.endPoint}`, value.PUT.function);
            }
        }
    }
    if (value.hasOwnProperty('DELETE')) {
        if (value.DELETE instanceof Function) {
            server.del(key, value.DELETE);
        } else {
            if (value.DELETE.hasOwnProperty('endPoint') && value.DELETE.hasOwnProperty('function')) {
                server.del(`${key}/${value.DELETE.endPoint}`, value.DELETE.function);
            }
        }
    }
});
};

