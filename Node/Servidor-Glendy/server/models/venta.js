const mongoose = require('mongoose');
const {Schema} = mongoose;

const VentaSchema = new Schema({
    usuario : {type: Schema.ObjectId, ref : "Usuario"},
    codigo_pago: { type: String , required: true},
    url_redirect : {type: String , required: true},
    aceptado : {type: Boolean, required:true},
    fecha: { type: Date , default: Date.now},
    costo_envio: Number,
    paqueteria: String,
    tipo_envio: String,
    nombre_receptor: String,
    direccion_envio : {
        calle: String,
        numero: String,
        numero_interior: String,
        colonia: String,
        ciudad: String,
        codigo_pais: String,
        codigo_postal: String,
        telefono: Number,
        municipio:String,
        estado: String
    },
    razon_social: String,
    rfc: String,
    email: String,
    telefono: Number,
    direccion_fiscal: {
        calle: String,
        numero: String,
        numero_interior: String,
        colonia: String,
        ciudad: String,
        codigo_pais: String,
        codigo_postal: String,
        municipio:String,
        estado: String
    },
    entregado : {type: Boolean, required:true},
    productos: [{
        producto: {type: Schema.ObjectId, ref : "Producto"},
        precio_venta: Number,
        precio_costo: Number,
        cantidad: Number
    }]
    
});

module.exports = mongoose.model('Venta', VentaSchema);

