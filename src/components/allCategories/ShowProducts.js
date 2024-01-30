import React, { Children } from "react";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { loginContext } from "../../contexts/LoginContextProvider";

const ShowProducts = (props) => {

console.log(props);
  const { userState } = useContext(loginContext);
  let [q, setQ] = useState(1);
  let decrease = () => {
    if (q > 1) {
      setQ(q - 1);
    }
  };
  let increase = () => {
    setQ(q + 1);
  };

  const settingCart = (product,q) => {
    axios
      .post(
        "http://localhost:3500/cart-api/add-to-cart",
        {product,q,userState}
      )
      .then((response) => {
        console.log("response  :",response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
        
            <div className="card">
              <div className="card-body">
                <p className="display-5 name">Name: {props.pObj.name}</p>
                <p className="lead fs-4">Cost: {props.pObj.cost}</p>
                <p className="lead">Stock: {props.pObj.stock}</p>
                {q>props.pObj.stock && <p>Stock Exceeded..!!</p>}
                <div className='row m-auto'>
                    <div className='col-4'><Button className='btn-secondary' onClick={decrease}  >-</Button></div>
                    <div className='col-4'>{q}</div>
                    <div className='col-4'><Button className='btn-secondary' onClick={increase}>+</Button></div>
                    </div> 
                <p className="lead">productType: {props.pObj.productType}</p>
                
      <button
                onClick={()=>settingCart(props.pObj,q)}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        
   
  );
};

export default ShowProducts;
