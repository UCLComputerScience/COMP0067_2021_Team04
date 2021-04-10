const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');

AWS.config.update({
    
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// getting an object from AWS 
// create the document client interface for DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient();

//specify table name to connect to
const TABLE_NAME = 'UCL-TT-USERS-V2';
// http://localhost:3000/api/v1/users
// get request to initialise the route '/'
// ` back ticks are helpful to combine constants and strings, from api + '/users'
// async method + await so when you call the userlist from dynamodb, it will wait to be filled before sending the response to the frontend
// app replaced with router for express to cleanup code
// note the api is http:3000/users
// if `/jimmy` it will be http:3000/users/jimmy
router.get(`/`, async (req, res) => {

  const params = {
      TableName: TABLE_NAME
  };
  // await dynamodb.scan(params).promise()
  // returns object that has items: [user1, user2]
  const userList = await documentClient.scan(params).promise()
  if(!userList) {
      res.status(500).json({sucess: false})
  }
  res.send(userList);
})

// pass specific userID in URL and collect specific user profile
router.get(`/:userID`, async (req, res) => {
    const userID = req.params.userID;
  
    const params = {
        Key: {
            "PK": userID,
            "SK": "profile"
        },
        TableName: TABLE_NAME
    };
    // await dynamodb.scan(params).promise()
    // returns object that has items: [user1, user2]
    const user = await documentClient.get(params).promise()
    if(!user) {
        res.status(500).json({sucess: false})
    }
    res.send(user);
  })

// creating a new user
router.post(`/`, (req, res) => {
  const params = {
      TableName: TABLE_NAME,
      Item: {
          PK: req.body.PK,
          SK: req.body.SK,
          firstName: req.body.firstName,
          lastName: req.body.lastName,  
      }
  }

  documentClient.put(params, (err, data) => {
      if(err) console.log(err);
      console.log('[response]', data)
      res.status(201).send();
  }).promise();

  // read/write data to database using API
  // saves user to the database with call back function
  // 201 indicates successful creation of document
  // catch error 500, return error object
  // user.save((error) => {
  //     if (error) {
  //         console.error(error);
  //     } else {
  //         console.log("Save operation was successful.");
  //     }
  // });
})

// updating a user
router.put(`/:userID`, async (req, res) => {
    const user = req.body;
    // grab and destructure userID property
    // this can also be const userID = req.params.userID;
    const { userID } = req.params;
    user.userID = userID;
    try {
        const updatedUser = await addOrUpdateItem(user, TABLE_NAME);
        res.json(updatedUser);
    } catch (error) {
        console.error(err);
        res.status(500).json({err:'something went wrong'});
    }
  })

// delete user

router.delete('/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        res.json(await deleteItem(userID, TABLE_NAME));
    } catch (err) {
        console.error(err);
        res.status(500).json({err: 'something went wrong'})
    }
});

//export a module
module.exports=router;