var express = require('express');
var router = express.Router();


// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    if(req.user.role == 'user'){
console.log(req.user.role);
	res.render('index', { user : req.user });

}
  else if(req.user.role == 'administrator'){
console.log(req.user.role);
    res.render('indexadmin', { user : req.user });

}
});

//search
router.get('/search', ensureAuthenticated, function(req, res){
	res.render('search', { user : req.user });
});

router.post('/search', ensureAuthenticated, function(req, res){
	res.redirect('/search', { user : req.user });
});

//user profiles
//all users
router.get('/allusers', ensureAdmin, function(req, res){
	res.render('allusers', { user : req.user });
});

//all administrators
router.get('/alladministrators', ensureAdmin, function(req, res){
    res.render('alladministrators', { user : req.user });
});

//delete user
router.get('/deleteuser', ensureAdmin, function(req, res){
	res.render('deleteuser', { user : req.user });
});

router.post('/deleteuser', ensureAdmin, function(req, res){
	res.redirect('/deleteuser', { user : req.user });
});


router.get('/announcements', ensureAdmin, function(req, res){
	res.render('announcements', { user : req.user });
});

router.get('/sendannouncement', ensureAdmin, function(req, res){
	res.render('index', { user : req.user });
});

router.get('/search', ensureAdmin, function(req, res){
    res.render('search', { user : req.user });
});

//Edit Profile Page
router.get('/editprofile', ensureAuthenticated, function(req, res) {

        if(req.user.role == 'user'){
console.log(req.user.role);
    res.render('editprofile', { user : req.user });

}
  else if(req.user.role == 'administrator'){
console.log(req.user.role);
    res.render('editadminprofile', { user : req.user });

}
});

//Updated Profile Page
router.get('/profileupdated', ensureAuthenticated, function(req, res) {
    res.render('profileupdated', { user : req.user });
});

//Updated Profile Page
router.get('/navoption', ensureAuthenticated, function(req, res) {
    res.render('navoption', { user : req.user });
});


router.post('/profileupdated', ensureAuthenticated, function (req, res) {
    res.redirect('/profileupdated', { user : req.user });

});

//User Profile
router.get('/profile', ensureAuthenticated, function(req, res) {

        if(req.user.role == 'user'){
console.log(req.user.role);
    res.render('profile', { user : req.user });

}
  else if(req.user.role == 'administrator'){
console.log(req.user.role);
    res.render('profileadmin', { user : req.user });

}

});

//School Info
router.get('/schools', ensureAuthenticated, function(req, res) {
    res.render('schools', { user : req.user });
});

router.post('/schools', ensureAuthenticated, function(req, res) {
    res.redirect('/schools');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}

}

function ensureAdmin(req, res, next){
	if(req.isAuthenticated() && req.user.role == 'administrator'){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}

}


module.exports = router;