const express = require('express');
const app = express();
// analyses the body and parses it properly - has control of requests and responses of any api
const bodyParser = require('body-parser');
// log post and get requests (optional)
const morgan = require('morgan');
// mongoose equivalent (optional)
const dynamoose = require('dynamoose');

// getting all the code from AWS
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('./config/config.js');
const { Support } = require('aws-sdk');

// middleware - backend will now understand the json sent from the frontend
app.use(bodyParser.json());
app.use(morgan('tiny'));

// get environment variables from env file 
require('dotenv/config');



const usersRoutes = require('./routers/users');
const classesRoutes = require('./routers/classes');
const testsRoutes = require('./routers/tests');
const testStatisticsRoutes = require('./routers/testStatistics');

// api url environment variable
const api = process.env.API_URL;

// ----------- Routers ------------
//import app.get and app.post requests from routers/users.js and so on...
// this app is using this route from routes that are coming from usersRouters and so on...
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/classes`, classesRoutes)
app.use(`${api}/tests`, testsRoutes)
app.use(`${api}/testStatistics`, testStatisticsRoutes)

// database connection
// dynamoose.aws.sdk.config.update({region: 'us-east-2'});
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// run express server on initial port 3000 or environment variables
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log("server is running on http://localhost:3000")
})