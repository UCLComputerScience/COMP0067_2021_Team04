const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/usersValidators');
const {validateAuth} = require('../auth');

//hashing password
const bcrypt = require("bcryptjs")

AWS.config.update({
    
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// create the document client interface for DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient();

//specify table name to connect to
const TABLE_NAME = 'UCL-TT-USERS-V2';
// async method + await so when you call the userlist from dynamodb, it will wait to be filled before sending the response to the frontend
// get all user profiles within a class
router.get(`/:GSI1`, async (req, res) => {

  const params = {
      TableName: TABLE_NAME,
      IndexName:'GSI1-SK-index',
      KeyConditionExpression: 'GSI1 = :gsi1 and SK =:sk',
      ExpressionAttributeValues: {
          ':gsi1': req.params.GSI1, // potentially change class_id => school_id_class_id
          ':sk': "profile"
      } 

  };
    // create an empty object to hold the response
    let responseData;

    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
  // await dynamodb.scan(params).promise()
  // returns object that has items: [user1, user2]
//   const userList = await documentClient.scan(params).promise()
//   if(!userList) {
//       res.status(500).json({sucess: false})
//   }
//   res.send(userList);
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
router.post(`/`, [validateAuth, ...validators.postUsersValidators], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }  

    const params = {
        RequestItems: {
          'UCL-TT-USERS-V2': [
            {
              PutRequest: {
                Item: {
                    PK: req.body.PK, //user_id
                    SK: req.body.SK, //profile
                    GSI1: req.body.GSI1, //class_id?
                    data: {
                        firstName: req.body.data.firstName,
                        lastName: req.body.data.lastName,
                        email: req.body.data.email,
                        // hashing user password
                        hashPassword: bcrypt.hashSync(req.body.data.password, 10),
                        role: req.body.data.role
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        PK: req.body.GSI1, //class_id
                        SK: req.body.SK2, //classMember_id
                        GSI1: req.body.PK, //user_id *test if this is necessary
                        data: {
                            role: req.body.data.role
                        }
                    }
                }
              }

        ]
        }
      };
      console.log(params)
  try {
    const user = await documentClient.batchWrite(params).promise();    
    res.status(201).send(user);
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }
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

// logging in

router.post('/login', async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
        Key : {
            "PK": `user_${req.body.PK}`,
            "SK": "profile"
        }

        } 
    const password = req.body.password
    const user = await documentClient.get(params).promise()
    if(!user.Item) {
        return res.status(400).send('The user not found')
    } else {
        if(user.Item && bcrypt.compareSync(password, user.Item.data.hashPassword)){
            res.status(200).send('user authenticated')
        }   else {
            res.status(400).send('wrong password.')
        }
    }
})

//export a module
module.exports=router;

