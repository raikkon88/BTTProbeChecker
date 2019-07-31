const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const serverRoutes = express.Router();
const publicRoutes = express.Router();
const axios = require('axios');

let Server = require('./models/server.model');
let Probe = require('./models/probe.model');
let User = require('./models/user.model');

var auth = require('./auth');
const mongourl = "127.0.0.1:27017";

var middleware = require('./middleware');
serverRoutes.use(middleware.ensureAuthenticated);

const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

publicRoutes.post('/auth/login', auth.emailLogin);
publicRoutes.post('/auth/signup', auth.emailSignup);

mongoose.connect('mongodb://' + mongourl + '/btt', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

serverRoutes.route('/').get(function(req, res) {
  Server.find(function(err, servers) {
      if (err) {
          console.log(err);
      } else {
          res.json(servers);
      }
  });
});

serverRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Server.findById(id).populate('server_probes').exec(function(err, server) {
      res.json(server);
  });
});

serverRoutes.route('/add').post(function(req, res) {
  axios.get('http://' + req.body.server_user + ":" + req.body.server_password + "@" + req.body.server_url + ":" + req.body.server_port + "/data/LoxAPP3.json")
  .then(response => {
    console.log(response.data.msInfo);
    let server = new Server({
      server_serial_number: response.data.msInfo.serialNr,
      server_lecture_frequency: req.body.server_lecture_frequency,
      server_name:response.data.msInfo.msName,
      server_url:req.body.server_url,
      server_user:req.body.server_user,
      server_password:req.body.server_password,
      server_port:req.body.server_port
    });
    server.save()
      .then(server => {
          res.status(200).json({'server': 'server added successfully'});
      })
      .catch(err => {
        res.status(400).send('adding new server failed');
      });
  })
  .catch(error => {
    console.log("Failed to load http request to server: " + req.body.server_user );
  });
});

serverRoutes.route('/:id/add').post(function(req, res) {
  
  let probe = new Probe(req.body);
  Server.findById(probe.probe_server, function (err, server){
    probe.save().then(probe => {
      console.log(server);
      server.server_probes.push(probe);
      server.save().then(server => {
        res.status(200).json({'probe': 'probe added successfully'});
      })
      .catch(err => {
        res.status(400).send('adding new probe failed');
      });
    })
    .catch(err => {
      res.status(400).send('adding new probe failed');
    });
  });
});

serverRoutes.route('/delete/:id').delete(function(req, res){
  Server.deleteOne({_id: req.params.id } ,function(err){
    console.log(err);
    if(err){
      res.status(404).send("Server does not exist");
    }
    else {
      res.status(200).send();
    }
  });
});

serverRoutes.route('/update/:id').post(function(req, res) {
  Server.findById(req.params.id, function(err, server) {
    if (!server)
        res.status(404).send("data is not found");
    else{
      server.server_url = req.body.server_url;
      server.server_user = req.body.server_user;
      server.server_password = req.body.server_password;
      server.server_port = req.body.server_port;

      server.save().then(server => {
          res.json('server updated!');
      })
      .catch(err => {
          res.status(400).send("Update not possible");
      });
    }
  });
});



app.use('/server', serverRoutes, middleware.ensureAuthenticated);
app.use('/', publicRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
