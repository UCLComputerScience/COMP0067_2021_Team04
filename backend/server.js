const express = require('express')
const app = express()
 
// receives HTTP request -> specifc function
// base directory, e.g. Google.com ~ anything after the base directory gets sent to the app.get
// app.post looks for post requests 
// post creates an object in the database, and get collects the http request
app.get('/HelloWorld', require('./requests/helloWorld'))
 
app.listen(3000, () => console.log("Listening on port 3000"))