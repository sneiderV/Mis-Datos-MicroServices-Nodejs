const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');
const moment = require('moment');
const jwt = require('jwt-simple');
const {jwtconfig} = require('../config-app');


//init
router.get('/', (req, res) =>{
    res.send('Auth ready!');
});

/**
 * Service to login a user 
 */
router.post('/login', async (req, res)=>{
    try {
        validations.loginUserValidation(req.body);
        var {email, password} = req.body;
        var userId = utils.generateUserId(email);
        poolDB.query('SELECT * FROM user WHERE user_id = ?',userId).then( async (rows) =>{
            if (rows.length > 0) {
                const user = rows[0];
                const validPassword = await utils.decryptPassword(password, user.password );
                if (validPassword) {
                    res.json({
                        'status': 'ok',
                        'token': createToken(user.user_id)
                    });
                } else {
                    res.json({
                        'status':'error',
                        'msm':'Contraseña incorrecta'
                    });  
                }
            } else {
                res.json({
                    'status':'error',
                    'msm':'El usuario no existe'
                });
            }
        })
    } catch (error) {
        res.send(error.message);
    }
});

const createToken = (userId) => {
    const payload = {
        user_id: userId,
        createdAt: moment().unix(),
        expiredAt: moment().add(5,'minutes').unix()
    }

    return jwt.encode(payload, jwtconfig.secretWord);
}

module.exports = router;