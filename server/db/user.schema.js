const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    createdTime: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        default: "Welcome to my Page!"
    }
}, { collection : 'userTable' });

//Date.now()