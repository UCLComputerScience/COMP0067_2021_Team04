const dynamoose = require('dynamoose');

// This is not neccessary for a university project
// Create a new schema, a blueprint/structure for our DynamoDB database. 
// Lays out the foundation and data validation for every user document added to our database
const userSchema = new dynamoose.Schema({
    "userID": String,
    "username": String,
    "accountType": String,
    "dateOfBith": String,
    "firstName": String,
    "lastName": String,
    "password": String,
    "selectedClassID": Number,
    "childID": Array
    // "childID": {
    //     "type": Set,
    //     "schema": [Class]
    // },
});



// To use our schema definition, we need to convert our userSchema into a Model we can work with. 
// To do so, we pass it into dynamoose.model(singular name of collection, schema) in order to create a Model
// define User model using User Schema
const User = dynamoose.model('User', userSchema)