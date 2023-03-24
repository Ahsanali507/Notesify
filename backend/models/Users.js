const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})
const user=mongoose.model("Users",userSchema);
//user.createIndexes();        // we comment it because now logically(by coding in auth.js) we checking email already exists or not
module.exports=user