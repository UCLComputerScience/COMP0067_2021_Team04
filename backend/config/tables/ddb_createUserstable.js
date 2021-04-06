// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// Create the DynamoDB service object

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    AttributeDefinitions: [
        {
            AttributeName: 'userID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'userID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'UCL-TT-users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
    if (err) {
        console.log("Error: \n", err);
    } else {
        console.log("Table Created", data);
    }
}); 