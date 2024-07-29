const jwt=require("jsonwebtoken")

const tokenMiddleware=(req,res,next)=>{
//  console.log("Middleware executed")
// console.log("HEELO MIDDLEWARE I'M")
//  console.log("REQUEST IS : ",req.headers.authorization)
  const bearerToken=req.headers.authorization;
  if(!bearerToken){
    return res.status(401).json({ message: "Unauthorized access, login first" });
  }
  else{
    const token=bearerToken.split(" ")[1]
    console.log(token)
    try{
        const f= jwt.verify(token,'abcdef')
        // console.log(f)
        next()
    }
    catch(err){
        // 
        console.log("err:",err.message)
        return res.status(401).json({ message: "Invalid token" });
    }
  }

}

module.exports=tokenMiddleware;

