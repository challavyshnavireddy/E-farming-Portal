const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
 const bcryptjs=require('bcryptjs')
 const jwt=require('jsonwebtoken')

// middleware, mainly for post request
userApp.use(exp.json());

userApp.post(
  "/create-user",
  expressAsyncHandler(async (request, response, next) => {
    console.log(request.body);
    // get the collection
    const usersCollectionObj = request.app.get("usersCollectionObj");
    const newUser = request.body;
    console.log("new user received: ", newUser);
    const userOfDB = await usersCollectionObj.findOne({ email: newUser.email });
    console.log(userOfDB);
    if (userOfDB !== null) {
      // 200 reading
      response.status(200).send({ message: "user already exits"});
    } else {
      // 201 post
      let hashPassword= await bcryptjs.hash(newUser.password,5)
      newUser.password=hashPassword
      await usersCollectionObj.insertOne(newUser);
      response.status(201).send({ message: "user created" });
    }
  })
);

// userApp.use(exp.json());
userApp.use(exp.json());

userApp.post("/login-user",expressAsyncHandler(async(request,response)=>{
  console.log(request.body)
  const usersCollectionObj = request.app.get("usersCollectionObj");
  const newUser = request.body;
  const userUsername=await usersCollectionObj.findOne({username:newUser.username})
  
  if(userUsername!==null)
  {
    let isValidPassword=await bcryptjs.compare(newUser.password,userUsername.password)
    if(isValidPassword===true)
    {
    // response.status(200).send({message:"logged in"})
    // jwt token
    console.log(userUsername)
    let jwtToken=jwt.sign({username:userUsername.username},'abcdef',{expiresIn:20})
    delete userUsername.password
    response.send({message:"logged in",token:jwtToken,user:userUsername})
    console.log(request.headers)
    }
    else
    {
      response.status(200).send({message:"incorrect password"})
    }
  }
  else{
    response.send({message:"invalid"})
  }
}))

module.exports = userApp;
