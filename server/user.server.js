const express = require('express');
const router = express.Router();

const UserAccessor = require('./db/user.model');
const { useParams } = require('react-router');

router.post('/register', async function(request, response) {
    // retrieve the parameter info
    const body = request.body;
    const username = body.username;
    const password = body.password;

    //Check to make sure parameter is filled out 
    if(!username || !password) {
        console.log(body.username)
        console.log(body.password)
        response.status(401);
        console.log("Didn't include user or password")
        return response.send("Incomplete request")
    }

    const newUser = {
        username: username,
        password: password,
    }

    const existingUsername = await UserAccessor.getUserByUsername(username)
    if (existingUsername) {
        response.status(401)
        return response.send("Username already exists. Try Again")
    }
    const createdUser = await UserAccessor.insertUser(newUser)

    response.cookie('username', createdUser.username)

    response.json("Successfully created new user " + createdUser.username);
})

router.post('/login', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const password = body.password;
    if(!username || !password) {
        response.status(401);
        return response.send("Incomplete request")
    }

    const receivedUser = await UserAccessor.getUserByUsername(username)

    if(!receivedUser) {
        response.status(404);
        return response.send("No user with username " + username)
    }

    const isValidPassword = password === receivedUser.password;

    if(isValidPassword) {
        response.cookie('username', receivedUser.username)

        response.status(200);
        return response.send({loggedIn: true})
    } else {
        response.status(404);
        return response.send("No user with username + password combo exists " + username)
    }

})

router.post('/logout', async function(request, response) {
    response.clearCookie('username'); // this doesn't delete the cookie, but expires it immediately
    response.send();
});

router.get('/isLoggedIn', function(request, response) {
    const username = request.cookies.username;
    
    response.send({
        isLoggedIn: !!username,
        username: username
    });
})

router.get('/:username', async function(request, response) {
    const { username } = request.params; 
    // const username = request.cookies.username;

    if(username) {
        const user = await UserAccessor.getUserByUsername(username);
        return response.json(user);
    } else {
        response.status(400);
        return response.send("Cannot get user")
    }
})

router.put('/updateDescription/:username', async function(request, response) {
    const username = request.params.username;
    const description = request.body.description;
    // console.log(request)
    console.log('username: ' + username)
    console.log('description: ' + description)

    let userToUpdate = null
    if(username) {
        userToUpdate = await UserAccessor.getUserByUsername(username)
        console.log("userToUpdate description: " + userToUpdate.description)
    }
    if (userToUpdate) {
        console.log("found User")
        console.log("Current Description: "+ userToUpdate.description)
        userToUpdate.description = description
        await userToUpdate.save()
        console.log("Changed to" + description)
        console.log("Changed Description: "+ userToUpdate.description)
        return response.send("Updated user successfully")
    }
})

module.exports = router;