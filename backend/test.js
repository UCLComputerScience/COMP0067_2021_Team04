
// getting all the code from AWS
const AWS = require('aws-sdk');
const uuid = require('uuid');

// telling us the configuration. When your app is hosted, you add your secret keys
AWS.config.update({
    region: 'us-east-2'
});

// getting an object from AWS 
const documentClient = new AWS.DynamoDB.DocumentClient();


// creating an object - connected to our managment console - looking for tablename to connect to
const params = {
    TableName: 'user_table',
    Item: {
        user_id: `USER#${uuid.v4()}`,
        SK: `DEFINITION`,
        username: 'Andrew'
    }
}

// put = insert item
documentClient.put(params, (err, data) => {
    if(err) console.log(err);
    console.log('[response]', data)
})