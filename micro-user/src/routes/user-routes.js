const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');
const moment = require('moment');

//init
router.get('/', (req, res) => {
    res.send('User ready!');
});

//register user
router.post('/register', async (req, res) => {
    try {
        validations.registerUserValidation(req.body);

        var { name, lastname, birth_date, email, password } = req.body;
        var passencryp = await utils.encryptPassword(password);
        var userId = utils.generateUserId(email);

        poolDB.query('SELECT * FROM user WHERE user_id = ?', userId)
            .then((resExiste) => {
                if (resExiste.length > 0) {
                    res.json({
                        'status':'error',
                        'msm':'Lo sentimos ya existe un usario creado con el correo: ' + email
                    });
                } else {

                    var newUser = {
                        user_id: userId,
                        created_date: moment().format(),
                        name,
                        lastname,
                        birth_date: new Date(birth_date),
                        email,
                        password: passencryp
                    }
                    poolDB.query('INSERT INTO user set ?', [newUser])
                        .then((resInsert) => {
                            res.json({
                                'status': 'ok',
                                'user_id': userId
                            });
                        })
                        .catch((error) => {
                            res.send('Error al crear el usario: ' + error);
                        });
                }
            })
            .catch((err) => {
                console.error('Error al verificar existencia: ' + err);
            });


    } catch (error) {
        res.send(error.message);
    }
});

//get all users
router.get('/all', (req, res) => {
    poolDB.query('SELECT * FROM user')
        .then((listres) => {
            res.send(listres);
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;