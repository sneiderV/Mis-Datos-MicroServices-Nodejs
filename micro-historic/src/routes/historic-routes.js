const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');

//init
router.get('/', (req, res) => {
    res.send('Transaction ready!');
});

/**
 * Service to create transaction
 */
router.get('/transactionHistory', async (req, res) => {
    try {
        validations.transactionHistoryValidation(req.body);

        var { email } = req.body;
        var userId = utils.generateUserId(email);
      
        poolDB.query('SELECT * FROM transaction WHERE user_id = ? ORDER BY created_date DESC', [userId])
            .then((rows) => {
                res.send({rows});
            })
            .catch((error) => {
                res.send({
                    'status': 'error',
                    'msm': 'Error al obtener el historico del usario '+email+' :'+ error
                });
            });

    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;