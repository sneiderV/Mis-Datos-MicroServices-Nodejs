const yup = require('yup');

/**
 * Validate info to login
 * @param {*} data email and password
 */
function myPointsValidation (data) {
    const schema = yup.object().shape({
        email: yup.string().required()
    });

    schema.validateSync(data);
}

module.exports = {
    myPointsValidation,
}