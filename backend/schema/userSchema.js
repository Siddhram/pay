const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
  firstname:{
    type:String,
  },
  lastname:{
    type:String,
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
},{timestamps:true});
const UserModel=mongoose.model('UserModel',userSchema);
module.exports=UserModel;