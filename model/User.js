'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, trim: true},
    email: {type: String, trim: true, lowercase: true, unique: true},
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
