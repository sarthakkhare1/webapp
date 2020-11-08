module.exports.profile = function(req,res){
    return res.end('<h1>profile page<h1>');
}

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
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });

}


module.exports.createSession = function(req,res){
    return res.redirect('/');
}