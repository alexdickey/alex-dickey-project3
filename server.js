const express = require('express');
const helper = require('./server/helper')
const pokemonApi = require('./server/pokemon.server')
const cors = require('cors')
const mongoose = require('mongoose');


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemon', pokemonApi);

app.get('/', function(request, response) {
    response.send(helper.generateRandomResponse())
})

app.get('/', function(request, response) {
    response.send("This is the second app GET request");
})

app.post('/', function(requst, response) {
    response.send("This is a POST request")
})


const MONGO_CONNECTION_STRING = 'INPUT_STRING_HERE'

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


app.listen(3500, function() {
    console.log("Starting server :)")
})

//const http = require('http');

// const server = http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })

//     response.end("Hello, my name is Hunter")


// })

// server.listen(3500, "127.0.0.1", function() {
//     console.log('Starting...')
// })