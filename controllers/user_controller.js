const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'User profile',
            user : req.user,
            profile_user : user
        });
    });
    
}
//render signup page
module.exports.sighUp = function(req,res){
    if(req.isAuthenticated()){
        return  res.redirect('/users/profile');
     }
    return res.render('user_signup',{
        title : "intsocial | signup"

    });
}

module.exports.sighIn = function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile');
    }
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

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
       try {
           let user = await User.findById(req.params.id);
           User.uploadedAvatar(req,res,function(err){
               if(err){
                   console.log('multer error',err);
               }
               user.name = req.body.name;
               user.email = req.body.email;
               if(req.file){
                   //save file path into avatar feild
                   user.avatar = User.avatarPath +'/'+ req.file.filename;
               }
               user.save();
               return res.redirect('back');
           });
       } catch (err) {
           req.flash('error',err);
           return res.redirect('back');
       }
    }else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.createSession = function(req,res){
    console.log('verified');
    req.flash('success','logged in successfuly');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','logged out successfuly');
    return res.redirect('/users/sign-in');
}