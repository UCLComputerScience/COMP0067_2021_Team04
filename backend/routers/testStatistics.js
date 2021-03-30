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
    const userID = req.params.testStatisticID;
    const documentClient = new AWS.DynamoDB.DocumentClient();
  
    const params = {
        Key: {
            "userID": userID,
        },
        TableName: TABLE_NAME
    };
    const testStatisticItem = await documentClient.get(params).promise()
    if(!testStatisticItem) {
        res.status(500).json({sucess: false})
    }
    res.send(testStatisticItem);
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

  documentClient.put(params, (err, data) => {
      if(err) console.log(err);
      console.log('[response]', data)
  }).promise();
})

router.put(`/:userID`, async (req, res) => {
    const testStatisticItem = req.body;
    const { userID } = req.params;
    testStatisticItem.userID = userID;
    try {
        const updatedtestStatistic = await addOrUpdateItem(testStatisticItem, TABLE_NAME);
        res.json(updatedtestStatistic);
    } catch (error) {
        console.error(err);
        res.status(500).json({err:'something went wrong'});
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