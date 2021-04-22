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

// Submit a test statistic
router.post(`/`, async (req, res) => {

    const date = new Date();
    console.log(date.toISOString())
    dateISO = date.toISOString()
    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: req.body.PK, //user_id
        SK: `testStatistic_${req.body.SK}_${uuid.v4()}`, // teststatistic_timestable_randomid
        GSI1: req.body.GSI1, //class_id
        data: {
            date: `${dateISO}`,
            timeTaken: req.body.data.timeTaken,
            accuracy: req.body.data.accuracy,
            experience: req.body.data.experience,
        }
    }
    }

    const profile = await documentClient.get(params3).promise(); 
    console.log(profile)

    timestable = req.body.timestable
    const params2 = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK, //user_id
            SK: 'profile', // teststatistic_timestable_randomid
        },
        UpdateExpression: 'ADD overall.testsTaken :testsinc, overall.accuracy :accuracyinc, overall.timeTaken :timeinc, #data.experience :experienceinc',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':testsinc': 1,
            ':accuracyinc': req.body.data.accuracy,
            ':timeinc': req.body.data.timeTaken,
            ':experienceinc': req.body.data.experience
            
        }
    }

    if (req.body.data.accuracy == 100 & profile.timestable == 2) {
        params2.UpdateExpression = `ADD overall.testsTaken :testsinc, overall.accuracy :accuracyinc, overall.timeTaken :timeinc, #data.experience :experienceinc, ${req.body.timestable} :testsinc, overall.timestableMastered :testsinc`
    }
    console.log(params2);


    try {
        const testStat = await documentClient.put(params).promise();   
        const stat = await documentClient.update(params2).promise();     
        res.status(200).json({
            message: "You have successfully inserted a test stat.",
            success: true
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('Test stat could not be inserted');
        }
}
)

// Update user's profile stats
// router.put(`/profile/`, async (req, res) => {

//     timestable = req.body.timestable
//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             PK: req.body.PK, //user_id
//             SK: 'profile', // teststatistic_timestable_randomid
//         },
//         UpdateExpression: `SET ${req.body.timestable.testsTaken} + :qinc, SET `,
//         ExpressionAttributeValues: {
//             'qinc': 1,
            
//         }
//         data: {
//             date: `${dateISO}`,
//             timeTaken: req.body.data.timeTaken,
//             accuracy: req.body.data.accuracy,
//             experience: req.body.data.experience,
//         }
//     }
//     }


//     try {
//         const testStat = await documentClient.update(params).promise();   
//         console.log(testStat) 
//         res.status(200).json({
//             message: "You have successfully inserted a test stat.",
//             success: true
//             });
//         } catch (err) {
//             console.error(err);
//             res.status(400).send('Test stat could not be inserted');
//         }
// }
// )

// get user's test statistics for a specific timestable and difficulty (and within the last week)
// userStatistics/user_mathsqueen/2B?starttime=2021-04-22T00:40:57.817Z&endtime=2021-04-22T03:00:57.817Z
router.get(`/userStatistics/:PK/:SK`, async (req, res) => {
    
    starttime = req.query.starttime ? req.query.starttime : '2020-04-22T00:40:57.817Z'
    endtime = req.query.endtime ? req.query.endtime : new Date().toISOString()

    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.#date BETWEEN :starttime AND :endtime',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#date': 'date'
        },
        ExpressionAttributeValues: {
            ':pk': req.params.PK,
            ':sk': `testStatistic_${req.params.SK}`,
            ':starttime': starttime, 
            ':endtime': endtime,
        }
    };

    try {
        const testStats = await documentClient.query(params).promise()
        console.log(testStats) 
        res.status(200).json({
            message: "You have retrieved your test stats",
            success: true,
            testStats
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Test stats could not be retrieved',
                success: false});
        }
})

// // get user's test statistics (specific timestable)
// router.get(`/userStatistics/:PK/:timestable?`, async (req, res) => {

//     const timestable = req.params.timestable ? req.params.timestable : ""
//     //eventual filter
//     // const days = req.params.days ? req.params.days : 7
//     const params = {
//         TableName: TABLE_NAME
//     };

//     // create an empty object to hold the response
//     let responseData;

//     // check if URI parameters exists
//     if (req.params.PK) {
//         params.KeyConditionExpression = 'PK = :pk AND begins_with(SK, :sk)',
//         params.ExpressionAttributeValues = {
//             ':pk': req.params.PK,
//             ':sk': `test_statistic_${timestable}`
//         }
        
//     } else {
//         // check if query parameter exists
//         if(req.query.PK) {
//             params.Key = {
//                 PK: req.query.PK,
//             }
//             params.KeyConditionExpression = 'PK = :pk AND begins_with(SK, :sk)',
//             params.ExpressionAttributeValues = {
//                 ':pk': req.params.PK,
//                 ':sk': req.params.SK
//             }
//         }
//     }
//     try {
//         responseData = await documentClient.query(params).promise()
//         res.json(responseData)
//     } catch (error) {
//         res.status(500).send("Unable to collect record: " + error)
//     } 

//     // filter by day 
//     // const filteredResults = responseData.Items.filter(item => dateNow - item.Data.dateFinished > x)
// })

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