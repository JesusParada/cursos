const express = require('express');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//Configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());
app.use(fileUpload());

//Routes
app.use('/api/productos/',require ('./routes/productos.routes'));
app.use('/api/ventas/',require('./routes/ventas.routes'));
app.use('/api/usuarios/', require('./routes/usuarios.routes'));
app.use('/api/comentarios/',require('./routes/comentarios.routes'));
app.use('/api/imagenes/',require('./routes/imagen.routes'));
app.use('/api/estados/',require('./routes/paises.routes'));
app.use(require('./routes/mail.routes'));
app.use(express.static(__dirname + '/assets'));
 
//Inicio del servidor
app.listen(app.get('port') , () =>{
    console.log("Server on port", app.get('port'));
})
