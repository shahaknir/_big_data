const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const connection = require('../config/MySQL');



module.exports = async (req, res, next) => {
    //Get the token from the header
    const userId = req.header('userId');
    const token = req.header('x-auth-token');
    //Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied -> ' + token });
    }
    if (!userId) {
        return res.status(401).json({ msg: 'Please include a userId in the header ' });
    }


    //Verify token 
    try {
        const decoded = jwt.verify(token, config['jwtSecret']);
        req.user = decoded.user;
        await connection.query(`SELECT permission FROM inventory.users WHERE userId = '${userId}';`,
            async (err, result, fields) => {
                if (err) return res.status(400).json({ errors: err });
                else if (result[0] && result[0].permission === 'Admin') {
                    next();
                } else if (result[0] && result[0].permission === 'Editor') {
                    return res.status(500).send('!result[0] ||result[0].permission === Editor');
                } else if (result[0] && result[0].permission === 'Viewer') {
                    return res.status(500).send('!result[0] ||result[0].permission === Viewer');
                } else {
                    return res.status(500).send('!result[0] || EMPTY permission for the user');
                }
            });
    } catch (err) {
        // console.error(err.massege);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};


