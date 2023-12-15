const Schema = require('mongoose').Schema;

exports.statusUpdatesSchema = new Schema({
    owner: String,
    content: String,
    timeCreated: {
        type: Date,
        default: Date.now
    },
    lastEdited: {
        type: Date,
        default: Date.now
    },
}, { collection : 'statusUpdatesTable' });