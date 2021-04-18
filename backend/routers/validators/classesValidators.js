const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

exports.postClassesValidators = [
    check('data').exists(),
    check('GSI1').exists()
    
]
exports.postMembersValidators = [
    check('role').exists(),
    check('GSI1').exists(),
]
