var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

//Get List of Schools 
router.get('/listschools', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/project'

  MongoClient.connect(url, function(err, db){
    if(err){
      console.log("Cannot connect to server", err)
    } else {
      console.log("Connection Established");

      var collection = db.collection('schools');

      collection.find({}).toArray(function(err, result){
          console.log(result);
        if (err){
          res.send(err);
        } else if (result.length){
           res.send(result);
        } else {
          res.send('No documents found');
          console.log("No documents found");
        }
        db.close();
      });
    }
  });
});

module.exports = router;