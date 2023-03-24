const jwt=require('jsonwebtoken');
const JWT_SECRET="ahsan is a good boy";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    //console.log(token);
    if(!token){
        res.status(401).send({error:"Token not found"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        //console.log(data);
        req.user=data.userwiththisemail;
        //console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({error:"Please use a valid token"});
    }
}


module.exports=fetchuser;