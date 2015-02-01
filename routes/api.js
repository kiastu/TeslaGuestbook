/*
 * Serve JSON to our AngularJS client
 */

var Post = require('../models/Post.js');

exports.post = function (req, res) {

  //parse the req, and save the model.
  var newPost = new Post();
  newPost.name = req.body.name;
  newPost.content = req.body.content;
  newPost.date = req.body.date;
  newPost.signatureLink = "Empty";
  newPost.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.json({message:"Post successfully added!"});
    }
  });


};

exports.getPosts = function(req,res){
  Post.find(function(err,posts){
    if(err)
      res.send(err);
    else{
      res.json(posts);
    }
  })
}