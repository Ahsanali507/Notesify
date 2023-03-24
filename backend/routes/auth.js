const express=require('express');
const{body,validationResult}=require('express-validator');
const Users=require('../models/Users');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_SECRET="ahsan is a good boy";

//Router 1: post request to create user with directory=/api/auth/createuser , no login require here
router.post('/createuser',[
  // create user and its validations
  body('name',"Enter valid name").isLength({min:3}),
  body('email',"Enter valid email").isEmail(),
  body('password',"Password must be atleast 8 characters").isLength({min:8}),
  body('cpassword',"cPassword must be atleast 8 characters").isLength({min:8}),
], async (req, res) => {
  // check if errors then return status and those errors
  const errors=validationResult(req);
  let typeSuccess="";
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  // check if user with same email already exists then return error
  try{
    let user=await Users.findOne({email:req.body.email});
    let success=false;
    if(user){
      success=false;
      typeSuccess="alreadyexists";
      //console.log("Email already exists");
      return res.status(400).json({typeSuccess,success,error:"User already exists with this email"});
    }

    if(req.body.password==req.body.cpassword){
      const salt=await bcrypt.genSalt(10);
      const secretPassword=await bcrypt.hash(req.body.password,salt);
      const secretconfirmPassword=await bcrypt.hash(req.body.cpassword,salt);
      user=await Users.create({  // create user
        name:req.body.name,
        email:req.body.email,
        password:secretPassword,
        cpassword:secretconfirmPassword
      })
        
        const data={
          user:{
            id:user.id
          }
        }
        success=true;
        typeSuccess="accountcreated";
        const authenToken=jwt.sign(data,JWT_SECRET);
        res.json({typeSuccess,success,authenToken});
    }
    else{
      success=false;
      typeSuccess="passwordsnotmatch";
      res.json({typeSuccess,success});
    }
  }
  catch(error){
    success=false;
    res.send(error.message);   // if any other error occur then send res as error
  }
  
})



//Router 2: post request to login user with directory=/api/auth/login , login require here
router.post('/login',[
  // user validations
  body('email',"Enter valid email").isEmail(),
  body('password',"Password must be atleast 8 characters").isLength({min:8}),
], async (req, res) => {
  // check if errors then return status and those errors
  const errors=validationResult(req);
  let success=false;
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  const {email,password}=req.body;   // email and password from body means that user enter
  try{
    // check if user with same email not exists then return error
    let userwiththisemail=await Users.findOne({email});
    let uName=userwiththisemail.name;
    if(!userwiththisemail){
      success=false;
      return res.status(400).json({success,error:"Invalid email or password"});
    }

    let passwordComp=await bcrypt.compare(password,userwiththisemail.password);
    if(!passwordComp){
      let success=false;
      return res.status(400).json({success,error:"Invalid email or password"});
    }        
        
        const data={
          userwiththisemail:{
            id:userwiththisemail.id
          }
        }
        const authenToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authenToken,uName});
        //console.log("login successfully");
  }
  catch(error){
    success=false;
    res.send(error.message);   // if any other error occur then send res as error
  }
  
})



//Router 3: get request to get loggedin user details with directory=/api/auth/getuser , login require here
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    const userId=req.user.id;
    //const userId="63cfdefbca07236678fbe2be";
    const user=await Users.findById(userId).select('-password');
    res.send(user);
  }
  catch (error) {
    res.send(error.message);   // if any other error occur then send res as error
  }

})


module.exports=router