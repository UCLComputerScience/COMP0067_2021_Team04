const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/testStatisticsValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// get user's test statistics
router.get(`userStatistics/:PK`, async (req, res) => {

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
            ':sk': "test_statistic"
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

// get user's test statistics (specific timestable)
router.get(`/userStatistics/:PK/:timestable?`, async (req, res) => {

    const timestable = req.params.timestable ? req.params.timestable : ""
    //eventual filter
    // const days = req.params.days ? req.params.days : 7
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
            ':sk': `test_statistic_${timestable}`
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

    // filter by day 
    // const filteredResults = responseData.Items.filter(item => dateNow - item.Data.dateFinished > x)
})

// get class' test statistics
router.get(`/classStatistics/:GSI1/`, async (req, res) => {
    // localhost:3000/api/v1/testStatistics/classStatistics/:GSI1/
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':gsi1': req.params.GSI1, // class_id
            ':sk': "test_statistic"
        }
    };
    // create an empty object to hold the response
    let responseData;

    // check if query parameter exists
    if(req.query.timestable) {
        params.ExpressionAttributeValues = {
            ':gsi1': req.params.GSI1,
            ':sk': `test_statistic_${req.query.timestable}`
        }
    }
    
    console.log(params)
    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
        console.log(responseData.Items[0].experience)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})



router.post(`/`, [ ...validators.postTestStatisticsValidators], async (req, res) => {

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
        SK: req.body.SK, //testStatistic_timestableDifficulty_id
        GSI1: req.body.GSI1, //class_id
        dateFinished: req.body.dateFinished,
        timetaken: req.body.timeTaken,
        accuracy: req.body.accuracy,
        difficulty: req.body.difficulty,
        experience: req.body.experience,
        timestable: req.body.timestable
    }
    }

  try {
    const testStatistic = await documentClient.put(params).promise();    
    res.status(201).send(testStatistic);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

//update user statistic (need alteration and may not be necessary)
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
        updatedtestStatistic = await documentClient.update(params).promise();
        res.status(200).json({success: true, message: 'the test statistic is updated'});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: 'the test statistic could not be updated', error: err});
    }

})

// delete user statistics (needs modification)
router.delete('/:PK', async (req, res) => {

    let responseData;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.params.PK,
            SK: "test_statistic"
        },
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': req.params.PK, //user_id
            ':sk': "test_statistic"
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