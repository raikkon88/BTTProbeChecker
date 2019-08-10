const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const serverRoutes = express.Router();
const publicRoutes = express.Router();
const axios = require('axios');
const mongourl = "127.0.0.1:27017";
var CronJob = require('cron').CronJob;
var parseString = require('xml2js').parseString;
var moment = require('moment-timezone');


mongoose.connect('mongodb://' + mongourl + '/btt', { useNewUrlParser: true });
const connection = mongoose.connection;

let Server = require('./models/server.model');
let Probe = require('./models/probe.model');
let User = require('./models/user.model');
let Lecture = require('./models/lecture.model');

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

serverRoutes.route('/grid/:id').get(function(req, res){
  
  Probe.find({probe_server: req.params.id}).then(result => {
    let ids = []
    result.map(element => {
      ids.push(element._id);
    })
    Lecture.aggregate([
      {$match : { lecture_probe: { $in: ids }}},
      {$group : {_id:"$lecture_date" , lectures: {$push: { lecture_name:"$lecture_probe.probe_name", lecture_value:"$lecture_value"} }}} 
    ])
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log("Can't load data for the grid.");
      res.status(500).send("Can't load data for the grid.");
    })
})
.catch(err => {
  console.log("Can't load data for the grid.");
  res.status(500).send("Can't load data for the grid.");
})
   /*Probe.find({ probe_server: req.params.id}).populate('probe_lectures').then(result => {
    var i = 0;

    

    /*result.map(probe => {
      Lecture.find({ lecture_probe: probe._id }).sort('-lecture_date').then(resLectures => {
        result.probe_lectures = resLectures;
        i++;
        if(i === result.length){
          console.log("send!!");
          
        }
      })
    })
  })
  .catch(err => {
    console.log("Error loading probe with probe_lectures");
  });*/
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
    // Busquem si te controls. 
    Probe.find({"probe_server" : server._id}).then(result => {
      Probe.deleteMany({ probe_uuidAction: { $in:result.map(a => a.probe_uuidAction) } })
      .then(result => {
        let probes = [];
        req.body.server_probes.map(element => {
          probes.push(new Probe(element));
        });
        Probe.insertMany(probes).then(result => {
          server.server_probes = result;
          server.save().then(result => {
            res.status(200).send();
          })
          .catch(err => {
            res.status(500).send("Can't add server with new controls.");
          })
        })
        .catch(err => {
          res.status(500).send("Can't add new controls.");
        });
      })
      .catch(err => {
        res.status(500).send("Can't delete old controls.");
      });
    })
    .catch(err => {
      res.status(404).send("Server does not exist");
    });
  })
  .catch(err => {
    res.status(404).send("Server does not exist");
  });
});



app.use('/server', serverRoutes, middleware.ensureAuthenticated);
app.use('/', publicRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});


/**
 * Procés de cron per alimentar la base de dades des dels miniservers. 
 */
new CronJob('1 * * * * *', function(){
  Server.find({}).populate('server_probes')
  .then(result => {
    result.map(server => {
      server.server_probes.map(probe => {
        axios.get('http://' + server.server_url + ":" + server.server_port + "/dev/sps/io/" + probe.probe_uuidAction,  
          { withCredentials: true,  auth: {  username: server.server_user + '' , password: server.server_password + '' }})
        .then(result => {
          parseString(result.data, function (err, lectureResult) {
            if(err){
              console.err("Error in parse");
            }
            else{
              let lecture = new Lecture({
                lecture_date: moment().tz("Europe/Madrid").format(),
                lecture_value: lectureResult.LL.$.value,
                lecture_probe: probe._id
              })
              
              lecture.save().then(res => {
                probe.probe_lectures.push(lecture);
                probe.save().then(res => {
                  console.log("All stored");
                })
                .catch(err => {
                  console.err("Error saving the lecture")
                })
              })
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
      });
    });
  })
  .catch(error => {
    console.log(error);
  });
}, null, true, 'Europe/Madrid');

