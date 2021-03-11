const mongoose = require('mongoose');


// Create a new schema, a blueprint/structure for our MongoDB database. 
// Lays out the foundation for every user document added to our database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please check your data entry, no username specified!"]
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    fName: String,
    lName: String,
    accountType: {
        student: Boolean,
        teacher: Boolean,
        parent: Boolean
    },
    isActive: String,
    isRegistered: String,
    dob: Date,
    classes: List

})


// To use our schema definition, we need to convert our userSchema into a Model we can work with. 
// To do so, we pass it into mongoose.model(singular name of collection, schema) in order to create a Model
exports.User = mongoose.model('User', userSchema);