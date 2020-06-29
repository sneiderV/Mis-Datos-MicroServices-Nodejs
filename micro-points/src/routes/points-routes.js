const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');

//init
router.get('/', (req, res) => {
    res.send('Points ready!');
});

/**
 * Service to get sum of all points that have user
 */
router.get('/pointsByUser', async (req, res) => {
    try {
        validations.myPointsValidation(req.body);

        var { email } = req.body;
        var userId = utils.generateUserId(email);
            
        poolDB.query('SELECT SUM(points) AS TotalUserPoints FROM transaction WHERE user_id = ? AND status = 1', [userId])
            .then((rows) => {
                if (rows[0].TotalUserPoints != null) {
                    res.json({
                        "user": email,
                        "total points": rows[0].TotalUserPoints
                    });
                } else {
                    res.json({
                        "user": email,
                        "total points": 0
                    });
                }
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