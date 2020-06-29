const md5 = require('md5');
const utils = {};

/**
 * Generate user id using md5
 * @param {*} email email of user
 */
utils.generateUserId = (email)=>{
    return md5(email);
}

module.exports = utils;