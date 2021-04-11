const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/classesValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// get all information about a class
router.get(`/:PK`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME
    };

    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.PK) {
        params.KeyConditionExpression = 'PK = :pk',
        params.ExpressionAttributeValues = {
            ':pk': req.params.PK, //class_id
        }
        
    } else {
        // check if query parameter exists
        if(req.query.PK) {
            params.Key = {
                PK: req.query.PK,
            }
            params.KeyConditionExpression = 'PK = :pk',
            params.ExpressionAttributeValues = {
                ':pk': req.params.PK,
            }
        }
    }
    console.log(params)
    // check if the parameter has NOT been passed in
    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})

// get all information about the classes a user is within
router.get(`/getClasses/:GSI1`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME
    };

    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.GSI1) {
        params.IndexName = 'GSI1-SK-index'
        params.KeyConditionExpression = 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        params.ExpressionAttributeValues = {
            ':gsi1': req.params.GSI1, //user_id
            ':sk': "classMember" 
        }
        
    } else {
        // check if query parameter exists
        if(req.query.PK) {
            params.Key = {
                PK: req.query.PK,
            }
            params.KeyConditionExpression = 'PK = :pk',
            params.ExpressionAttributeValues = {
                ':pk': req.params.PK,
            }
        }
    }
    console.log(params)
    // check if the parameter has NOT been passed in
    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})



router.get(`/`, async (req, res) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();


  const params = {
      TableName: TABLE_NAME
  };

  const classesList = await documentClient.scan(params).promise()
  if(!classesList) {
      res.status(500).json({sucess: false})
  }
  res.send(classesList);
})

router.get(`/:classID`, async (req, res) => {
    const classID = req.params.classID;
    const documentClient = new AWS.DynamoDB.DocumentClient();
  
    const params = {
        Key: {
            "classID": classID
        },
        TableName: TABLE_NAME
    };
    const classItem = await documentClient.get(params).promise()
    if(!classItem) {
        res.status(500).json({sucess: false})
    }
    res.send(classItem);
  })

router.post(`/`, [validateAuth, ...validators.postClassesValidators], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // 400 code equals bad request
        // send back a response with a json
        res.status(400).json({
            errors: errors.array()
        })
    }  

    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: req.body.PK,
        SK: req.body.SK,  
        GSI1: req.body.GSI1,
        name: req.body.name,
        year: req.body.year     
    }
    }

  try {
    const schoolClass = await documentClient.put(params).promise();    
    res.status(201).send(schoolClass);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

router.post(`/newMember/`, [validateAuth, ...validators.postMembersValidators], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }  

    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: req.body.PK,
        SK: req.body.SK,  
        GSI1: req.body.GSI1,
        role: req.body.role  
    }
    }

  try {
    const schoolClass = await documentClient.put(params).promise();    
    res.status(201).send(schoolClass);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// router.put(`/:classID`, async (req, res) => {
//     const classItem = req.body;
//     const { classID } = req.params;
//     classItem.classID = classID;
//     try {
//         const updatedClass = await addOrUpdateItem(classItem, TABLE_NAME);
//         res.json(updatedClass);
//     } catch (error) {
//         console.error(err);
//         res.status(500).json({err:'something went wrong'});
//     }
//   })

// router.delete('/:classID', async (req, res) => {
//     const { classID } = req.params;
//     try {
//         res.json(await deleteItem(classID, TABLE_NAME));
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({err: 'something went wrong'})
//     }
// });

module.exports=router;