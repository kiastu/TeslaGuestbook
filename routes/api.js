/*
 * Serve JSON to our AngularJS client
 */

var Post = require('../models/Post.js');
var fs = require('fs');

exports.post = function (req, res) {
//save the image file
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
  var date = new Date();
  var imageName = date.valueOf()+req.body.name;
  fs.writeFile("public/signatures/"+imageName+".png", base64Data, 'base64', function(err) {
    console.log(err);
  });
  //parse the req, and save the model.
  var newPost = new Post();
  newPost.name = req.body.name;
  newPost.content = req.body.content;
  newPost.date = req.body.date;
  newPost.signatureLink = imageName;
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