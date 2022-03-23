const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../../config/MySQL');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const config = require('../../config/default.json');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const validatePermissionUserAdmin = require('../../middleware/validatePermissionUserAdmin');
const validatePermissionUserEditor = require('../../middleware/validatePermissionUserEditor');
// const createLogsUsers = require('./../createLogsUsers');
const router = express.Router();



//@router           POST api/users
//@description      Register user
//@access           Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please enter a password with 6  or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, name, password } = req.body;
        try {
            //Check if user is exist
            await connection.query(`SELECT * FROM inventory.users WHERE email = '${email.toLowerCase()}';`,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: 'Error when get user by email from DB' });
                    if (result.length > 0 && result[0].email === email.toLowerCase()) {
                        console.log('User exist');
                        return res.status(400).json({ errors: 'User exist' });
                    } else {
                        //Encrypt password
                        const salt = await bcrypt.genSalt(10);
                        const encryptedPassword = await bcrypt.hash(password, salt);
                        const user = {
                            userId: uuidv4(),
                            name,
                            email,
                        }
                        //Save user in DB
                        await connection.query(
                            `INSERT INTO inventory.users (userId, email, name, password, permission, createdAt) VALUES('${user.userId}', '${email.toLowerCase()}', '${name}', '${encryptedPassword}', '', NOW());`,
                            (err, result, fields) => {
                                if (err) return res.status(400).json({ errors: 'Error when create user' });
                                else {
                                    console.log('User created');
                                    //Return jsonwebToken
                                    const payLoad = { user: { id: user.id } };
                                    jwt.sign(
                                        payLoad,
                                        config["jwtSecret"],
                                        { expiresIn: 360000 },
                                        (err, token) => {
                                            if (err) throw err;
                                            res.json({ token });
                                        }
                                    );
                                }
                            });
                    }
                });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })


//@router           POST api/users
//@description      login user
//@access           Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please enter a password with 6  or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //Check if user is exist
            await connection.query(`SELECT * FROM inventory.users WHERE email = '${email.toLowerCase()}';`,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: err });
                    else if (result.length > 0) {
                        if (result[0].permission === '') {
                            return res.status(400).json({ errors: 'the administrator has not yet authorized this user, please contact your organization manager' });
                        }
                        console.log("result", result);
                        const user = {
                            userId: result[0].userId,
                            email: result[0].email,
                            name: result[0].name,
                            permission: result[0].permission,
                            token: "",
                        };
                        //Encrypt password
                        const salt = await bcrypt.genSalt(10);
                        const encryptedPassword = await bcrypt.hash(password, salt);
                        if (result[0].email === email.toLowerCase() && bcrypt.compareSync(password, result[0].password)) {
                            console.log('User Login successfully');
                            //Return jsonwebToken
                            const payLoad = { user: { id: result[0].userId } };
                            jwt.sign(
                                payLoad,
                                config["jwtSecret"],
                                { expiresIn: 360000 },
                                (err, token) => {
                                    if (err) return res.status(400).json({ errors: err });
                                    else {
                                        user.token = token;
                                        return res.json({ user })
                                    };
                                }
                            );
                        } else {
                            // console.log('User authentication failed');
                            return res.status(400).json({ errors: "User authentication failed" });
                        }
                    } else {
                        return res.status(400).json({ errors: 'The user is not exist' });
                    }
                });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })


//@router           DELETE api/users
//@description      Delete user
//@access           Private
router.delete(
    '/',
    validatePermissionUserAdmin,
    [
        check('userId', 'Please include a valid userId').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId } = req.body;
        try {
            //Check if user is exist
            await connection.query(`DELETE FROM inventory.users WHERE userId = '${userId}'`, async (err, result, fields) => {
                if (err) return res.status(400).json({ err });
                else if (result.affectedRows > 0) {
                    res.json({ msg: "User deleted" });
                    // await createLogsUsers(req, res, userId, "User deleted in DB", { msg: "User deleted" });
                } else {
                    console.log(result)
                    return res.status(400).json({ errors: "User does not exist" });
                }
            });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })




//@router           PUT api/users
//@description      Update user
//@access           Public
router.put(
    '/',
    [
        check('userId', 'userId is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please enter a password with 6  or more characters').isLength({ min: 6 })
    ],
    validatePermissionUserAdmin,
    async (req, res) => {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, email, name, password, permission } = req.body;
        try {
            //Check if user is exist
            await connection.query(`SELECT * FROM inventory.users WHERE userId = '${userId}' AND email = '${email.toLowerCase()}'; `,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: 'Error when get user by email from DB' });
                    if (result.length > 0 && result[0].email === email.toLowerCase()) {
                        //Encrypt password
                        const salt = await bcrypt.genSalt(10);
                        const encryptedPassword = await bcrypt.hash(password, salt);
                        const query = `
                        UPDATE inventory.users SET 
                            name = '${name}',
                            permission = '${permission}',
                            password = '${encryptedPassword}' 
                        WHERE
                            (userId = '${userId}') and(email = '${email.toLowerCase()}'); `;
                        //Update user in DB
                        await connection.query(query, (err, result, fields) => {
                            if (err) return res.status(400).json({ errors: 'Error when Update user' });
                            else {
                                return res.send({ msg: 'User updated in DB' });
                            }
                        });
                    } else {
                        return res.status(400).json({ errors: 'User is not exist' });
                    }
                });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })


//@router           UPDATE api/users
//@description      Confirm user by admin with some permission
//@access           Private
router.put(
    '/updateUserPermission',
    validatePermissionUserAdmin,
    [
        check('userId', 'userId is required').not().isEmpty(),
        check('permission', 'permission is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, permission } = req.body;
        try {
            if (permission === 'Admin' || permission === 'Editor' || permission === 'Viewer') {
                await connection.query(`UPDATE inventory.users SET permission = '${permission}' WHERE(userId = '${userId}'); `,
                    async (err, result, fields) => {
                        if (err) return res.status(400).json({ errors: err });
                        else if (result.affectedRows > 0) {
                            return res.send({ msg: `User permission updated in DB` });
                            // res.json({ msg: "User updated" });
                            // await createLogsUsers(req, res, userId, "User permission updated in DB", { msg: "User updated" });
                        } else {
                            console.log(result)
                            return res.status(400).json({ errors: "result.changedRows < 0" });
                        }
                    });
            } else {
                res.status(400).json({ errors: "permission is not valid" });
            }
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })

//@router           GET api/users
//@description      get all users awaiting administrator approval
//@access           Private
router.get(
    '/getUnapprovedUsers',
    validatePermissionUserAdmin,
    async (req, res) => {
        try {
            await connection.query(`SELECT userId, email, name, createdAt FROM inventory.users WHERE permission = ''; `,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: err });
                    else res.send(result);
                });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })

//@router           GET api/users
//@description      get all users 
//@access           Private
router.get(
    '/getAllUsers',
    validatePermissionUserAdmin,
    async (req, res) => {

        try {
            await connection.query(`SELECT userId, email, name, createdAt, permission FROM inventory.users; `,
                async (err, result, fields) => {
                    if (err) return res.status(400).json({ errors: err });
                    else res.send(result);
                });
        } catch (err) {
            //console.error(err.message);
            res.status(500).send('Server error');
        }
    })


module.exports = router;