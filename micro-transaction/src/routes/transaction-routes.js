const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');
const moment = require('moment');

//init
router.get('/', (req, res) => {
    res.send('Transaction ready!');
});

/**
 * Service to create transaction
 */
router.post('/create', async (req, res) => {
    try {
        validations.createTransactionValidation(req.body);

        var { email, value, points } = req.body;
        var userId = utils.generateUserId(email);
      
        var newTransaction = {
            created_date: moment().format(),
            value,
            points,
            status: 1,
            user_id: userId
        };

        poolDB.query('INSERT INTO transaction set ?', [newTransaction])
            .then((resInsert) => {
                res.send({
                    'status': 'ok',
                    'numTransaction': resInsert.insertId,
                    'msm': 'Transacción creada con identificador #'+resInsert.insertId+ ' el cual puede ser usado para INACTIVAR la transacción'
                });
            })
            .catch((error) => {
                res.send({
                    'status': 'error',
                    'msm': 'Error al crear la transacción del usario: ' + error
                });
            });

    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;