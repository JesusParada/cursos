const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;
var Producto = require('./producto');

const UsuarioSchema = new Schema({
    email: String,
    password: String,
    tipo: String,
    nombre_usuario: String,
    confirmado: Boolean,
    productos_carrito : [{type: Schema.ObjectId, ref : "Producto"}]
});

UsuarioSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UsuarioSchema.methods.validarPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Usuario', UsuarioSchema);