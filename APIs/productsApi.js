const exp=require("express");
const productApp=exp.Router();
const expressAsyncHandler=require("express-async-handler")

productApp.use(exp.json());

productApp.post("/create-product",
expressAsyncHandler(async(request,response)=>{
    // console.log("created item")
    // console.log(request.body)
    
    const productsCollectionObj = request.app.get("productsCollectionObj");
    const newProduct=request.body
    console.log(newProduct)
    await productsCollectionObj.insertOne(newProduct);
    // const cursor = await productsCollectionObj.find()
    // const result=await cursor.toArray()
    response.send()
   
})
)

productApp.get("/get-products",
expressAsyncHandler(async(request,response)=>{
    try{
    const productsCollectionObj=request.app.get("productsCollectionObj");
    const cursor = await productsCollectionObj.find()
    const result=await cursor.toArray()
    //  console.log("result",json(result))
    //const result1=result.toArray()
    response.status(200).json(result)
    }
    catch(error){
        console.log(error)
    }
}))

module.exports = productApp;