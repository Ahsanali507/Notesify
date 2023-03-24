const mongoose=require('mongoose');
const {Schema}=mongoose;

const noteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,Number,
        required:true
    }
})

const notes=mongoose.model("Notes",noteSchema);
module.exports=notes