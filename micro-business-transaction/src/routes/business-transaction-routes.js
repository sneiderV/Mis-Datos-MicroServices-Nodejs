const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');

//init
router.get('/', (req, res) => {
    res.send('Business Transaction ready!');
});

/**
 * Service to inactivate transaction
 */
router.put('/inactivate', async (req, res) => {
    try {
        validations.inactivateTransactionValidation(req.body);

        var { transaction_id } = req.body;
      
        var updateTransaction = {
            status: 0
        };

        poolDB.query('UPDATE transaction set ? WHERE transaction_id = ?', [updateTransaction, transaction_id])
            .then((resUpdate) => {
                if (resUpdate.affectedRows > 0) {
                    res.send({
                        'status': 'ok',
                        'msm': 'Transacción con identificador #'+transaction_id+ ' fue inactivada.'
                    });
                } else {
                    res.send({
                        'status': 'warnig',
                        'msm': 'Transacción con identificador #'+transaction_id+ ' no existe.'
                    });
                }
            })
            .catch((error) => {
                res.send({
                    'status': 'error',
                    'msm': 'Error al actualizar la transacción: ' + error
                });
            });

    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;