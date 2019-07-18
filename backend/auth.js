// auth.js
var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');

exports.emailSignup = function(req, res) {
    console.log(req);
	var user = new User({
    	// Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
        user_email: req.body.email,
        user_password: req.body.password
    });
    
    user.save(function(err){
    	return res
    		.status(200)
        	.send({token: service.createToken(user)});
    });
};

exports.emailLogin = function(req, res) {

    console.log(User.find());
	User.findOne({user_email: req.body.user_nameOrEmail.toLowerCase()}, function(err, user) {
    	// Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        console.log(user);
        if(err){
            return err;
        }
        else{
            
            if(user.user_email === req.body.user_nameOrEmail && user.user_password == req.body.user_password){
                
                return res
                    .status(200)
                    .send({token: service.createToken(user)});
            }
            else{
                return "login failed";
            }
        }
    });
};