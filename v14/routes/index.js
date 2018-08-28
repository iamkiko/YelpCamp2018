var express = require("express")
var router = express.Router(); //new instance of the express router
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});


//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
          if(err){
                console.log(err);
                return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res){
});

//log out route
router.get("/logout", function(req, res) {
    req.logout(); //comes from packages installed
    req.flash("success", "You have successfully logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;