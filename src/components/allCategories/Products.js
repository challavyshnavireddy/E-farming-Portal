import React from 'react'
// import { useNavigate } from 'react-router-dom'
import ShowProducts from './ShowProducts'
import { Button } from 'react-bootstrap'
import { useContext ,useEffect,useState} from 'react'
import { loginContext } from '../../contexts/LoginContextProvider'
import axios from 'axios'

const Products = () => {

    let [products,setProducts]=useState();
    
    

    const getProductDetails=()=>{
        axios.get("http://localhost:3500/product-api/get-products")
        .then((response)=>{
            console.log(response.data)
            setProducts(response.data)
            // console.log("products response: ",products)
        }).catch((err)=>{
            console.log("error is :",err)
        })
    }
    // console.log(loginStatus)
    useEffect(()=>{
        getProductDetails();
        
    },[])
    
    //  const productsArray=products
   
     
       
  return (
    <div>
    

<div className="products">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products?.map((pObj,index) => (
          <div className="col text-center mx-auto" key={index}>
          <ShowProducts  pObj={pObj}/>
          </div>
        ))}


      </div>
   
    </div>
  
  </div>
)
  }

export default Products;