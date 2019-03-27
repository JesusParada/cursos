const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImagenSchema = new Schema({
    nombre_imagen: { type: String, required: true},
    extension: {type: String , required: true}
});

module.exports = mongoose.model('Imagen', ImagenSchema);