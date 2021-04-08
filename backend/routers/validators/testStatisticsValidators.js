const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-test-statistics';

exports.postTestStatisticsValidators = [
    
        // express-validator
        check('timestable').isNumeric(),
        // custom validator accepts an asynchoronous callback function 
        // passes it into an arrow function
        check('userID').custom(async value => {
            const params = {
                TableName: TABLE_NAME
            }
            let users = await documentClient.scan(params).promise()
            let existingUser = users.Items.find(testStatistic => testStatistic.userID === value)
            if(!existingUser) {
                return Promise.reject("That user does not exist...")
            }
        })
    
]
