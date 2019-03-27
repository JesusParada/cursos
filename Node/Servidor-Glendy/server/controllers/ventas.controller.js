const Venta = require ('../models/venta');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const paypal = require ('../paypal');
const UsuarioController = require('../controllers/usuario.controller');

const  ventaController = {};

ventaController.getVentas = async (req, res) => {
    const ventas = await Venta.find({"aceptado": "true"}).populate("usuario productos.producto").exec();
    res.json(ventas);
}

ventaController.getVenta = async (req,res) =>{
    const venta = await Venta.findById(req.params.id).populate("usuario").exec();
    res.json(venta);
}

ventaController.createVenta = async (json_venta) => {
    const venta = new Venta(json_venta);
    await venta.save();
}

ventaController.enviarVenta = async (req,res) => {
    const venta = await Venta.findById(req.params.id);
    venta.entregado = true;
    await Venta.findByIdAndUpdate(venta._id, {$set: venta}, {new: true});
    res.json({message: "Venta enviada"});
}

ventaController.editVenta = async (req,res) =>{
    const {id} = req.params;
    const venta = {
        usuario: req.body.usuario,
        codigo_pago: req.body.codigo_pago,
        fecha_hora: req.body.fecha_hora,
        costo_envio: req.body.costo_envio,
        tipo_envio : req.body.tipo_envio,
        paqueteria: req.body.paqueteria,
        direccion_envio : req.body.direccion_envio,
        entregado : req.body.entregado,
        productos: req.body.productos,
        razon_social: req.body.razon_social,
        rfc: req.body.rfc,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion_fiscal: req.body.direccion_fiscal
    };
    await Venta.findByIdAndUpdate(id, {$set: venta}, {new: true});
    res.json({message: "Venta Actualizada"});
}

ventaController.deleteVenta = async (req,res) => {
    await Venta.findByIdAndRemove(req.params.id);
    res.json({message: "Venta Eliminada"});
}

ventaController.create = async (req,res) =>{
    try{
    var subtotal = 0 ;
    var total = 0;
    var items = [];
    for(let producto of req.body.productos){
        var item = {};
        item.name = producto.producto.nombre_producto;
        item.description = producto.producto.descripcion;
        item.quantity = producto.cantidad;
        item.price = producto.producto.precio_venta;
        item.currency = "MXN";
        items.push(item);
        subtotal += item.price * item.quantity;
    }
    total = subtotal + req.body.costo_envio;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal" 
        },
        "redirect_urls": {
            "return_url": "http://127.0.0.1:3000/api/ventas/execute",
            "cancel_url": req.headers.referer
        },
        "transactions": [{
            "amount": {
                "total": total,
                "currency": "MXN",
                "details": {
                  "subtotal": subtotal,
                  "shipping": req.body.costo_envio,
                }
              },
            "description": "ESTA ES UNA PRUEBA",
            "item_list":{
                "items": items,
                "shipping_address": {
                    "recipient_name": req.body.nombre_receptor,
                    "line1": req.body.direccion_envio.calle,
                    "line2": req.body.direccion_envio.numero,
                    "city": req.body.direccion_envio.ciudad,
                    "country_code": req.body.direccion_envio.codigo_pais,
                    "postal_code": req.body.direccion_envio.codigo_postal,
                    "phone": req.body.direccion_envio.telefono,
                    "state": req.body.direccion_envio.estado
                  }
            }
        }]
        
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.error(error);
            return res.status(400).send({message:error});
        } else {
            let temp_productos = []
            for(let producto of req.body.productos){
                temp_productos.push({
                    producto : producto.producto._id,
                    precio_venta : producto.producto.precio_venta ,
                    precio_costo: producto.producto.precio_costo,
                    cantidad: producto.cantidad
                })
            }
            const venta = {
                usuario : req.user,
                codigo_pago: payment.id,
                url_redirect : req.headers.referer,
                costo_envio : req.body.costo_envio,
                tipo_envio: req.body.tipo_envio,
                paqueteria: req.body.paqueteria,
                entregado : false,
                aceptado: false,
                productos : temp_productos,
                nombre_receptor: req.body.nombre_receptor,
                direccion_envio : req.body.direccion_envio,
                razon_social: req.body.razon_social,
                rfc: req.body.rfc,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion_fiscal: req.body.direccion_fiscal
            };
            ventaController.createVenta(venta);

            for (var index = 0; index < payment.links.length; index++) {
                if (payment.links[index].rel === 'approval_url') {
                    return res.send({url: payment.links[index].href});
                }
            }
        }
    });
    }catch(err){
        return res.status(404).send({message: "Error en la solicitud"});
    }
}

ventaController.execute = async (req,res) =>{
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId, payerId,async function (error, payment){
        if(error){
            console.error(JSON.stringify(error));
        } else {
            if (payment.state == 'approved'){
                await Venta.findOne({'codigo_pago': paymentId},async function (err, venta){
                    if(err || !venta) return res.status(500).send({message: `Error al crear la venta: ${err}`});
                    venta.aceptado = true;
                    await Venta.findByIdAndUpdate(venta._id, {$set: venta}, {new: true}, async (err, venta) => {
                        for( let p of venta.productos){
                            await UsuarioController.eliminarDelCarritoLocal(venta.usuario,p.producto._id, function(){});
                            await Producto.findById(p.producto._id,async function (err, prod){
                                prod.existencia = prod.existencia - p.cantidad;
                                await Producto.findByIdAndUpdate(prod._id, {$set: prod}, {new:true});

                            });
                        }
                    });
                    return res.redirect(venta.url_redirect+"?cR=true");

                });
            } else {
                res.status(400).json({status: "no completado"});
            }
        }
    });
}


module.exports = ventaController;

