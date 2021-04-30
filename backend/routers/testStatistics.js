const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/testStatisticsValidators');
const {validateAuth} = require('../auth');
const { postAssignmentsValidators } = require('./validators/assignmentsValidators.js');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// Submit a test statistic
router.post(`/`, async (req, res) => {

    // check for 100% tests
    const paramsTestStats = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.#correctQuestions = :correctQuestions',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#correctQuestions': 'correctQuestions'
        },
        ExpressionAttributeValues: {
            ':pk': req.body.PK,
            ':sk': `testStatistic_${req.body.SK}`,
            ':correctQuestions': 14, 
        }
    };
    const testStats = await documentClient.query
    (paramsTestStats).promise()
    console.log(testStats)


    // // check for assignments
    // let diff;
    // if (req.body.SK.slice(-1) == 'B') {
    //     diff = 'beginner'
    // } else if (req.body.SK.slice(-1) == 'I') {
    //     diff = 'intermediate'
    // } else {
    //     diff = 'advanced'
    // }
    // checkAssignmentsParams = {
    //     TableName: TABLE_NAME,
    //     KeyConditionExpression: 'PK = :pk AND SK = :sk',
    //     FilterExpression: `#data.${req.body.timestable}.${diff}.pendingAssignments > :zero`,
    //     ExpressionAttributeNames: {'#data': 'data'},
    //     ExpressionAttributeValues: {
    //         ':pk': req.body.PK,
    //         ':sk': 'statistics',
    //         ':zero': 0
    //     }
    // }

    checkAssignmentsParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.difficulty = :difficulty AND #data.timestable = :timestable',
        ExpressionAttributeNames: {'#data': 'data'},
            ExpressionAttributeValues: {
                ':pk': req.body.PK,
                ':sk': 'assignment_',
                ':difficulty': req.body.difficulty,
                ':timestable': req.body.timestable
            }
        
    }

    try {
    assignments = await documentClient.query(checkAssignmentsParams).promise()
    } catch (err) {
        console.log(err);
        res.status(400).json({
            "message": "Querying assignments failed",
            success: false
        })
    }
    console.log(assignments)

    // delete assignment
    if (assignments.Items.length !== 0) {
        const deleteParams = {
            TableName: TABLE_NAME,
            Key: {
                PK: req.body.PK,
                SK: assignments.Items[0].SK
            }
        }

        try {
            await documentClient.delete(deleteParams).promise()
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    "message": "Deleting assignment failed",
                    success: false
                })
            }

        const updateProfilePending = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK, //user_id
            SK: 'profile',
        },
        UpdateExpression: 'ADD #data.pendingAssignments :testsinc',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':testsinc': -1,  
        }
        }    
        try {
            await documentClient.update(updateProfilePending).promise()
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    "message": "Updating assignment failed",
                    success: false
                })
            }
    }
    


    const date = new Date();
    console.log(date.toISOString())
    dateISO = date.toISOString()
    // posting test statistic
    const experience = parseInt(req.body.data.correctQuestions) * 10 + 0.5 * 140 - parseInt(req.body.data.timeTaken)
    console.log(experience)
    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: req.body.PK, //user_id
        SK: `testStatistic_${req.body.SK}_${uuid.v4()}`, // teststatistic_timestable_randomid
        GSI1: req.body.GSI1, //class_id
        data: {
            date: `${dateISO}`,
            timeTaken: req.body.data.timeTaken,
            questions: req.body.data.questions,
            correctQuestions: req.body.data.correctQuestions,
            experience: experience
        }
    }
    }

    // Updating profile stats
    timestable = req.body.timestable
    const params2 = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK, //user_id
            SK: 'profile',
        },
        UpdateExpression: 'ADD overall.testsTaken :testsinc, overall.questions :questionsinc, overall.correctQuestions :correctquestionsinc, overall.timeTaken :timeinc, #data.experience :experienceinc',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':testsinc': 1,
            ':questionsinc': req.body.data.questions,
            ':correctquestionsinc': req.body.data.correctQuestions,
            ':timeinc': req.body.data.timeTaken,
            ':experienceinc': experience
            
        }
    }
    if (req.body.data.correctQuestions == 14 && testStats.Items.length == 0) {
        
        params2.UpdateExpression = `ADD overall.testsTaken :testsinc, overall.questions :questionsinc, overall.correctQuestions :correctquestionsinc, overall.timeTaken :timeinc, #data.experience :experienceinc, #data.score :testsinc, ${req.body.timestable} :testsinc`
         
        if (req.body.SK.slice(-1) == 'A') {
            params2.UpdateExpression = `ADD overall.testsTaken :testsinc, overall.questions :questionsinc, overall.correctQuestions :correctquestionsinc, overall.timeTaken :timeinc, #data.experience :experienceinc, #data.score :testsinc, ${req.body.timestable} :testsinc, overall.timestableMastered :testsinc`
        } 

    }


    // Updating user indepth stats
    let difficulty;
    if (req.body.SK.slice(-1) == 'A') {
        difficulty = 'advanced'
    } else if (req.body.SK.slice(-1) == 'I') {
        difficulty = 'intermediate'
    } else if (req.body.SK.slice(-1) == 'B') {
        difficulty = 'beginner'
    }
    const params3 = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK, //user_id
            SK: 'statistics',
        },
        UpdateExpression: `ADD #data.${timestable}.${difficulty}.testsTaken :testsinc, #data.${timestable}.${difficulty}.questions :questionsinc, #data.${timestable}.${difficulty}.correctQuestions :correctquestionsinc, #data.${timestable}.${difficulty}.timeTaken :timeinc`,
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':testsinc': 1,
            ':questionsinc': req.body.data.questions,
            ':correctquestionsinc': req.body.data.correctQuestions,
            ':timeinc': req.body.data.timeTaken,
            
        }
    }
    // console.log("params3:")
    // console.log(params3)


    try {
        await documentClient.put(params).promise();   
        await documentClient.update(params2).promise();  
        await documentClient.update(params3).promise();  
        updatedProfile = await documentClient.get({
            TableName: TABLE_NAME,
            Key: {
                PK: req.body.PK, 
                SK: 'profile',
            }}).promise();
        if (req.body.data.correctQuestions == 14 && testStats.Items.length == 0 && req.body.SK.slice(-1) == 'A') {
            res.status(200).json({
                message: "Congratulations you have mastered this timestable",
                success: true,
                updatedProfile
                });
        }
        else if (req.body.data.correctQuestions == 14 && testStats.Items.length == 0) {
            res.status(200).json({
                message: "You have unlocked a new level!",
                success: true,
                updatedProfile
                });
        } else {
        res.status(200).json({
            message: 'Congratulations. You have finished the test',
            success: true,
            updatedProfile
            });}
        } catch (err) {
            console.error(err);
            res.status(400).send('Test error.');
        }
}
)


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

// Get indepth statistics of a students timestables
router.get(`/indepth/:PK`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME, 
        Key: {
            PK: req.params.PK,
            SK: 'statistics'
        }
    };

    try {
        const testStats = await documentClient.get(params).promise()
        console.log(testStats) 
        res.status(200).json({
            message: "You have retrieved indepth test stats",
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