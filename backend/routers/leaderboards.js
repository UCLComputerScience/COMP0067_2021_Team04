const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/testStatisticsValidators');
const {validateAuth} = require('../auth');
const { restart } = require('nodemon');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';


// Get profiles of class for leaderboards
router.get(`/class/:GSI1`, async (req, res) => {

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
            ':gsi1': req.params.GSI1, //class_id
            ':sk': "profile" 
        }
        
    } else {
        // check if query parameter exists
        if(req.query.GSI1) {
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
        res.status(200).json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 

})
// Get profiles of school for leaderboards
router.get(`/school/:PK`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :PK AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':PK': req.params.PK, //class_id
            ':sk': "meta" 
        }
    };

    let school;
        

    try {
        // Get school_id of the student
        school = await documentClient.query(params).promise()
    } catch (error) {
        res.status(500).send("Unable to collect school record: " + error)
    } 
    schoolId = school.Items[0].GSI1

    const params2 = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        IndexName: 'GSI1-SK-index',
        ExpressionAttributeValues: {
             ':gsi1': schoolId, //school_id
             ':sk': "meta" 
    }
    }

    try {
        // Get all class ids in the school
        classIds = await documentClient.query(params2).promise()
    } catch (error) {
        res.status(500).send("Unable to collect class records: " + error)
    } 
    console.log(classIds.Items)
    let schoolProfiles;
    for (item in classIds.Items) {
        try {
            const params3 = {
                TableName: TABLE_NAME,
                KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
                IndexName: 'GSI1-SK-index',
                ExpressionAttributeValues: {
                     ':gsi1': item.PK, // class_id
                     ':sk': "profile" 
            }
            }
            classProfiles = await documentClient.query(params3).promise()
            for (profile in classProfiles.Items){
                schoolProfiles += profile
            }
        } catch (error) {
            res.status(500).send("Unable to collect profiles: " + error)
        }
        

    };
    res.status(200).json(schoolProfiles)

})



//export a module
module.exports=router;