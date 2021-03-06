const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({ // or whatever you want to use
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            if (!user || user.password != password){
                req.flash('error','invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
    

));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in pass on the user to next controller action
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');//if not signed in
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain current signed in user from session cookie and we are sending this to locals for the views
        res.locals.user = res.user;
    }
    return next();
}




module.exports = passport;