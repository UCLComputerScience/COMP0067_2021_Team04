const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');

const TABLE_NAME = 'UCL-TT-questions';

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

router.get(`/`, async (req, res) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();


  const params = {
      TableName: TABLE_NAME
  };

  const questionsList = await documentClient.scan(params).promise()
  if(!questionsList) {
      res.status(500).json({sucess: false})
  }
  res.send(questionsList);
})

router.get(`/:questionID`, async (req, res) => {
    const questionID = req.params.questionID;
    const documentClient = new AWS.DynamoDB.DocumentClient();
  
    const params = {
        Key: {
            "questionID": questionID,
        },
        TableName: TABLE_NAME
    };
    const question = await documentClient.get(params).promise()
    if(!question) {
        res.status(500).json({sucess: false})
    }
    res.send(question);
  })

router.post(`/`, (req, res) => {

  const documentClient = new AWS.DynamoDB.DocumentClient();

  const params = {
      TableName: TABLE_NAME,
      Item: {
          questionID: req.body.questionID,
          timestable: req.body.timestable,
          difficulty: req.body.difficulty,
          questionString: req.body.questionString,
          questionAnswer: req.body.questionAnswer
      }
  }

  documentClient.put(params, (err, data) => {
      if(err) console.log(err);
      console.log('[response]', data)
  }).promise();
})

//export a module
module.exports=router;