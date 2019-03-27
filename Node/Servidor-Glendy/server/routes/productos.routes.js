const express = require('express');
const router = express.Router();
const productoController = require ('../controllers/producto.controller');
const auth = require ('../middlewares/auth');

router.get('/', productoController.getProductos);
router.post('/', auth.isAuth, productoController.createProducto);
router.get('/:id', productoController.getProducto);
router.put('/:id',auth.isAuth, auth.isAdmin, productoController.editProducto);
router.delete('/:id',auth.isAuth, auth.isAdmin, productoController.deleteProducto);


module.exports = router;