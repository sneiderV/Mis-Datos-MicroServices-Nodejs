const jwt = require('jwt-simple');
const moment = require('moment');
const {jwtconfig} =require('../config-app');

/**
 * Validate user token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkToken = (req, res, next) => {
    if (!req.headers['user-token']) {
        return res.json({
            status: 'error',
            msm: 'Se requiere un token.'
        })
    }

    const userToken = req.headers['user-token'];
    let payload={};
    
    try {
        payload = jwt.decode(userToken,jwtconfig.secretWord);
    } catch (error) {
        res.json({
            status: 'error',
            msm: 'El token es incorrecto'
        });
    }
    
    if (payload.expiredAt < moment().unix()) {
        console.log('expiredAd: '+payload.expiredAd+'  '
        +'moment '+moment().unix());
        
        res.json({
            status: 'error',
            msm: 'El token ha expirado'
        });
    }

    next();
}

module.exports = {
    checkToken
}