// middleware that passes authentication into AWS
const CognitoExpress = require('cognito-express');

// create new cognitoexpress object and pass in options
const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_DEFAULT_REGION,
    // pass in user pool id
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    // 1 hour
    tokenExpiration: 3600
})

// export a function called validateAuth 
// everytime you call a piece of express middlewear, you have to call next so it moves on to 
// the next piece of middlewear or into the main part of the request handler
exports.validateAuth = (req, res, next) => {
    // authentication tokens are passed in the authorization header with a type of bearer 
    // and a token to follow as the value => we need to check if that exists
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1]
        cognitoExpress.validate(token, (err) => {
            if(err) {
                res.status(401).send();
            } else {
                // pass onto the next portion and indicating that express authorization passed
                next();
            }
        })
    } else {
        // response 401 maps to unauthorized response
        res.status(401).send();
    }
}