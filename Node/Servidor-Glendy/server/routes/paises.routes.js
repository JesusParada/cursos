const express = require('express');
const router = express.Router();

router.get('/mexico/', (req, res) =>{
    res.send({estados: 
        [
            {nombre: "Aguascalientes", clave:"AG"},
            {nombre: "Baja California",clave: "BC"},
            {nombre: "Baja California Sur",clave:"BS"},
            {nombre: "Campeche", clave:"CM"},
            {nombre: "Chiapas", clave:"CS"},
            {nombre: "Chihuahua",clave:"CH"},
            {nombre: "Ciudad de México", clave:"CX"},
            {nombre: "Coahuila", clave:"CO"},
            {nombre: "Colima",clave:"CL"},
            {nombre: "Durango",clave:"DG"},
            {nombre: "Guanajuato",clave:"GT"},
            {nombre: "Guerrero",clave:"GR"},
            {nombre: "Hidalgo",clave:"HG"},
            {nombre: "Jalisco",clave:"JC"},
            {nombre: "México",clave:"EM"},
            {nombre: "Michoacán",clave:"MI"},
            {nombre: "Morelos",clave:"MO"},
            {nombre: "Nayarit",clave:"NA"},
            {nombre: "Nuevo León",clave:"NL"},
            {nombre: "Oaxaca",clave:"OA"},
            {nombre: "Puebla",clave:"PU"},
            {nombre: "Querétaro",clave:"QT"},
            {nombre: "Quintana Roo",clave:"QR"},
            {nombre: "San Luis Potosí",clave:"SL"},
            {nombre: "Sinaloa",clave:"SI"},
            {nombre: "Sonora", clave:"SO"},
            {nombre: "Tabasco",clave:"TB"},
            {nombre: "Tamaulipas",clave:"TM"},
            {nombre: "Tlaxcala",clave:"TL"},
            {nombre: "Veracruz",clave:"VE"},
            {nombre: "Yucatán",clave:"YU"},
            {nombre: "Zacatecas",clave:"ZS"}
        ]
    })
});


module.exports = router;
