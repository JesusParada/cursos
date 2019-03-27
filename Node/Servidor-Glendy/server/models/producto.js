const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre_producto: { type: String, required: true},
    tipo_producto: {type: String , required: true},
    descripcion: { type: String , required: true},
    contenido: [{type:String, required: true}],
    precio_venta: { type: Number , required: true},
    precio_costo: {type: Number, required: true},
    existencia: {type: Number, required: true},
    imagenes: [{type: String, required: true}],
    video: String,
    largo: Number,
    alto: Number,
    ancho: Number,
    peso: Number
});

module.exports = mongoose.model('Producto', ProductoSchema);

