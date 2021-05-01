// get environment variables from env file 
require('dotenv').config;
const express = require('express');
const app = express();
// analyses the body and parses it properly - has control of requests and responses of any api
const bodyParser = require('body-parser');
// log post and get requests (optional)
const morgan = require('morgan');
// mongoose equivalent (optional)
const dynamoose = require('dynamoose');
// prevent cross.origin.resource.sharing error (node.js applications cannot trust other applications)
// when sending requests from the frontend to the backend, the backend will not respond to me the same data
// that i want, because it is forbidden, so we use cors to enable any application to request api from my server
const cors = require('cors');
// const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const {success, error } = require('consola');

// getting all the code from AWS
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('./config/config.js');
const { Support } = require('aws-sdk');

app.use(cors());
// some type of HTTP request (get, post). '*' indicates you're allowing any HTTP request to
// be parsed from any other origin.
app.options('*', cors())

// middleware - backend will now understand the json sent from the frontend
app.use(bodyParser.json());
app.use(morgan('tiny'));


const usersRoutes = require('./routers/users');
const classesRoutes = require('./routers/classes');
const testsRoutes = require('./routers/tests');
const testStatisticsRoutes = require('./routers/testStatistics');
const assignmentsRoutes = require('./routers/assignments');
const questionsRoutes = require('./routers/questions');
const schoolsRoutes = require('./routers/schools');
const challengesRoutes = require('./routers/challenges');
const videosRoutes = require('./routers/videos');
const leaderboardsRoutes = require('./routers/leaderboards');


// api url environment variable
const api = process.env.API_URL;

// returns if user can access API based on his token
// app.use(authJwt());

// everytime there's an API error
app.use(errorHandler)

// ----------- Routers ------------
//import app.get and app.post requests from routers/users.js and so on...
// this app is using this route from routes that are coming from usersRouters and so on...
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/classes`, classesRoutes)
app.use(`${api}/tests`, testsRoutes)
app.use(`${api}/testStatistics`, testStatisticsRoutes)
app.use(`${api}/assignments`, assignmentsRoutes)
app.use(`${api}/questions`, questionsRoutes)
app.use(`${api}/schools`, schoolsRoutes)
app.use(`${api}/challenges`, challengesRoutes)
app.use(`${api}/videos`, videosRoutes)
app.use(`${api}/leaderboards`, leaderboardsRoutes)

// database connection
// dynamoose.aws.sdk.config.update({region: 'us-east-2'});
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// run express server on initial port 3000 or environment variables
const port = process.env.PORT | 3000;
app.listen(port, () =>{
    success({ message: `Server is running on port ${port}`, badge: true})
})