var request = require('request');
var EstadosController = require('../controllers/estados.controller');
var username = "glendy.ventas@gmail.com";
var password = "educaplatas";
var url = "https://api.envia.com/ship/rate";
var paqueteria = "estafeta";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

var direccion_glendy = {
    name: "Micaela León",
    company: "Educaplatas",
    email: "glendy.ventas@gmail.com",
    phone: "9514134800",
    street: "Andador Santiago",
    number: "16",
    district: "Santa Cruz Amilpas",
    city: "Oaxaca",
    state: "OA",
    country: "MX",
    postalCode: "71226"
 }

 direccion = (nombre , direccion) =>{
     estado = direccion.estado;
    return {
       name: nombre,
       phone: direccion.telefono.toString(),
       street: direccion.calle,
       number: direccion.numero.toString(),
       district: direccion.municipio,
       city: direccion.municipio,
       state: EstadosController[estado],
       country: direccion.codigo_pais,
       postalCode: direccion.codigo_postal.toString()
    }
}

 paquete = (productos) => {
     let largo = 0;
     let ancho = 0;
     let alto = 0;
     let peso = 0;
     let volumen = 0;
     for(let p of productos){
         let producto = p.producto;
         peso += producto.peso;
         if(producto.largo > largo){
             largo = producto.largo;
         }
         if(producto.ancho > ancho){
            ancho = producto.ancho;
        }
        volumen += producto.largo * producto.ancho * producto.alto;
     }

     alto = volumen / (largo * ancho);

    return {
        content: "Paquete didáctico",
        amount: 1,
        type: "box",
        dimensions: {
            length : largo,
            width: ancho,
            height: alto
        },
        weight: peso,
        insurance: 0,
        declaredValue: 0
     }
 }

cotizadorController = {}

cotizadorController.cotizar = (req , res) =>{
    var datos = {
        origin: direccion_glendy,
        destination: direccion(req.body.nombre_receptor, req.body.direccion_envio),
        package: paquete(req.body.productos),
        shipment: {
           carrier: req.body.paqueteria
        }
    };
    var data = JSON.stringify(datos);
    request(
        {   
            method: "post",
            url : url,
            headers : {
                "Authorization" : auth,
                "Content-Type": "application/json"
            },
            body: data
        },
        function (error, response, body) {
            if(error) return res.status(500).send(error);
            return res.status(200).send(body);
        }
    );
}

module.exports = cotizadorController;