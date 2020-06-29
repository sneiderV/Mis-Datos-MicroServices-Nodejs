const bcrypt = require('bcryptjs');
const md5 = require('md5');
const utils = {};

/**
 * Decrypt password 
 * @param {*} password password given by the user 
 * @param {*} savedPassword password saved in bd
 */
utils.decryptPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.eror(error);
    }
}

/**
 * Generate user id using md5
 * @param {*} email email of user
 */
utils.generateUserId = (email)=>{
    return md5(email);
}

module.exports = utils;