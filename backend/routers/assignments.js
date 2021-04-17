const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const validators = require('./validators/assignmentsValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// get user's test assignments
router.get(`/:PK`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME
    };

    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.PK) {
        params.KeyConditionExpression = 'PK = :pk AND begins_with(SK, :sk)',
        params.ExpressionAttributeValues = {
            ':pk': req.params.PK,
            ':sk': "assignment"
        }
        
    } else {
        // check if query parameter exists
        if(req.query.PK) {
            params.Key = {
                PK: req.query.PK,
            }
            params.KeyConditionExpression = 'PK = :pk AND begins_with(SK, :sk)',
            params.ExpressionAttributeValues = {
                ':pk': req.params.PK,
                ':sk': req.params.SK
            }
        }
    }
    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})

// get class' assignments
router.get(`/classAssignments/:GSI1`, async (req, res) => {

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
            ':gsi1': req.params.GSI1, // class_id
            ':sk': "assignment"
        }
        
    } else {
        // check if query parameter exists
        if(req.query.GSI1) {
            params.IndexName = 'GSI1-SK-index'
            params.KeyConditionExpression = 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
            params.ExpressionAttributeValues = {
                ':gsi1': req.params.GSI1,
                ':sk': "assignment"
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



router.post(`/`, [ ...validators.postAssignmentsValidators], async (req, res) => {

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
        PK: req.body.PK, //user_id
        SK: req.body.SK, //assignment_id
        GSI1: req.body.GSI1, //class_id
        data: req.body.data
    }
    }

  try {
    const assignment = await documentClient.put(params).promise();    
    res.status(201).send(assignment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

//update user assignment (need alteration and may not be necessary)
router.put(`/:userID`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME,
        Item: req.body
    };

    // let responseData;

    if (req.params.userID) {
        params.Key = {
            userID: req.params.userID,
            dateFinished: req.body.dateFinished
        }
        params.UpdateExpression = 'set timeTaken = :newTime, accuracy = :newAccuracy, experience = :newExperience'
        params.ExpressionAttributeValues = {
            ":newTime": req.body.timeTaken,
            ":newAccuracy": req.body.accuracy,
            ":newExperience": req.body.experience
        }
        params.ReturnValues = "UPDATED_NEW"
    }
    try {
        updatedassignment = await documentClient.update(params).promise();
        res.status(200).json({success: true, message: 'the test assignment is updated'});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: 'the test assignment could not be updated', error: err});
    }

})

// delete user assignments (needs modification)
router.delete('/:PK', async (req, res) => {

    let responseData;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.params.PK,
            SK: "assignment"
        },
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': req.params.PK, //user_id
            ':sk': "assignment"
        }
    };
    responseData = await documentClient.query(params).promise()
    for (item in responseData['Items']){
        console.log("item")
        console.log(item)
        params = {
            TableName: TABLE_NAME,
            Key: {
                PK: item.PK,
                SK: item.SK
            }
        }
        console.log(params)
        try {
            res.json(await documentClient.delete(params).promise());
        } catch (err) {
            console.error(err);
            res.status(500).json({err: 'Something went wrong deleting the record'})
        }
    }
});

//export a module
module.exports=router;