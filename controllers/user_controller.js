const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User profile'
    });
}
//render signup page
module.exports.sighUp = function(req,res){
    return res.render('user_signup',{
        title : "intsocial | signup"
    });
}

module.exports.sighIn = function(req,res){
    return res.render('user_signin',{
        title : "intsocial | signin"
    });
}

// get the signup data
module.exports.create = function(req,res){
    //to do later
    if (req.body.password!= req.body.confirm_pass ){
        //console.log('0');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        //console.log('1');
        if (!user){
            //console.log('3');
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                //console.log('2');
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });

}


module.exports.createSession = function(req,res){
    console.log('verified');
    return res.redirect('/');
}