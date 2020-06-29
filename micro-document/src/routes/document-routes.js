const express = require('express');
const router = express.Router();
const poolDB = require('../database');
const utils = require('../lib/utils');
const validations = require('../lib/validations');
const xl = require('excel4node');
const json2xls = require('json2xls');

//init
router.get('/', (req, res) => {
    res.send('Points ready!');
});

/**
 * Service to get sum of all points that have user
 */
router.get('/exportTransactionToExcel', async (req, res) => {
    try {
        validations.exportTransactionToExcelValidation(req.body);

        var { email } = req.body;
        var userId = utils.generateUserId(email);
            
        poolDB.query('SELECT * FROM transaction WHERE user_id = ? ORDER BY created_date DESC', [userId])
            .then((rows) => {

                //crear excel
                var wb = new xl.Workbook();
                var ws = wb.addWorksheet('Transacciones');
                //escribir cabeceras
                ws.cell(1, 1).string('num transacción');
                ws.cell(1, 2).string('fecha de cración');
                ws.cell(1, 3).string('valor');
                ws.cell(1, 4).string('puntos');
                ws.cell(1, 5).string('estado');
                //escribir data
                var indexRow = 2;
                rows.forEach(row => {
                    ws.cell(indexRow, 1).number(row.transaction_id);
                    ws.cell(indexRow, 2).date(row.created_date);
                    ws.cell(indexRow, 3).number(row.value);
                    ws.cell(indexRow, 4).number(row.points);
                    ws.cell(indexRow, 5).number(row.status);
                    indexRow++;
                });
                wb.write('Transacciones.xlsx', (err, stats) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(stats); // Prints out an instance of a node.js fs.Stats object
                    }
                });

                //enviar archivo xlsx para descargar
                res.xls('transacciones.xlsx', rows);  
            })
            .catch((error) => {
                res.send({
                    'status': 'error',
                    'msm': 'Error al obtener el historico del usario ' + email + ' :' + error
                });
            });

    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;