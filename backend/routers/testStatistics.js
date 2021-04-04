const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');

const TABLE_NAME = 'UCL-TT-test-statistics';

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

router.get(`/`, async (req, res) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();


  const params = {
      TableName: TABLE_NAME
  };

  const testStatisticsList = await documentClient.scan(params).promise()
  if(!testStatisticsList) {
      res.status(500).json({sucess: false})
  }
  res.send(testStatisticsList);
})

router.get(`/:userID`, async (req, res) => {
    const userID = req.params.userID;
    const dateFinished = req.params.dateFinished;
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    const params = {
        Key: {
            "userID": userID,
            "dateFinished": "02/09/21"
        },
        TableName: TABLE_NAME
    };
    const testStatistic = await documentClient.get(params).promise()
    if(!testStatistic) {
        res.status(500).json({sucess: false, message: 'The test with the given ID was no found'})
    }
    res.status(200).send(testStatistic);
  })

router.post(`/`, (req, res) => {

  const documentClient = new AWS.DynamoDB.DocumentClient();

  const params = {
      TableName: TABLE_NAME,
      Item: {
          testID: req.body.testID,
          dateFinished: req.body.dateFinished,
          status: req.body.status,
          userID: req.body.userID,
          score: req.body.score,
          timeTaken: req.body.timeTaken,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          answers: req.body.answers,
      }
  }

  try {
    const testStatistic = await documentClient.put(params).promise();    
    res.send(testStatistic);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

router.put(`/:testStatisticID`, async (req, res) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const testStatistic = req.body;

    const params = {
        TableName: TABLE_NAME,
        Item: testStatistic,
    };
    try {
        updatedtestStatistic = await documentClient.put(params).promise();
        res.status(200).json({success: true, message: 'the test is updated'});
    } catch (err) {
        console.error(err);
        res.status(400).json({success: false, error: err});
    }

})

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