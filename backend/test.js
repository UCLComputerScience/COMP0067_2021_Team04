// getting all the code from AWS
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('./config/config.js');
// mongoose equivalent (optional)
const dynamoose = require('dynamoose');

const getUsers = function (req, res) {

    // telling us the configuration. When your app is hosted, you add your secret keys
    // dynamoose.aws.sdk.config.update(
    //     config.aws_remote_config
    // );

    AWS.config.update({region: 'us-east-2'});
    // AWS.config.update(config.aws_remote_config);

    // getting an object from AWS 
    // create the document client interface for DynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient();

    // creating an object - connected to our managment console - looking for tablename to connect to
    const params = {
        TableName: 'TT_Users'
    }

    documentClient.scan(params, function (err, data) {
                if(err) console.log(err);
               console.log('[response]', data)
             })
    }

const addUser = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const documentClient = new AWS.DynamoDB.DocumentClient();
    // Item.id = uuidv1();
    // var params = {
    //     TableName: config.aws_table_name,
    //     Item: Item

    // };
    const params = {
        TableName: 'TT_Users',
        Item: {
            userID: `USER#${uuid.v4()}`,
            username: 'testuser',
            accountType: 'teacher',
            dateOfBith: '01/01/91',
            firstName: 'Shaun',
            lastName: 'Bentum',
            password: 'test123'
        }
    }

    // call dynamodb to add the item to the table put = insert item
    documentClient.put(params, (err, data) => {
    if(err) console.log(err);
    console.log('[response]', data)
})
}


getUsers();
// addUser();

