const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup",(req, res, next)=>{
  bcrypt.hash(req.body.password, 10 ).then(hash=>{
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result=>{
      res.status(201).json(
        {
          message:"User Created",
          result:result
        }
      )
  });


    }).catch(err=> {
      res.status(500).json({
        error:err
      })
    })


} );

router.post("/login",(req, res, next)=>{
  let fetchUser;
User.findOne({
  email:req.body.email
}).then(users=>{
  console.log("promise result of find one"+users)
if(!users)
{
  return res.status(401).json({
    message:"Auth failed"
  });
}
fetchUser = users;
return  bcrypt.compare(req.body.password,users.password)

})

.then(result=>{
  console.log("promise result of bcrypt compare"+result)
  if(!result)
  {
    return res.status(401).json({
      message:"Auth failed"
    });

  }
  console.log("users"+fetchUser);
  const token = jwt.sign({email:fetchUser.email, userId:fetchUser._id}, 'secret_this_should_be_longer', {expiresIn:"1h"});
  console.log("token"+token);

  res.status(200).json({token:token});

})
.catch(err=>{

  return res.status(401).json({
    message:"Auth failed"
  })
})

})



module.exports = router;
