const express = require('express');
const router = express.Router();
const usuarioControler = require ('../controllers/usuario.controller');
const auth = require('../middlewares/auth');

router.get('/', usuarioControler.getUsuarios);
router.delete('/:id',usuarioControler.deleteUsuario);
router.post('/',usuarioControler.agregarUsuario);
router.post('/login/',usuarioControler.login);
router.post('/register/',usuarioControler.register);
router.get('/confirmacion/:token',usuarioControler.confirmarUsuario);
router.post('/carrito/',auth.isAuth,usuarioControler.agregarAlCarrito);
router.delete('/carrito/:id',auth.isAuth,usuarioControler.eliminarDelCarrito);
router.get('/carrito/', auth.isAuth, usuarioControler.getProductosCarrito);

module.exports = router;
