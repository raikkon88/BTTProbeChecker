// auth.js
var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');
let bcrypt = require('bcrypt');
let config = require('./config');

exports.emailSignup = function(req, res) {
    /*
    User.remove({}).exec(function(err, res){
        console.log(res);
    });
 
    bcrypt.hash('marc', config.SALT, function(err, password){
        console.log(password);
        var user = new User({
            user_name: 'Marc Sànchez Pifarré',
            user_email: 'msanxes@gmail.com',
            user_password: password
            
        });
        user.save(function(err){
            return res
                .status(200)
                .send({token: service.createToken(user)});
        });
    }); 
    */
};

exports.emailLogin = function(req, res) {
    User.findOne({'user_email': req.body.user_nameOrEmail}).exec(function(err, user){
        console.log(user);
        if(err){
            return 'User not found';
        }
        else{    
            bcrypt.compare(req.body.user_password, user.user_password, function (err, result){
                console.log(result);
                return res
                    .status(200)
                    .send({token: service.createToken(user)});
            });
        }
    });
};