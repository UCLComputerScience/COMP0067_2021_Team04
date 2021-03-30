const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');

const TABLE_NAME = 'UCL-TT-classes';

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
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

router.post(`/`, (req, res) => {

  const documentClient = new AWS.DynamoDB.DocumentClient();

  const params = {
      TableName: TABLE_NAME,
      Item: {
          classID: req.body.classID,
          teacherID: req.body.teacherID,
          className: req.body.className,
          childID: req.body.childID
      }
  }

  documentClient.put(params, (err, data) => {
      if(err) console.log(err);
      console.log('[response]', data)
  }).promise();
})

router.put(`/:classID`, async (req, res) => {
    const classItem = req.body;
    const { classID } = req.params;
    classItem.classID = classID;
    try {
        const updatedClass = await addOrUpdateItem(classItem, TABLE_NAME);
        res.json(updatedClass);
    } catch (error) {
        console.error(err);
        res.status(500).json({err:'something went wrong'});
    }
  })

router.delete('/:classID', async (req, res) => {
    const { classID } = req.params;
    try {
        res.json(await deleteItem(classID, TABLE_NAME));
    } catch (err) {
        console.error(err);
        res.status(500).json({err: 'something went wrong'})
    }
});

//export a module
module.exports=router;