var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
    role: {type: String},
    Fname: {type: String, required: true},
    Lname: {type: String, required: true},
    birthdate: {type: String},
    maritalStatus: {type: String},
    phoneNum: {type: String},
    Eaddress: {type: String, required: true},
    address: {type: String},
    city: {type: String},
    province: {type: String},
    postalCode: {type: String},
    highestEducCompleted: {type: String},
    postSecondary: Boolean,
    postSecCred: String,
    postGrad: Boolean,
    postGradCred: String,
    overallMark: Number,
    reading: Number,
    writing: Number,
    listening: Number,
    speaking: Number,
    annoucement: {type: String}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}