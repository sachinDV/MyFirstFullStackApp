const express = require('express');
const Post = require('../models/post');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get('',(req,res,next)=> {
  const posts = [{
    id : "SDV",
    title :"This is my first post",
    content:"This comes from backend"
  },
  {
    id : "SDV1",
    title :"This is my second post",
    content:"This comes from backend too!"
  }

  ]

  Post.find().then(documents=>{
    res.status(200).json({
      message:"Message fetched successfully",
      posts:documents
    });
  })

});

router.post("",checkAuth,(req,res,next)=>{
  const posts = new Post({title:req.body.title, content:req.body.content, creator:req.userData.userId});
  console.log(posts);
  console.log(req.userData);
  posts.save();
  res.status(201).json({message:"post added successfully"});
})

module.exports = router;
