'use strict'

const Usuario = require('../models/usuario');
const service = require('../services')
const correoController = require('./email.controller');
const usuarioController = {};

usuarioController.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find().populate("productos_carrito").exec();
    res.json(usuarios);
}

usuarioController.agregarUsuario = (req,res) => {
    Usuario.findOne({'email': req.body.email}, function (err, user){
        if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});
        if(user) return res.status(400).send({message: "El email ya ha sido registrado"});
        var nuevoUsuario = new Usuario();
        nuevoUsuario.email = req.body.email;
        nuevoUsuario.password = nuevoUsuario.generateHash(req.body.password);
        nuevoUsuario.tipo = req.body.tipo;
        nuevoUsuario.nombre_usuario = req.body.nombre_usuario;
        nuevoUsuario.productos_carrito = [];
        nuevoUsuario.save((err) => {
            if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});
            return res.status(201).send({
                message: "Te has registrado correctamente"
            });
    });
    })
}

usuarioController.register = (req, res) =>{
    Usuario.findOne({'email': req.body.email, "confirmado": true}, function (err, user){
        if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});
        if(user) return res.status(400).send({message: "El email ya ha sido registrado"});
        var nuevoUsuario = new Usuario();
        nuevoUsuario.email = req.body.email;
        nuevoUsuario.password = nuevoUsuario.generateHash(req.body.password);
        nuevoUsuario.tipo = req.body.tipo;
        nuevoUsuario.nombre_usuario = req.body.nombre_usuario;
        nuevoUsuario.productos_carrito = [];
        nuevoUsuario.confirmado = false;
        nuevoUsuario.save((err) => {
            if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`});
            let token = service.createTokenConfirmacion(nuevoUsuario);
            console.log(token);
            correoController.enviar({
                destino: req.body.email,
                asunto: "Confirmación de cuenta",
                texto: "",
                html: " <b>Haz clic en el botón para confirmar su cuenta!</b>"+
                        "<p><a href='http://localhost:3000/api/usuarios/confirmacion/"+token+"'>Confirmar Registro</a></p>"       
            })
            .then( response =>{
                 return res.status(200).
                 send({message: "Se te ha enviado un correo para confirmar tu cuenta"})})
            .catch(response =>{ 
                return res.status(500).send({message: "Error al crear el usuario"})});
    });
    })
}

usuarioController.login = (req, res) =>{
    Usuario.findOne({email: req.body.email,confirmado:true}, (err, usuario) =>{
        if(err) return res.status(500).send({message: err});
        if(!usuario) return res.status(404).send({message: "No existe el usuario"});
        if(!usuario.validarPassword(req.body.password)) return res.status(404).send({message: "Contraseña incorrecta"});
        req.user = usuario;
        res.status(200).send({
            message: "Te has logueado correctamente", 
            token: service.createToken(usuario)
        });
    })
}

usuarioController.confirmarUsuario = async (req,res) => {
    if(!req.params.token){
        return res.status(403).send({message: 'No es un token válido'});
    }
    const token = req.params.token;
    service.decodeToken(token)
        .then(response =>{
            Usuario.findById(response, (err, usuario) =>{
                if(err || !usuario)return res.status(403).send({message: "Token inválido"});
                usuario.confirmado = true;
                Usuario.findByIdAndUpdate(usuario._id, {$set: usuario}, {new: true}, (err, usuario) =>{
                    if(err) return res.status(403).send({message: "Token inválido"});
                    return res.status(200).send({message: "Tu cuenta ha sido registrada correctamente"})
                });
            });
        })
        .catch(response =>{
            return res.status(response.status).send({message:response.message});
        })
}

//Agrega productos al carrito del usuario que hizo la peticion
usuarioController.agregarAlCarrito = async (req, res) => {
    const usuario = await Usuario.findById(req.user);
    const productos = [];
    for( let producto of usuario.productos_carrito){
        if(producto != req.body.id_producto)
            productos.push(producto);
    } 
    productos.push(req.body.id_producto);
    usuario.productos_carrito = productos;
    await Usuario.findByIdAndUpdate(usuario._id, {$set: usuario}, {new: true});
    res.json({message: "Agregado al carrito"});
}

usuarioController.eliminarDelCarrito = async (req, res) => {
    await usuarioController.eliminarDelCarritoLocal(req.user, req.params.id);
    res.json({message: "Eliminado del carrito"});
}

usuarioController.eliminarDelCarritoLocal = async (user, id_producto) => {
    const usuario = await Usuario.findById(user);
    const productos = [];
    for( let producto of usuario.productos_carrito){
        if(producto.toString() !== id_producto.toString())
            productos.push(producto);
    }
    usuario.productos_carrito = productos;
    await Usuario.findByIdAndUpdate(usuario._id, {$set: usuario}, {new: true}, async(err, usuario) => {
        if(err) console.log(err);
    });
    
}

//Obtiene los productos del carrito del usuario que hizo la peticion
usuarioController.getProductosCarrito = async (req,res) =>{
    const usuario = await Usuario.findById(req.user).populate("productos_carrito").exec();
    res.json(usuario.productos_carrito);
}

usuarioController.deleteUsuario = async (req,res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({message: "Usuario Eliminado"});
}

module.exports = usuarioController;