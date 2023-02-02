var express = require("express");
var passport = require("passport");
const crypto = require("crypto");

/*function generateUniqueID() {
   return crypto.randomBytes(8).toString('hex');
 }*/

//var User = require("../../models/user");
var User = require("../../models/user2");

var router = express.Router();


router.get("/", function (req, res) {
   // console.log("hello I'm on the start page");
   res.render("home/");
});

router.get("/home", function (req, res) {
   res.render("home/home");
});

router.get("/about", function (req, res) {
   res.render("home/about");
});

router.get("/login", function (req, res) {
   res.render("home/login")
});

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/home");
});

router.post("/login", passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/login",
   failureFlash: true
}));

router.get("/signup", function (req, res) {
   res.render("home/signup")
});

router.post("/signup", function (req, res, next) {
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;
   var id = crypto.randomInt(0,10000);
   console.log("Username : ", username);
   var test = User.find({ username: username });
   var testLength = Object.keys(test).length
   console.log("Contenu de test : ", testLength)
   if(testLength > 0) {
      console.log("Test : ",test);
      res.render("home/signup");
   }else{
      var newUser = User.create({
         _id: id,
         username: username,
         email: email,
         password: password
      });
      console.log(newUser);
      newUser.save();
      res.render("home/home")
   };
});
   //})

   /*User.findOne({ email: email }, function (err, user) {
      if (err) { return next(err); }
      if (user) {
         req.flash("error", "There's already an account with this email");
         return res.redirect("/signup");
      }

      var newUser = new User({
         username: username,
         password: password,
         email: email
      });

      newUser.save(next);

   });*/


module.exports = router;
