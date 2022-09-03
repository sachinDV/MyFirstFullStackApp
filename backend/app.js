const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://SachinDV:1C9eYsnYv5LfrC0c@cluster0-fullstackapp.ih7yety.mongodb.net/test?retryWrites=true&w=majority")
.then(()=> {
  console.log("Connected to database");
})
.catch((error) => {
  console.log("Connection failed");
  console.log(error)
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
next();
})

app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);


//gnRxjGT65c33kLJd
//1C9eYsnYv5LfrC0c




module.exports = app;
