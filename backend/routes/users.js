const express = require('express');
// export router to server.js
const router = express.Router();
// import user model
const User = require('../models/user');


// respond to the client when he calls this route
// http://localhost:3000/api/v1/users
router.get(`/`, async (req, res) => {
    // send user documents with a get method
    // find function calls back results from User model in the form of an array
    // await keyword waits for the database to send a response before sending userList
    const userList = await User.find();

    // if productList is empty, respond with status 500 and make json success: false
    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);

    // good practice to close connection once task is done
    mongoose.connection.close();
})

// post user input data
router.post(`/`, (req, res) => {
    // retrieve form data for new users
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        fName: req.body.fName,
        lName: req.body.lName,
        accountType: req.body.accountType,
        isActive: req.body.isActive,
        isRegistered: req.body.isRegistered,
        dob: req.body.dob,
    });
    // saves user to the database
    user.save().then((createdUser => {
        // 201 indicates successful creation of document
        res.status(201).json(createdUser)
        // catch error 500, return error object
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;
