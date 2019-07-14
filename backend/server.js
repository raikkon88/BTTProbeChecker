const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const serverRoutes = express.Router();

let Server = require('./models/server.model');
let Probe = require('./models/probe.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/btt', { useNewUrlParser: true });
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
  let server = new Server(req.body);
  server.save()
      .then(server => {
          res.status(200).json({'server': 'server added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new server failed');
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
  //console.log(server);
  /*
  probe.save().then(probe => {
    res.status(200).json({'probe': 'probe added successfully'});
  })
  .catch(err => {
      res.status(400).send('adding new probe failed');
  });
    */
});

serverRoutes.route('/update/:id').post(function(req, res) {
  Server.findById(req.params.id, function(err, server) {
    if (!server)
        res.status(404).send("data is not found");
    else
      server.server_name = req.body.server_name;
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
  });
});

app.use('/server', serverRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
