'use strict'

const services = require('../services/index');
const Usuario = require ('../models/usuario');

function isAuth (req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'});
    }
    const token = req.headers.authorization.split(" ")[1];
    services.decodeToken(token)
        .then(response =>{
            req.user = response;
            next();
        })
        .catch(response =>{
            return res.status(response.status).send({message:response.message});
        })
}

let isAdmin = async (req, res, next) => {
    if(req.user === undefined || req.user === null){
        return res.status(403).send({message: "No tienes autorización"});
    }
    let usuario = await Usuario.findById(req.user);
    if(usuario.tipo != "Admin"){
        return res.status(403).send({message: "No tienes autorización"});
    }
    next();
}

module.exports = {
    isAuth: isAuth,
    isAdmin: isAdmin
}