const yup = require('yup');
const moment = require('moment');

/**
 * Validate info to create user
 * @param {*} data 
 */
function registerUserValidation (data) {
    const schema = yup.object().shape({
        name: yup.string().required(),
        lastname: yup.string().required(),
        birth_date: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required()
    });
    schema.validateSync(data);
    dateValidation(data.birth_date);
}

function dateValidation(date){
    var day = moment(date, 'YYYY-MM-DD', true);
    if (!day.isValid()) {
        throw new Error ('Formato de la fecha invalido. Recuerde el formato: YYYY-MM-DD');
    }   
}

module.exports = {
    registerUserValidation
}