const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-users';
const getUsers = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const Users = await dynamoClient.scan(params).promise();
    return Users;
};

const getUserById = async (userID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userID,
        },
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateItem = async (item, tableName) => {
    const params = {
        TableName: tableName,
        Item: item,
    };
    return await dynamoClient.put(params).promise();
};

const deleteItem = async (ID, tableName) => {
    const params = {
        TableName: tableName,
        Key: {
            ID,
        },
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getUsers,
    getUserById,
    addOrUpdateItem,
    deleteItem,
};