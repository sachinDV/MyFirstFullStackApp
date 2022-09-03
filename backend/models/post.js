const mongoose = require('mongoose');

//Creation of  schema

const postSchema = mongoose.Schema({
  title:{type : String,required : true},
  content:{type:String, required: true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User" ,required:true}
});


//Creation of model

module.exports = mongoose.model('Post',postSchema);
