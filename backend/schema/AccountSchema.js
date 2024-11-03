const mongoose=require('mongoose');
const { Schema } = require('zod');
const AccountSchema=mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'UserModel'
},
 balance:{
    type:Number,
    required:true,
    
    min: 0, 
    default: 0.0
 }
},{timestamps:true});
const AccountModel=mongoose.model('AccountModel',AccountSchema);
module.exports=AccountModel;