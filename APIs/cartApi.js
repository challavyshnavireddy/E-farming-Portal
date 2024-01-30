/* {
    productId: _id of product collection
    no_of_times_added: number 

}

{
    _id : monobd_generates
    customerId : _id of customer collection
    products : []cart_object

} */
const exp = require("express");
const cartApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
cartApp.use(exp.json());

cartApp.post(
  "/add-to-cart",
  expressAsyncHandler(async (request, response) => {
    // console.log(request.body)
    // console.log(request.body.userState._id)
    // console.log(request.body.product._id)
    const cartCollectionObj = request.app.get("cartCollectionObj");
    await cartCollectionObj.insertOne({
      userId: request.body.userState._id,
      prodId: request.body.product._id,
      quantity: request.body.q,
    });
    response.send("done");
  })
);

cartApp.get(
  "/get-cart-products",
  expressAsyncHandler(async (request, response) => {
    const cartCollectionObj = request.app.get("cartCollectionObj");
    // TODO: Aggregate cart and customers and send the data.
    const result=await cartCollectionObj.aggregate([
        {
            $lookup:
            {
                from:"productsCollectionObj",
                localField:"prodId",
                foreignField:"_id",
                as:"joinedCollectionObj"
            }
        },
        {$unwind:"$joinedCollectionObj"},
        {
            $project:{
                // "message":"hello"
                "userId":1,
                "prodId":1,
                "quantity":1,
                "name":"$joinedCollectionObj.name",
                "cost":"$joinedCollectionObj.cost",
                "stock":"$joinedCollectionObj.stock",
                "productType":"$joinedCollectionObj.productType"
            }
        }
    ]).toArray();

    console.log("CART OBJECT AFTER JOINING: ",result);
    if (result.length === 0) {
        console.log("No matching records found.");
      }
    // console.log(joinedCollectionObj)
    // console.log(cartCollectionObj)
    let cursor = await cartCollectionObj.find();
    let cartObj = await cursor.toArray();
    
    response.status(200).json(cartObj);
    // console.log("done")
  })
);

module.exports = cartApp;
