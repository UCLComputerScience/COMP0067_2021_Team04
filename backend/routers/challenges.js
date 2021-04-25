const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/classesValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// User creates a challenge
router.post('/', async (req, res) => {
    const challengeId = uuid.v4()
    const date = new Date()
    const challengeParams = {

        TableName: TABLE_NAME,
        Item : {
            PK: req.body.PK, // user_id
            SK: `challenge_${challengeId}`,
            GSI1: req.body.GSI1, // user_id2
            data: {
                player1Score: 0,
                player2Score: 0,
                winner: "",
                state: "pending",
                datePosted: date.toISOString(),
                dateFinished: ""
            }
        }
    }

    try {
        await documentClient.put(challengeParams).promise()
        res.status(200).json({
            message: "Successful challenge",
            success: true
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Challenge failed",
            success: false
        })
    }
})

// Get all pending challenges within the last month
router.get('/pending/:PK', async (req, res) => {
    const date = new Date()
    makeDate = new Date(date.setMonth(date.getMonth() - 1));
    console.log(makeDate.toISOString())
    const yourChallengeParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':pk': req.params.PK,
            ':sk': 'challenge',
            ':state': 'pending',
            ':lastmonth': makeDate.toISOString()
        }
        }
    const theirChallengeParams = {
        TableName: TABLE_NAME,
        IndexName: 'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':gsi1': req.params.PK,
            ':sk': 'challenge',
            ':state': 'pending',
            ':lastmonth': makeDate.toISOString()
        }
        }

    try {
        let allChallenges = []
        const yourChallenges = await documentClient.query(yourChallengeParams).promise()
        const theirChallenges = await documentClient.query(theirChallengeParams).promise()
        if ((yourChallenges.Items.length + theirChallenges.Items.length) == 0) {
            res.status(200).json({
                message: "You have no challenges",
                success: true,
                });
        } else {

        for (i = 0; i < yourChallenges.Items.length; i++) {
            allChallenges.push(yourChallenges.Items[i])
        }
        for (i = 0; i < theirChallenges.Items.length; i++) {
            allChallenges.push(yourChallenges.Items[i])
        }
        res.status(200).json({
            message: "Successful challenge query",
            success: true,
            allChallenges
            // yourChallenges,
            // theirChallenges
            });}
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Challenge query failed",
            success: false
        })
    }
})

// User finishes a challenge
router.put('/', async (req, res) => {
    const challengeId = uuid.v4()
    const date = new Date()
    // const challengeParams = {

    //     TableName: TABLE_NAME,
    //     Item : {
    //         PK: req.body.PK, // user_id
    //         SK: `challenge_${challengeId}`,
    //         GSI1: req.body.GSI1, // user_id2
    //         data: {
    //             player1Score: 0,
    //             player2Score: 0,
    //             winner: "",
    //             state: "pending",
    //             datePosted: date.toISOString(),
    //             dateFinished: ""
    //         }
    //     }
    // }
    let updateParams;
    if (req.body.userId == req.body.PK) {
        if (req.body.player2Score == 0) {
            const updateParams = {
                TableName: TABLE_NAME,
                Key: {
                    PK: req.body.userId,
                    SK: req.body.challengeId,
                },
                UpdateExpression: 'SET #data.player1Score = :score',
                ExpressionAttributeNames: {
                    '#data': 'data'
                },
                ExpressionAttributeValues: {
                    ':score': req.body.score
                }}
    } else {
        if (req.body.player1Score > req.body.player2Score) {
        const updateParams = {
            TableName: TABLE_NAME,
            Key: {
                PK: req.body.userId,
                SK: req.body.challengeId,
            },
            // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
            UpdateExpression: 'SET #data.player1Score = :score AND SET #data.state = :state AND SET #data.winner = :winner',
            ExpressionAttributeNames: {
                '#data': 'data'
            },
            ExpressionAttributeValues: {
                ':score': req.body.score,
                ':state': "completed",
                ':winner': req.body.userId
            }}} else if (req.body.player1Score < req.body.player2Score) {
                const updateParams = {
                    TableName: TABLE_NAME,
                    Key: {
                        PK: req.body.userId,
                        SK: req.body.challengeId,
                    },
                    // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
                    UpdateExpression: 'SET #data.player1Score = :score AND SET #data.state = :state AND SET #data.winner = :winner',
                    ExpressionAttributeNames: {
                        '#data': 'data'
                    },
                    ExpressionAttributeValues: {
                        ':score': req.body.score,
                        ':state': "completed",
                        ':winner': req.body.opponentId
                
            }
        }
    } else {
        const updateParams = {
            TableName: TABLE_NAME,
            Key: {
                PK: req.body.userId,
                SK: req.body.challengeId,
            },
            // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
            UpdateExpression: 'SET #data.player1Score = :score AND SET #data.state = :state AND SET #data.winner = :winner',
            ExpressionAttributeNames: {
                '#data': 'data'
            },
            ExpressionAttributeValues: {
                ':score': req.body.score,
                ':state': "completed",
                ':winner': "draw"
    }
}}}
} else {
        const updateParams = {
            TableName: TABLE_NAME,
            Key: {
                PK: req.body.userId,
                SK: req.body.challengeId,
            },
            // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
            UpdateExpression: 'SET #data.player2Score = :score',
            ExpressionAttributeNames: {
                '#data': 'data'
            },
            ExpressionAttributeValues: {
                ':score': req.body.score
            }
    }
    if (req.body.player1Score == 0) {
        const updateParams = {
            TableName: TABLE_NAME,
            Key: {
                PK: req.body.userId,
                SK: req.body.challengeId,
            },
            UpdateExpression: 'SET #data.player2Score = :score',
            ExpressionAttributeNames: {
                '#data': 'data'
            },
            ExpressionAttributeValues: {
                ':score': req.body.score
            }}
} else {
    if (req.body.player1Score > req.body.player2Score) {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.userId,
            SK: req.body.challengeId,
        },
        // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
        UpdateExpression: 'SET #data.player2Score = :score AND SET #data.state = :state AND SET #data.winner = :winner',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': req.body.userId
        }}} else if (req.body.player1Score < req.body.player2Score) {
            const updateParams = {
                TableName: TABLE_NAME,
                Key: {
                    PK: req.body.userId,
                    SK: req.body.challengeId,
                },
                // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
                UpdateExpression: 'SET #data.player2Score = :score AND SET #data.state = :state AND SET #data.winner = :winner',
                ExpressionAttributeNames: {
                    '#data': 'data'
                },
                ExpressionAttributeValues: {
                    ':score': req.body.score,
                    ':state': "completed",
                    ':winner': req.body.opponentId
            
        }
    }
} else {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.userId,
            SK: req.body.challengeId,
        },
        // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
        UpdateExpression: 'SET #data.player1Score = :score AND SET #data.state = :state AND SET #data.winner = :winner',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': "draw"
}
    }}}}

    try {
        await documentClient.update(updateParams).promise()
        res.status(200).json({
            message: "Successful update",
            success: true
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Update failed",
            success: false
        })
    }
})

// Get all pending challenges within the last month
router.get('/completed/:PK', async (req, res) => {
    const date = new Date()
    makeDate = new Date(date.setMonth(date.getMonth() - 1));
    console.log(makeDate.toISOString())
    const yourChallengeParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':pk': req.params.PK,
            ':sk': 'challenge',
            ':state': 'completed',
            ':lastmonth': makeDate.toISOString()
        }
        }
    const theirChallengeParams = {
        TableName: TABLE_NAME,
        IndexName: 'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':gsi1': req.params.PK,
            ':sk': 'challenge',
            ':state': 'completed',
            ':lastmonth': makeDate.toISOString()
        }
        }

    try {
        let allChallenges = []
        const yourChallenges = await documentClient.query(yourChallengeParams).promise()
        const theirChallenges = await documentClient.query(theirChallengeParams).promise()
        if ((yourChallenges.Items.length + theirChallenges.Items.length) == 0) {
            res.status(200).json({
                message: "You have no challenges",
                success: true,
                });
        } else {

        for (i = 0; i < yourChallenges.Items.length; i++) {
            allChallenges.push(yourChallenges.Items[i])
        }
        for (i = 0; i < theirChallenges.Items.length; i++) {
            allChallenges.push(yourChallenges.Items[i])
        }
        res.status(200).json({
            message: "Successful challenge query",
            success: true,
            allChallenges
            // yourChallenges,
            // theirChallenges
            });}
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Challenge query failed",
            success: false
        })
    }
})

module.exports = router;