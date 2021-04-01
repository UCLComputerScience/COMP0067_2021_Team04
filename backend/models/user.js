const dynamoose = require("dynamoose");
const { stringify } = require("uuid");

// This is not neccessary for a university project
// Create a new schema, a blueprint/structure for our DynamoDB database. 
// Lays out the foundation and data validation for every user document added to our database
const userSchema = new dynamoose.Schema({
    "userID": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "accountType": {
        type: String,
        required: true
    },
    "dateOfBirth": {
        type: String,
        required: true
    },
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "selectedClassID": Number,
    "childID": [{
        type: dynamoose.THIS ,
        required: true
    }],
    "schoolID": String,
    // "childID": {
    //     "type": Set,
    //     "schema": [Class]
    // },
    "createdAt": "createDate"
});



// To use our schema definition, we need to convert our userSchema into a Model we can work with. 
// To do so, we pass it into dynamoose.model(singular name of collection, schema) in order to create a Model
// define User model using User Schema
exports.User = dynamoose.model('User', userSchema);
