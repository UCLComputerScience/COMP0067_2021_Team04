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
  res.send(testsList);
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
        res.status(500).json({sucess: false})
    }
    res.send(test);
  })

router.post(`/`, (req, res) => {

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

  documentClient.put(params, (err, data) => {
      if(err) console.log(err);
      console.log('[response]', data)
  }).promise();
})

//export a module
module.exports=router;