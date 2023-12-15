const mongoose = require("mongoose")

const statusUpdatesSchema = require('./statusUpdates.schema').statusUpdatesSchema

const statusUpdatesModel = mongoose.model("StatusUpdate", statusUpdatesSchema);

function insertStatusUpdate(statusUpdate) {
    console.log("inserting status update")
    return statusUpdatesModel.create(statusUpdate);
}

/*
function getStatusUpdatesByClick(event) {
    return statusUpdatesModel.findOne(event).exec();
}
*/

function getAllStatusUpdates() {
    return statusUpdatesModel.find().exec();
}

function findStatusUpdatesByUser(owner) {
    return statusUpdatesModel.find({owner: owner}).exec();
}

function findStatusUpdateByID(ID){
    return statusUpdatesModel.findOne({_id: ID}).exec();
}

// function findStatusUpdateById(id) {
//     return statusUpdateModel.findById(id).exec();
// }

module.exports = {
    insertStatusUpdate,
    findStatusUpdatesByUser,
    getAllStatusUpdates,
    findStatusUpdateByID
    // findPokemonById
};