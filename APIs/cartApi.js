const tokenMiddleware = require("./Middlewares/tokenMiddleware");
const exp = require("express");
const { ObjectId } = require('mongodb');
const cartApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
cartApp.use(exp.json());
const { MongoClient } = require("mongodb");





cartApp.delete(
  "/delete-products/:id",
  expressAsyncHandler(async (request, response) => {
    let cartCollectionObj = request.app.get("cartCollectionObj");
    const productId = new ObjectId(request.params.id);
    // let productId = request.params.id;
    await cartCollectionObj
      .deleteOne({ prodId: productId })
      .then((dbRes) => {
        response.status(200).send({ message: "product removed" });
      })
      .catch((err) => {
        console.log("error in user deletion", err);
        response.send({ message: "Error" });
      });
  })
);



cartApp.post(
  "/add-to-cart",
  expressAsyncHandler(async (request, response) => {
    try {
      const cartCollectionObj = request.app.get("cartCollectionObj");
      const productCollectionObj = request.app.get("productsCollectionObj");

      const productId = new ObjectId(request.body.product._id);

      // Find the product and check its current stock
      const product = await productCollectionObj.findOne({ _id: productId });

      if (!product) {
        throw new Error("Product not found");
      }
      // console.log("product stock :",product)
      // Calculate the new stock value
      var newStock = Number(product.stock) - Number(request.body.q);

      if (newStock == 0) {
        // aggregate error
      }

      // Update the product stock
      await productCollectionObj.updateOne(
        { _id: productId },
        { $set: { stock: newStock } }
      );

      // Insert into cart
      await cartCollectionObj.insertOne({
        userId: request.body.userState._id,
        prodId: productId,
        quantity: request.body.q,
      });

      response.send("done");
    } catch (error) {
      console.error(error);
      response.status(500).send("An error occurred");
    }
  })
);







cartApp.get(
  "/get-cart-products",
  expressAsyncHandler(async (request, response) => {
    // then store all those product id and the get the details of those product ids using productApp
    // for all the cart objects having same aparams userId as the cartCollectionObj userId
    let cartCollection = request.app.get("cartCollectionObj");
    try {
      const result = await cartCollection
        .aggregate([
          {
            $addFields: {
              // Convert prodId from string to ObjectId
              convertedProdId: { $toObjectId: "$prodId" },
            },
          },
          {
            $lookup: {
              from: "productsCollection",
              localField: "convertedProdId",
              foreignField: "_id",
              as: "joinedData",
            },
          },
          {
            $unwind: "$joinedData", // Flatten the joinedData array
          },
          {
            $project: {
              _id: 0, // Exclude the _id field from the output
              userId: 1,
              prodId: 1,
              quantity: 1,
              "joinedData.name": 1,
              "joinedData.cost": 1,
              "joinedData.stock": 1,
              "joinedData.productType": 1,
            },
          },
        ])
        .toArray();

      // console.log("RESULT IS:", result);
      response.send(result)
      // response.json(result);
    } catch (error) {
      console.error("Error fetching cart products:", error);
      response.status(500).send("Internal Server Error");
    }
  })
);

module.exports = cartApp;
