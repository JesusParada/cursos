const mongoose = require('mongoose');
const {Schema} = mongoose;

const ComentarioScheme = new Schema({
    usuario: {type: Schema.ObjectId, ref: "Usuario"},
    tipo: {type:String , required: true},
    texto: { type: String, required: true},
    fecha: {type: Date, default : Date.now},
    respuesta: String
});

module.exports = mongoose.model('Comentario', ComentarioScheme);

