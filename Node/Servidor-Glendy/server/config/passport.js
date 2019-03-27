const LocalStrategy = require ('passport-local').Strategy;
const Usuario = require('../models/usuario');

module.exports = function (passport){
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done){
        Usuario.findById(id, function (err, user){
            done(err,user);
        });
    });
    //SignUp
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, email, password, done){
        Usuario.findOne( {'email': email}, function(err,user){
            if(err){ return done(err);}
            if(user) {
                return done(null,false, req.flash ('signupMessage', 'El email ya ha sido registrado'))
            }else{
                var nuevoUsuario = new Usuario();
                nuevoUsuario.email = email;
                nuevoUsuario.password = nuevoUsuario.generateHash(password);
                nuevoUsuario.tipo = req.body.tipo;
                nuevoUsuario.nombre_usuario = req.body.nombre_usuario;
                nuevoUsuario.productos_carrito = [];
                nuevoUsuario.save(function(err){
                    if(err){throw err;}
                    return done(null, nuevoUsuario);
                });
            }
        })
    }
    ));
    //Login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, email, password, done){
        console.log(email +" : "+ password);
        Usuario.findOne( {'email': email}, function(err,user){
            if(err){ return done(err);}
            if(!user) {
                return done(null,false, req.flash ('loginMessage', 'Usuario no encontrado'));
            }
            if(!user.validarPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));
            }
            return done (null, user);
        })
    }
    ));
}
