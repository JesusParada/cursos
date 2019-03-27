const Producto = require ('../models/producto');

const  productoController = {};

productoController.getProductos = async (req, res) => {
    const productos = await Producto.find().sort({"tipo_producto":1});
    res.json(productos);
}

productoController.getProducto = async (req,res) =>{
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
}

productoController.createProducto = async (req,res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.json({
        "message":"Producto Guardado"
    });
}

productoController.editProducto = async (req,res) =>{
    const {id} = req.params;
    const producto = {
        nombre_producto: req.body.nombre_producto,
        tipo_producto : req.body.tipo_producto,
        descripcion: req.body.descripcion,
        contenido: req.body.contenido,
        precio_venta: req.body.precio_venta,
        precio_costo: req.body.precio_costo,
        existencia: req.body.existencia,
        imagenes : req.body.imagenes,
        video : req.body.video,
        alto: req.body.alto,
        ancho: req.body.ancho,
        largo: req.body.largo,
        peso: req.body.peso
    };
    await Producto.findByIdAndUpdate(id, {$set: producto}, {new: true});
    res.status(200).json({messaje:"Producto Actualizado", status:200});

}

productoController.deleteProducto = async (req,res) => {
    await Producto.findByIdAndRemove(req.params.id);
    res.json({message: "Producto Eliminado"});
}

module.exports = productoController;

