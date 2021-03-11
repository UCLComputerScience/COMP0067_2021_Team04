const express = require('express')
const app = express()

// body parser parses post data properly and exposes it on req.body
const bodyParser = require('body-parser');

// log in http requests coming from the front-end such as get, post, delete
const morgan = require('morgan');

// use specific constants from .env file
require('dotenv/config');
const api = process.env.API_URL;

// connect our application to cloud database using mongoose
const mongoose = require('mongoose');

// import user routers
const usersRouter = require('./routes/users');

// connect to database with connection_string, options
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'numberfit-database'
})
// check for successful connection
.then(() => {
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log(err);
})

// middleware - software that handles communication between components and input/output
app.use(bodyParser.json());
app.use(morgan('tiny'));


// Routers
app.use(`${api}/users`, usersRouter)

// start a server with express on port 3000 
app.listen(3000, () => {
    console.log("server is running http://localhost:3000");
})