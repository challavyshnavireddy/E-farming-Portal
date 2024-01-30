import React from 'react'

function CardsDemo(props) {
  return (
    <div style={{width:"400px",height:"300px"}} >
        
        <div className="card ">
            <img className='im' src="https://kpshopy.com/storage/app/blog/BeNpyZJ6ajc8qoTGWaD2zk9gw8lXq5yAMnhQdrBp.jpeg" alt="" />
            <div className="card-body">
                <h5>{props.card.head}</h5>
            <p>{props.card.body}</p>
            </div>
            </div>
  </div>
  )
}

export default CardsDemo