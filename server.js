var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var _ = require('lodash');

var app = express();
app.use(bodyParser.json());

var port = 3000;
var db = massive.connectSync({
  connectionString : 'postgres://bxuiorjviqeuxc:464256f311bb3935d18a81421f1e3d5c967bc122de0411e5eb09c25cf9e00d39@ec2-23-21-158-253.compute-1.amazonaws.com:5432/d8f00f0umnvqlv?ssl=true'
});


app.get('/', function(req,res){  
  res.send('hello');
})

app.get('/injuries', function(req, res) {
  db.getAllInjuries(function(err,injuries){
    res.send(injuries);
  });
});

app.get('/incidents', function(req, res) {
  var state = req.query.state;
  if(state){
    db.getIncidentsByState([state],function(err,incidents){
      res.send(incidents);
    })
  }else{
    db.getAllIncidents(function(err,incidents){
      res.send(incidents);      
    })
  } 
  
});

app.post('/incidents', function(req, res) {
 var incident = req.body;
 db.createIncident([incident.state, incident.injuryid, incident.causeid],function(err,result){
   res.send(result[0]);
 })
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
