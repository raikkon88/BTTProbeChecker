const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const serverRoutes = express.Router();
const publicRoutes = express.Router();
const axios = require('axios');
const mongourl = "127.0.0.1:27017";

mongoose.connect('mongodb://' + mongourl + '/btt', { useNewUrlParser: true });
const connection = mongoose.connection;

let Server = require('./models/server.model');
let Probe = require('./models/probe.model');
let User = require('./models/user.model');

var auth = require('./auth');


var middleware = require('./middleware');
serverRoutes.use(middleware.ensureAuthenticated);

const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

publicRoutes.post('/auth/login', auth.emailLogin);
publicRoutes.post('/auth/signup', auth.emailSignup);



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
    console.log(err);
    console.log(server);
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
  Server.findById(req.body._id).populate("server_probes")
  .then(server => {

    server.server_probes = [];

    // Busquem si aquest server té controls

    Probe.find({"probe_server" : server._id}).then(result => {
      result.map(element => {
        element.deleteMany({"probe_uuidAction": el.probe_uuidAction}).catch(err => {console.log("Failed to delete a probe ... ")});
      });
      var n = 0;
      req.body.server_probes.map(element => {
        let new_probe= new Probe(element);
        new_probe.save().then(result => {
          server.server_probes.push(new_probe);
        })
        .catch(err => {
          console.log("Hi ha hagut un error al actualitzar els controls.");
        })
        n++;
        if(n === req.body.server_probes.length){
          server.save().then(result => {
            res.status(200).send("S'ha actualitzat tot");
          })
          .catch(err => {
            console.log("no s'ha pogut guardar el server modificat");
          })
        }
      });
    })
    .catch(err => {
      res.status(404).send("Server does not exist");
    })
  
  })
  .catch(err => {
    res.status(404).send("Server does not exist");
  });
  /*
  Server.findById(req.body._id)
    .then(server => {
      let probes = [];
      let ids = [];
      req.body.server_probes.map(element => {
        ids.push(element.uuidAction);
        probes.push(new Probe(element));
      });

      Probe.update({'probe_uuidAction': ids}, probes, {upsert: true, setDefaultsOnInsert: true})
      .then(result => {
        server.server_probes = probes;
        server.save().then(result => {
          res.status(200).send("Server updated");
        })
        .catch(err => {
          res.status(500).send("server failed to update");
        })
        
      })
      .catch(err => {
        res.status(500).send("Probes not updated");
      });
    })
    .catch(err => {
      res.status(404).send("Server does not exist");
    });
 */
  

  
/*
  Probe.updateMany({'probe_server': server}, probes, {upsert: true, setDefaultsOnInsert: true})
    .then(result => {
      console.log("all records has been updated and putted inside the server probes");
      console.log(server);
      probes.map(prob => {
        server.server_probes.push(prob);
      })
      console.log(server);
      server.save()
        .then(result => {
          console.log( server);
          res.status(400).send(server);
        })
        .catch(err => {
          console.log("error...." + err);
          res.status(400).send('Failed');
        });
    })
    .catch(err => {
      res.status(400).send('Failed');
    });
*/
/*  var n = 0;
  req.body.server_probes.map(element => {

    let probe = new Probe(element);
    probe.save().then(probe => {
      console.log("element saved");
    }).catch(err => {
      console.log("el elemento ya existe");
    })
    server.server_probes.push(probe);
    n++;

    if(n === req.body.server_probes.length){
      Server.updateOne({"_id": server._id}, server, function(err, server){
        if(err){
          console.log(err);
          res.status(400).send('Failed');
        }
        else{
          console.log(server);
          res.status(200).send(server);
        }
      });
    }
  });
*/
  

  /*
  Probe.findById(element._id).exec(function(err, probe) {
      if(err){
        let probe = new Probe(element);
        
      }
      n++;
      if(n === req.body.server_probes.length){
        server.save().then(server => {
          res.json('server updated!');
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
      }
    }) 
  
  
  
  
  
  
  Server.findById(req.params.id, function(err, server) {
    if (!server){
      console.log("Not found");
      res.status(404).send("data is not found");
    }
    else{
      Server.update()
    
      /*server.server_url = req.body.server_url;
      server.server_user = req.body.server_user;
      server.server_password = req.body.server_password;
      server.server_port = req.body.server_port;
      // Reinicialitzem els controls. 
      server.server_probes = [];
      var n = 0;

      
    }
  });*/
});



app.use('/server', serverRoutes, middleware.ensureAuthenticated);
app.use('/', publicRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
