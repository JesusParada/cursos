const express = require('express');
const router = express.Router();
const emailController = require ('../controllers/email.controller');
const cotizadorController = require ('../controllers/cotizador');
const auth = require ('../middlewares/auth');

router.post('/email/', async function(req, res) {
    emailController.enviar(req.body)
    .then( response =>{ return res.status(200).send("Correo Enviado")})
    .catch(response =>{ return res.status(500).send(response)});
});
router.post('/cotizar/', cotizadorController.cotizar); 


module.exports = router;