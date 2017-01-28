# RestPop

[![codebeat badge](https://codebeat.co/badges/795a81d7-6cc8-4cfa-b211-ce3fa314647d)](https://codebeat.co/projects/github-com-wholedev-restpop)

This repository contains an API with Node.js app using Restify. The code was structured using MVC patterns following the folder structure.
Will be found the models in 'model' folder, and the controlers in 'route' folder. This API was prepared without use views.

## Dependencies:

Bellow are the tools and libraries (and their minimum versions) required to build run project:

* MongoDB v3.4.1
* NodeJS v7.4.0 with NPM.

## Config File
The API use a file with config. This file is named 'config/service-config' and contains:

```js
cluster: false,
apiPort: 8080,
jwt: {
   secret: 'supersecret',
   expiresInMinutes: 1440
},
mongoDB: {
   url: 'mongodb://localhost:27017/restpop'
}
```

## Installation

To install this API will execute this script:

```
git clone https://github.com/wholedev/RestPop
cd restpop
npm install .
```

## Populate Database

The project contains some scripts to load the database. Types of loads:

* Populate Database:
```
npm run populateDB
```

## Run in Develompent scope

### Dependencies:
```
npm start
```
## Run Lint: 

```
npm run lint
```

## Documentation from the API

Run the command

```
npm run docs
```

And go to the doc folder to view the documentation
