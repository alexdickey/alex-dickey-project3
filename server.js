const express = require('express');
const helper = require('./server/helper')
const userApi = require('./server/user.server');
const statusUpdatesApi = require('./server/statusUpdates.server');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path')
const cookieParser = require('cookie-parser')


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userApi);
app.use('/api/statusUpdates', statusUpdatesApi);

app.get('/', function(request, response) {
    response.send(helper.generateRandomResponse())
})


// const MONGO_CONNECTION_STRING = "mongodb+srv://dickeya:Ember123@seawebdev.0e5on0q.mongodb.net/?retryWrites=true&w=majority"
const MONGO_CONNECTION_STRING = process.env.MONGO || 'mongodb://127.0.0.1/SeaWebDev';

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('/*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});


app.listen(process.env.PORT || 3500, function() {
    console.log("Starting server now...")
})
