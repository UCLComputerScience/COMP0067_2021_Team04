// secure APIs in our server
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt( {
            secret,
            //token generated based on a specific algorithm
            algorithms: ['HS256'],
            //method to revoke privileges under specific roles
            isRevoked: isRevoked
        }).unless({
            path: [
                `${api}/users/login`,
                `${api}/users/register/teacher`,
                `${api}/users/register/student`,
                `${api}/users/register/parent`,

            ]
        })
}

async function isRevoked(req, payload, done) {
    console.log()
    // payload is data from the token
    if(payload.role != 'teacher') {
        // if role is not teacher, return done is null and true => reject the token
        done(null, true)
    }
    // else...
    done()
}

module.exports = authJwt