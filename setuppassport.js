var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function () {
    //turns a user object into an id
/*    passport.serializeUser(function (user, done) {
        //serializing the user
        done(null, user._id);
    });
    //turns the id into a user object
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    }); */

    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },  function (email, password, done) {
            var test = User.find({ email: email });
            var testLength = Object.keys(test).length
            console.log("Contenu de test length : ", testLength)
            console.log("Contenu de test : ", test)
            if(testLength == 0) {
                console.log("Test : ",test);
                return done(null, false, { message: "No user has that Email!" });
            }else{
                console.log("Contenu de test password : ", User.password);
                console.log("Contenu de password : ", password);
                if(User.password === password){
                    return done(null, test);
                }else{
                    return done(null, false, { message: "Invalid password" });
                }
            }
    }
    ));

 /*   passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "No user has that Email!" });
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid password" });
                }
            });
        });
    }));*/



}