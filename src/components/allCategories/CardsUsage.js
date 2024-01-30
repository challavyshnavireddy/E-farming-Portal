import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { loginContext } from "../../contexts/LoginContextProvider";

const CardsUsage = () => {
  let { userState } = useContext(loginContext);
  let [pObj, setpObj] = useState([]);

  // console.log(userState)
  let getCartProducts = () => {
    axios
      .get("http://localhost:3500/cart-api/get-cart-products")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            let productId = response.data[i].prodId;
            if (response.data[i].userId === userState?._id) {
              console.log("found user: ",response.data[i].prodId);
              axios
                .get("http://localhost:3500/product-api/get-products")
                .then((res) => {
                  for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i]._id===productId)
                    {
                    console.log("found product")
                    setpObj(prev => [...prev , res.data[i]])
                    }else
                    {
                      console.log(res
                        .data[i]._id,productId)
                    }
                  }
                  // console.log(res)
                })
                .catch((err) => {
                  console.log("error: ", err);
                });
            }
          }
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
useEffect(() => {
    getCartProducts();
  }, []);
console.log(pObj)
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {pObj?.map((pObj,index) => (
          <div className="col text-center mx-auto" key={index}>
          <div className="card">
              <div className="card-body">
                <p className="display-5 name">Name: {pObj.name}</p>
                <p className="lead fs-4">Cost: {pObj.cost}</p>
                <p className="lead">Stock: {pObj.stock}</p>
                <p className="lead">productType: {pObj.productType}</p>
      <button>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
};

export default CardsUsage;
