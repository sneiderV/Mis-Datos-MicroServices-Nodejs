const yup = require('yup');

/**
 * Validate info to login
 * @param {*} data email and password
 */
function createTransactionValidation (data) {
    const schema = yup.object().shape({
        email: yup.string().required(),
        value: yup.number().positive().required(),
        points: yup.number().positive().required()
    });

    schema.validateSync(data);
}

module.exports = {
    createTransactionValidation,
}