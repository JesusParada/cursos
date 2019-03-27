const express = require('express');
const router = express.Router();
const ventaController = require ('../controllers/ventas.controller');
const auth = require('../middlewares/auth')


router.post('/',auth.isAuth,ventaController.create);
router.get('/execute/',ventaController.execute);
router.get('/:id', ventaController.getVenta);
router.put('/enviar/:id',ventaController.enviarVenta);
router.delete('/:id',ventaController.deleteVenta);
router.get('/', ventaController.getVentas);


module.exports = router;