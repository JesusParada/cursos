var nodemailer = require('nodemailer');

const emailController = {};
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'glendy.ventas@gmail.com',
        clientId: '353947451658-kke99nihpb9r4mp3p1jl4mackvsjidl3.apps.googleusercontent.com',
        clientSecret: 'W9qDFB-6bMX9kU8FeDgvyGfR',
        refreshToken: '1/aCz9nEsaMOZz2MyDzRmMNcHQSMhBDUwr0SloeaZwhX_BSbjG84sFk3uHoDeIt6vq',
        accessToken: 'ya29.GluOBkNJgtFhwKUb8_lN3gAiYDYqMldcXvqI6IMbngC48qyOWsIcCW1uVQQk0NlNxVAMJPHjW57VB_Rhr2oG0saDS_or8grL1NbV_jM93eiX1aGit4d0tUoRThJ2'     
    },
    tls: {
        rejectUnauthorized: false
    }
});

emailController.enviar = (json) =>{
    var mailOptions = {
        from: 'glendy.ventas@gmail.com',
        to: json.destino,
        subject: json.asunto,
        text: json.texto,
        html: json.html
    };
    const send = new Promise((resolve, reject) =>{
        try{
            transporter.sendMail(mailOptions, function(error, info){
                if (error){ reject({message : "Fallo el envío"});}
                else {resolve();}
            });
        }catch(err){
            reject ({message : "Falló el envío"})
        }
    })
    return send;
}

module.exports = emailController;

