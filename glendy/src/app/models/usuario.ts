export class Usuario {

    constructor(_id = '', email = '', password = '', tipo = '', nombre_usuario = ''){
        this._id = _id;
        this.email = email;
        this.password = password;
        this.tipo = tipo;
        this.nombre_usuario = nombre_usuario;
    }

    _id : String;
    email: String;
    password: String;
    tipo: String;
    nombre_usuario: String;
}
