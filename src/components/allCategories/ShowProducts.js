import React from "react";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../contexts/LoginContextProvider";

const ShowProducts = (props) => {
  let navigate = useNavigate();
  const { userState } = useContext(loginContext);
  let [q, setQ] = useState(0);
  let decrease = () => {
    if (q > 0) {
      setQ(q - 1);
    }
  };
  let increase = () => {
    setQ(q + 1);
  };

  const settingCart = (product) => {
  
    console.log(product, q, userState);
    axios
      .post("http://localhost:3500/cart-api/add-to-cart", { product, q,userState })
      .then((response) => {
          console.log("response is that:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response) {
            console.error("Server responded with:", error.response.data);
          }
        });
        navigate("/AddToCart")
    };
  
  

  return (
    <div>
      <div className="card">
        {/* {console.log(props.pObj)} */}
        <div className="card-body">
          <p className="display-5 name">Name: {props.pObj.name}</p>
          <p className="lead fs-4">Cost: {props.pObj.cost}</p>
          <p className="lead">Stock: {props.pObj.stock}</p>
          {/* {q>props.pObj.stock ?( <p>Stock Exceeded..!!</p>) : ( <div className='col-4'><Button className='btn-secondary' onClick={()=>increase(props.pObj,q,userState)}>+</Button></div>   )}
                <div className='row m-auto'>
                <div className='col-4'><Button className='btn-secondary' onClick={()=>decrease(props.pObj,q)}  >-</Button></div>
                    <div className='col-4'>{q}</div>
                    
                    </div>  */}
          <div className="row m-auto">
            {q > props.pObj.stock ? (
              <>
                <div className="col-12 text-center">
                  <p>Stock Exceeded..!!</p>
                </div>
                <div className="col-4 offset-4">
                  <Button
                    className="btn-secondary"
                    onClick={() => decrease(props.pObj, q)}
                  >
                    -
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="col-4">
                  <Button
                    className="btn-secondary"
                    onClick={ decrease
                    }
                  >
                    -
                  </Button>
                </div>
                <div className="col-4 text-center">{q}</div>
                <div className="col-4">
                  <Button
                    className="btn-secondary"
                    onClick={ increase}
                  >
                    +
                  </Button>
                </div>
              </>
            )}
          </div>

          <p className="lead">productType: {props.pObj.productType}</p>

          <button onClick={() => settingCart(props.pObj)}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;

