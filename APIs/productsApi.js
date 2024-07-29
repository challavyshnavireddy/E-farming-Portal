const exp=require("express");
const productApp=exp.Router();
const expressAsyncHandler=require("express-async-handler")
const tokenMiddleware=require("./Middlewares/tokenMiddleware")



productApp.use(exp.json());
// productApp.use(tokenMiddleware)

productApp.post("/create-product",
expressAsyncHandler(async(request,response)=>{
    // console.log("created item")
    
    const productsCollectionObj = request.app.get("productsCollectionObj");
    const newProduct=request.body
    // console.log(newProduct)
    await productsCollectionObj.insertOne(newProduct);
    // const cursor = await productsCollectionObj.find()
    // const result=await cursor.toArray()
    response.send()
   
})
)
// const middleware=()=>{
//     console.log("middleware executed")
//     next();
//    }
   
// middleware()
productApp.put('/update-stock',
  expressAsyncHandler(async (request, response) => {
   console.log("put request result: ",request.body())
   response.send()
  })
);

productApp.get("/get-products",
expressAsyncHandler(async(request,response)=>{
    try{
        const productsCollectionObj = request.app.get("productsCollectionObj");
        const result = await productsCollectionObj.find({ stock: { $ne: 0 } }).toArray();
        console.log("get request result", result);
        response.status(200).send(result)
    //const result1=result.toArray()
    }
    catch(error){
        console.log(error)
    }
}))



module.exports = productApp;