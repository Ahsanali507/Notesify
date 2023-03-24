const mongoose=require('mongoose');
const mongooseUrl="mongodb://localhost:27017/myNoteBooks";
const connectMongo=()=>{
    mongoose.connect(mongooseUrl,()=>{
        console.log("Connected to mongoose successfully");
    })
}

module.exports=connectMongo;