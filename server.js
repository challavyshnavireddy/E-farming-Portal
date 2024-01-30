const exp=require('express')
const app=exp();

// cors
let cors=require('cors')
app.use(cors())

// path
const path=require('path')
app.use(exp.static(path.join(__dirname,'./build')))

// connect with database
const mclient=require("mongodb").MongoClient;

mclient.connect("mongodb://127.0.0.1:27017").then((dbRef)=>{
 const dbObj=dbRef.db('farmers');
 const usersCollectionObj=dbObj.collection("usersCollection")
 const productsCollectionObj=dbObj.collection("productsCollection")
 const cartCollectionObj=dbObj.collection("cartCollection")
 app.set("usersCollectionObj",usersCollectionObj)
app.set("productsCollectionObj",productsCollectionObj)
app.set("cartCollectionObj",cartCollectionObj)
 console.log("database connection successful")
//  console.log(productsCollectionObj)
})
.catch(err=>console.log("error message is: ",err))

// setting paths 
const userApp=require('./APIs/usersApi')
app.use('/user-api',userApp)

const productApp=require("./APIs/productsApi")
app.use('/product-api',productApp)
// const vegetablesApp=require('./APIs/vegetablesApi')
// app.use('vegetable-api',vegetablesApp)

const cartApp=require("./APIs/cartApi")
app.use('/cart-api',cartApp)

app.use((err,request,response,next)=>{
response.send({message:err.message || 'An error occured'})
})
app.listen(3500,()=>{
    console.log("running... on port 3500")
})