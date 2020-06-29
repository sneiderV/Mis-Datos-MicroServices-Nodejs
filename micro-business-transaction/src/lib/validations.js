const yup = require('yup');

/**
 * Validate info to inactivate transaction
 * @param {*} data transaction_id
 */
function inactivateTransactionValidation (data) {
    const schema = yup.object().shape({
        transaction_id: yup.number().positive().required()
    });

    schema.validateSync(data);
}

module.exports = {
    inactivateTransactionValidation,
}