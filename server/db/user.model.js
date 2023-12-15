const mongoose = require("mongoose")

const UserSchema = require('./user.schema').UserSchema

const UserModel = mongoose.model("UserSchema", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getUserByUsername(username) {
    return UserModel.findOne({username: username}).exec();
}

// function updateUserDescription(username, description) {
//     return UserModel.apply(username, description)
// }

module.exports = {
    insertUser,
    getUserByUsername,
};