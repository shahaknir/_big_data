const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');


// const { model } = require('mongoose');


module.exports = function (req, res, next) {
    //Get the token from the header
    const token = req.header('x-auth-token');
    //Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied -> ' });
    }

    //Verify token 
    try {
        const decoded = jwt.verify(token, config['jwtSecret']);
        req.user = decoded.user;
        next();
    } catch (err) {
        // console.error(err.massege);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};


