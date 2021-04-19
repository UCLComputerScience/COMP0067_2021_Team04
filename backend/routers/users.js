const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/usersValidators');
const {validateAuth} = require('../auth');

// return json web token 
const jwt = require('jsonwebtoken');


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
router.get(`/individual/:userID`, async (req, res) => {
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

// Registering as a new student (and create student-class relationship)
router.post(`/register/student`, [ ...validators.postStudentValidators], async (req, res) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    } else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
                    PK: `user_${req.body.PK}`, //user_id
                    SK: 'profile', //profile
                    GSI1: `class_${req.body.GSI1}`, //class_id
                    data: {
                        firstName: req.body.data.firstName,
                        lastName: req.body.data.lastName,
                        // hashing user password
                        hashPassword: bcrypt.hashSync(req.body.data.password, 10),
                        role: "student",
                        secret: "studentSecret",
                        avatar: "bug pic",
                        pendingAssignments: 0
                        },
                    overall: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0, 
                    },
                    onex: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    twox: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    threex: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    fourx: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    fivex: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    sixx: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    sevenx: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    eightx: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    ninex: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    tenx: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    elevenx: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    },
                    twelvex: {
                        testsTaken: 0,
                        timeTaken: 0,
                        accuracy: 0,
                        state: 'beginner'
                    }
                    }
                }
      console.log(params)
  try {
    const user = await documentClient.put(params).promise();    
    console.log(user)
    res.status(201).json({
        message: "You have successfully registered as a student. Please now login.",
        success: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }
}
})

// Registering as a new teacher
router.post(`/register/teacher`, [ ...validators.postTeacherValidators], async (req, res) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.array()
        })
    } else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: `user_${req.body.PK}`, //user_id
        SK: 'profile', //profile
        GSI1: `school_${req.body.GSI1}`, //school_id,
        data: {
            firstName: req.body.data.firstName,
            lastName: req.body.data.lastName,
            "email": req.body.data.email,
            // hashing user password
            hashPassword: bcrypt.hashSync(req.body.data.password, 10),
            role: req.body.data.role,
        }
    }
    }
  try {
    const user = await documentClient.put(params).promise();    
    console.log(user)
    res.status(201).json({
        message: "You have successfully registered as a teacher. Please now login.",
        success: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }}
})

// Registering as a new parent
router.post(`/register/parent`,[ ...validators.postParentValidators], async (req, res) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    } else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
                    PK: `user_${req.body.PK}`, //user_id
                    SK: 'profile', //profile
                    GSI1: `user_${req.body.GSI1}`, //user_id
                    data: {
                        firstName: req.body.data.firstName,
                        lastName: req.body.data.lastName,
                        // hashing user password
                        hashPassword: bcrypt.hashSync(req.body.data.password, 10),
                        role: "parent",
                        email: req.body.data.email
                        }
                    }
                }
  try {
    const user = await documentClient.put(params).promise();   
    console.log(user) 
    res.status(201).json({
        message: "You have successfully registered as a parent. Please now login.",
        success: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }
}}
)

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


// Logging in
router.post('/login', async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
        Key : {
            "PK": `user_${req.body.PK}`,
            "SK": "profile"
        }

        } 
    const secret = process.env.SECRET;
    const password = req.body.password
    const user = await documentClient.get(params).promise()
    if(!user.Item) {
        return res.status(400).json({
            message: 'Username is not found.',
            success: false})
    } else {
        if(user.Item && bcrypt.compareSync(password, user.Item.data.hashPassword)){
            let token = jwt.sign({
                PK: user.Item.PK,
                role: user.Item.data.role,
                GSI1: user.Item.GSI1
            },
            // user authentication token
            secret,
            // token expires in 1 day
            {expiresIn: '7 days'}
            )

            let result = {
                token,
                PK: user.Item.PK,
                role: user.Item.data.role,
                GSI1: user.Item.GSI1,
                expiresIn: 168,
                data: user.Item.data,
                overall: user.Item.overall,
                onex: user.Item.onex,
                twox: user.Item.twox,
                threex: user.Item.threex,
                fourx: user.Item.fourx,
                fivex: user.Item.fivex,
                sixx: user.Item.sixx,
                sevenx: user.Item.sevenx,
                eightx: user.Item.eightx,
                ninex: user.Item.ninex,
                tenx: user.Item.tenx,
                elevenx: user.Item.elevenx,
                twelvex: user.Item.twelvex,                
            };
            res.status(200).json({
                ...result,
                message: "You have successfully logged in.",
                success: true})
        }   else {
            return res.status(400).json({
                message: 'Password is incorrect.',
                success: false})
        }
    }
})

//export a module
module.exports=router;

