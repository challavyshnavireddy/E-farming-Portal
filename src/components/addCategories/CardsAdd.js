import React from 'react'
import { Button } from 'react-bootstrap'
const CardsAdd = (props) => {
  return (
    <div>
         <div className='card h-100'>
                <div className='card-header text-center display-6'>
                    {props.c.title}
                </div>
                <div className='card-body'>
                    <img className='z' src={props.c.image} alt="" />  
                </div>
                
            </div>
           
        </div>
    
  )
}

export default CardsAdd