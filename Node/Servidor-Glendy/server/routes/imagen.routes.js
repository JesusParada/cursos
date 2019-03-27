const express = require('express');
const router = express.Router();
const imagenController = require ('../controllers/imagen.controller');

router.post('/',imagenController.new);


module.exports = router;