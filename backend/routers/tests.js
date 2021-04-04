const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');

const TABLE_NAME = 'UCL-TT-tests';

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

router.get(`/`, async (req, res) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();


  const params = {
      TableName: TABLE_NAME
  };

  const testsList = await documentClient.scan(params).promise()
  if(!testsList) {
      res.status(500).json({sucess: false})
  }
  res.status(200).send(testsList);
})

router.get(`/:testID`, async (req, res) => {
    const testID = req.params.testID;
    const documentClient = new AWS.DynamoDB.DocumentClient();
  
    const params = {
        Key: {
            "testID": testID,
        },
        TableName: TABLE_NAME
    };
    const test = await documentClient.get(params).promise()
    if(!test) {
        res.status(500).json({sucess: false, message: 'The test with the given ID was no found'})
    }
    res.status(200).send(test);
  })

router.post(`/`, async (req, res) => {

  const documentClient = new AWS.DynamoDB.DocumentClient();

  const params = {
      TableName: TABLE_NAME,
      Item: {
          testID: req.body.testID,
          timestable: req.body.timestable,
          difficulty: req.body.difficulty,
          questions: req.body.questions
      }
  }
  try {
    const test = await documentClient.put(params).promise();    
    res.send(test);
    } catch (err) {
        console.error(err);
        res.status(404).send('Something went wrong');
    }
})

router.put('/:testID', async (req, res) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const test = req.body;
    // not necessary
    const testID = req.params.testID;

    const params = {
        TableName: TABLE_NAME,
        Item: test,
    };
    try {
        updatedTest = await documentClient.put(params).promise(); 
        res.status(200).json({success: true, message: 'the test is updated'})  
      } catch (err) {
            console.error(err);
            res.status(400).json({success: false, error: err});
        } 
})

router.delete(`/:testID`, async (req, res) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
  
    const testID = req.params.testID;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            testID,
        },
    };
    try {
      test = await documentClient.delete(params).promise();  
      res.status(200).json({success: true, message: 'the test is deleted'})  
    } catch (err) {
          console.error(err);
          res.status(400).json({success: false, error: err});
      }
  })

//export a module
module.exports=router;