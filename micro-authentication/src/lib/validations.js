const yup = require('yup');

/**
 * Validate info to login
 * @param {*} data email and password
 */
function loginUserValidation (data) {
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required()
    });

    schema.validateSync(data);
}

module.exports = {
    loginUserValidation,
}