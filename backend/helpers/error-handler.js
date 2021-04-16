function errorHandler(err, req, res, next) {
    //jwt authentication error
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message: "The user is not authorised"})
    }
    if (err.name === 'ValidationError') {
        res.status(401).json({message: err})
    }
    // server error
    return res.status(500).json({message: err})
}

module.exports = errorHandler