const Imagen = require ('../models/imagen');
const fs = require('fs');

const  imagenController = {};


imagenController.new = async (req, res) => {
    let EDFile = req.files.file;
    let extension = EDFile.name.split(".").pop();
    var data = {
        nombre_imagen : EDFile.name,
        extension : extension
    }
    var imagen = new Imagen(data);
    imagen.save(function(err){
        if(!err){
            EDFile.mv(`server/assets/images/${imagen._id}.${imagen.extension}`,err => {
                if(err) return res.status(500).json({ message :"Error" });
                return res.status(200).json({ message : 'Exito', path_imagen: `images/${imagen._id}.${imagen.extension}` })
            });
        } else{
            return res.status(500).json({ message :"Error" });
        }
    })

    
}



module.exports = imagenController;

