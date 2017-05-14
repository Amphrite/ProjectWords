var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var expressValidator = require('express-validator');
var User = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Login 
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, email, password, done) {
            if (email) {
                console.log("toLowerCase")
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            }
            // asynchronous
            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) { // if no user is found, return the message
                        console.log('User Not Found with email ' + email);
                        return done(null, false);
                    }
                    if (!user.validPassword(password)) {
                        console.log('Invalid Password');
                        return done(null, false);
                    }
                    return done(null, user);
                });
            });
        }));

    // Local signup ====
    passport.use('signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        roleField: 'role',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            if (email) {
                console.log("toLowerCase");
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            }
            // asynchronous
            process.nextTick(function () {

                if (!req.user) {
                    User.findOne({ 'email': email }, function (err, user) {
                        // if there are any errors, return the error
                        if (err) {
                            return done(err);
                        }

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false);
                        } else {

                            // if there is no user with that email
                            // create the user
                            var newUser = new User();

                            newUser.email = email;
                            newUser.password = newUser.generateHash(password);
                            newUser.role = req.body.role;

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }

                    });
                } else {
                    console.log("return if user is logged in and already has a account")
                    return done(null, req.user);
                }
            });
        })
    );

     passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,


    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));
};