var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;
        

var User = require('../models/user');

// Register Page
router.get('/register', function(req, res){
	res.render('register');
});

// Login Page
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var Fname = req.body.Fname;
	var Lname = req.body.Lname;
	var Eaddress = req.body.Eaddress;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('Fname', 'Name is required').notEmpty();
	req.checkBody('Lname', 'Name is required').notEmpty();
	req.checkBody('Eaddress', 'Email is required').notEmpty();
	req.checkBody('Eaddress', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			Fname: Fname,
			Lname: Lname,
			Eaddress: Eaddress,
			username: username,
			password: password,
      role: 'user'
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//User Logs In
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login'}),
  function(req, res) {
    res.redirect('/');
  });

//User Logs Out
router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

//Edit User Profile
router.put('/:username', function(req, res){

    var username = req.params.username;

    var body = req.body;
    var newFname = body.Fname;
    var newLname = body.Lname;
    var newBirthdate = body.birthdate;
    var newMaritalStatus = body.maritalStatus;
    var newPhoneNum = body.phoneNum;
    var newEaddress = body.Eaddress;
    var newAddress = body.address;
    var newCity = body.city;
    var newProvince = body.province;
    var newPostalCode = body.postalCode;
    var newHighestEducCompleted = body.highestEducCompleted;
    var newPostSecCred = body.postSecCred;
    var newPostGradCred = body.postGradCred;
    var newPostSecondary = body.postSecondary;
    var newPostGrad = body.postGrad;
    var newOverallMark = body.overallMark;
    var newReading = body.reading;
    var newWriting = body.writing;
    var newListening = body.listening;
    var newSpeaking = body.speaking;
        
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/project'
    MongoClient.connect(url, function(err, db){

        if(err){
            console.log("Cannot connect to server", err)
        } else {
            console.log("Connection Established");

            var collection = db.collection('users');

            collection.update(
                { username: username },
                {
                    $set: {
                        "Fname": newFname,
                        "Lname": newLname,
                        "birthdate": newBirthdate,
                        "maritalStatus": newMaritalStatus,
                        "phoneNum": newPhoneNum,
                        "Eaddress": newEaddress,
                        "address": newAddress,
                        "city": newCity,
                        "province": newProvince,
                        "postalCode": newPostalCode,
                        "highestEducCompleted": newHighestEducCompleted,
                        "postSecCred": newPostSecCred,
                        "postGradCred": newPostGradCred,
                        "postSecondary": newPostSecondary,
                        "postGrad": newPostGrad,
                        "overallMark": newOverallMark,
                        "reading": newReading,
                        "writing": newWriting,
                        "listening": newListening,
                        "speaking": newSpeaking
                    }
                }
            )

        }
            db.close();
    });
});

/*
router.put('/:username', function(req, res){

    var username = req.params.username;

    var body = req.body;
    var announcement = body.announcement;

      var url = 'mongodb://localhost:27017/project'
    MongoClient.connect(url, function(err, db){

        if(err){
            console.log("Cannot connect to server", err)
        } else {
            console.log("Connection Established");

            var collection = db.collection('users');

            collection.update(
                { username: username },
                {
                    $set: {
                        "annoucement": annoucement,
                    }
                }
            )

        }
            db.close();
    });
});*/


//get all users
router.get('/listusers', function(req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/project'

  MongoClient.connect(url, function(err, db){
    if(err){
      console.log("Cannot connect to server", err)
    } else {
      console.log("Connection Established");

      var collection = db.collection('users');

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

/*
router.get('/:username', function (req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/project'

  MongoClient.connect(url, function(err, db){
    if(err){
      console.log("Cannot connect to server", err)
    } else {
      console.log("Connection Established");

      var collection = db.collection('users');
      var body = req.body;
      var username = req.params.username;
       console.log(username);


      collection.find({username: username}).toArray(function(err, result){
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
});*/

//Delete A User

router.delete('/:username', function (req, res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/project'

  MongoClient.connect(url, function(err, db){
    if(err){
      console.log("Cannot connect to server", err)
    } else {
      console.log("Connection Established");

      var collection = db.collection('users');
      var body = req.body;
      var username = req.params.username;
       console.log(username);


      collection.remove({username: username}, function(err, result){
        if (err){
          res.send(err);
        } else{
           console.log(username + " deleted.")
        }
        db.close();
      });
    }
  });
});

module.exports = router;