const express = require('express');
const router = express.Router();

const StatusUpdatesAccessor = require('./db/statusUpdates.model');
const { post } = require('./user.server');


router.post('/', async function(request, response) {
    const username = request.cookies.username
    // console.log(username)
    
    // if(!username) {
    //     response.status(400)
    //     return response.send("Users need to be logged in to create a status update")
    // }

    const body = request.body;
    const statusUpdateContent = body.content;
    const owner = username;
    // const created = body.timeCreated;

    if(!statusUpdateContent) {
        response.status(400);
        return response.send("Empty Content")
    }

    const newStatusUpdate = {
        owner: owner,
        content: statusUpdateContent,
        // timeCreated: created
    }

    const createdStatusUpdate = await StatusUpdatesAccessor.insertStatusUpdate(newStatusUpdate)

    response.json(createdStatusUpdate);
})


router.get('/all', async function(request, response) {
    const foundStatusUpdates = await StatusUpdatesAccessor.getAllStatusUpdates();
    return response.json(foundStatusUpdates);
})

router.get('/user/:username', async function(request, response) {
    const { username } = request.params;

    if (username) {
        const foundStatusUpdates = await StatusUpdatesAccessor.findStatusUpdatesByUser(username);
        return response.json(foundStatusUpdates);
    } else {
        response.status(400);
        return response.send("Cannot get Pokemon when logged out :(")
    }
})

router.get('/postID/:postID', async function(request, response) {
    const { postID } = request.params;
    if (postID) {
        const foundStatusUpdate = await StatusUpdatesAccessor.findStatusUpdateByID(postID);
        return response.json(foundStatusUpdate);
    } else {
        response.status(400);
        return response.send("Cannot get status update")
    }
})

router.put('/edit/:postID', async function(request, response) {
    const postID = request.params.postID;
    const newContent = request.body.content;

    let postToUpdate = null
    if(postID) {
        postToUpdate = await StatusUpdatesAccessor.findStatusUpdateByID(postID)
    }
    if (postToUpdate) {
        postToUpdate.content = newContent
        await postToUpdate.save()
        return response.send("Post saved successfully")
    }
})

router.delete('/delete/:postID', async function(request, response) {
    const postID = request.params.postID;
    let postToDelete = null

    if(postID) {
        postToDelete = await StatusUpdatesAccessor.findStatusUpdateByID(postID)
    }
    if (postToDelete) {
        await postToDelete.deleteOne()
        return response.send("Post deleted successfully")
    }
})

module.exports = router;