'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');
const services = {}

services.createToken = (user) =>{
    const payload = {
        sub: user._id,
        name: user.nombre_usuario,
        tipo: user.tipo,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix()
    }
    return jwt.encode(payload,config.SECRET_TOKEN)
}

services.createTokenConfirmacion = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(2,'hour')
    }
    return jwt.encode(payload,config.SECRET_TOKEN)
}

services.decodeToken = (token) =>{
    const decoded = new Promise((resolve, reject) =>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()){
                reject({
                    status : 401,
                    message: "El token ha expirado"
                })
            }
            resolve(payload.sub)
        }catch(err){
            reject ({
                status: 403,
                message : "Token inválido"
            })
        }
    })
    return decoded;
}

services.decodeTokenConfirmacion = (token) =>{
    const decoded = new Promise((resolve, reject) =>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()){
                reject({
                    status : 401,
                    message: "El token ha expirado"
                })
            }
            resolve(payload.sub)
        }catch(err){
            reject ({
                status: 403,
                message : "Token inválido"
            })
        }
    })
    return decoded;
}

module.exports = services;