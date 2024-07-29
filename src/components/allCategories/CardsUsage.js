import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { loginContext } from "../../contexts/LoginContextProvider";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './CardsUsage.css'


const CardsUsage = () => {
  let { userState } = useContext(loginContext);
  // console.log(userState._id)
  let [pObj, setpObj] = useState([]);
//  const userId=userState._id

 let getCartProducts = () => {
  axios.get("http://localhost:3500/cart-api/get-cart-products")
    .then((res) => {
      const values = res.data.filter(item=>item.userId===userState._id).map(item => item);
      setpObj(values);
      console.log(values)
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};


  //delete 
  let deleteProduct=(pObjID)=>{
    axios.delete(`http://localhost:3500/cart-api/delete-products/${pObjID}`)
    .then((response)=>{
      console.log(pObjID)
      if(response.status===200)
      console.log(response.data.message)
      console.log("deleted")
     
      getCartProducts();
    })
    .catch((error)=>{
      console.log("error is : ",error)
    })
    // console.log("deleting")
  }
  // console.log(pObj)
 
  useEffect(()=>{
    deleteProduct();
  },[])
useEffect(() => {
    getCartProducts();
  },[]);

  return (
    <div>

{pObj.length===0?
(
  <h2>EMPTY CART </h2>
)
      :(<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        
       {pObj.map((pObj,index) => (
          <div className="col text-center mx-auto" key={index}>
          <div className="card">
              <div className="card-body">
                <div> < IoMdCloseCircleOutline className="icon-large" onClick={()=>deleteProduct(pObj.prodId)}/> </div>
                <p className="display-5 name">Name: {pObj.joinedData.name}</p>
                <p className="lead fs-4">Total Cost: {(pObj.joinedData.cost)*(pObj.quantity)} rupees</p>
                <p className="lead">quantity: {pObj.quantity}</p>
                <p className="lead">productType: {pObj.joinedData.productType}</p>
      <button>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ))}


      </div>
      )}
    </div>
  );
};

export default CardsUsage;
