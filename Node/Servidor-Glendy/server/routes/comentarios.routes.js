const express = require('express');
const router = express.Router();
const comentariosController = require ('../controllers/comentario.controller');
const auth = require('../middlewares/auth')

router.get('/', comentariosController.getComentarios);
router.post('/',auth.isAuth, comentariosController.createComentario);
router.put('/:id',auth.isAuth, comentariosController.editComentario);
router.get('/:id', comentariosController.getComentario);
router.delete('/:id', comentariosController.deleteComentario);

module.exports = router;