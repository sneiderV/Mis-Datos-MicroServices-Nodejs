const bcrypt = require('bcryptjs');
const md5 = require('md5');
const utils = {};

//encrypt password
utils.encryptPassword = async (password) =>{
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);
    return hash;
}

//encrypt password
utils.decryptPassword = async (password, savedPassword) =>{
    try {
        bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.eror(error);
    }
}

//generate user id
utils.generateUserId = (email)=>{
    return md5(email);
}

module.exports = utils;