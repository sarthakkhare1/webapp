const Post = require('../models/post');
//const { post } = require('../routes');
const Comment = require('../models/comment');
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    //to destroy we need id which we will get from params
    Post.findById(req.params.id,function(err,post){

        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post : req.params.id},function(err){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }

    })
}