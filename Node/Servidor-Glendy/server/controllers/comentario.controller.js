const Comentario = require ('../models/comentario');

const  comentarioController = {};

comentarioController.getComentarios = async (req, res) => {
    const comentarios = await Comentario.find().populate("usuario").exec();
    res.json(comentarios);
}

comentarioController.getComentario = async (req,res) =>{
    const comentario = await Comentario.findById(req.params.id).populate("usuario").exec();
    res.json(comentario);
}

comentarioController.createComentario = async (req,res) => {
    const comentario = new Comentario();
    comentario.usuario = req.user;
    comentario.texto = req.body.texto;
    comentario.tipo = req.body.tipo;
    await comentario.save();
    res.json({
        "message":"Comentario Guardado"
    });
}

comentarioController.editComentario = async (req,res) =>{
    const {id} = req.params;
    const comentario = {
        usuario: req.body.usuario,
        tipo: req.body.tipo,
        texto: req.body.texto,
        fecha: req.body.fecha,
        respuesta: req.body.respuesta
    };
    await Comentario.findByIdAndUpdate(id, {$set: comentario}, {new: true});
    res.json({message: "Comentario Actualizado"});

}

comentarioController.deleteComentario = async (req,res) => {
    await Comentario.findByIdAndRemove(req.params.id);
    res.json({message: "Comentario Eliminado"});
}

module.exports = comentarioController;

