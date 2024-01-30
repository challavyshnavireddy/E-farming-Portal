import React from 'react'

import CardsDemo from "./CardsDemo";
function Home() {
    let card1 = {
        head: "E-Farming Portal",
        body: "Farm items ordering is a form of electronic commerce which allows consumers to directly buy foods from a seller over the internet using a web browser.",
      };
      let card2={
        head:"Customer Portal",
        body:"Farm items ordering is a form of electronic commerce which allows consumers to directly buy foods from a seller over the internet using a web browser"
      };
      let card3={
        head:"Customer Portal",
        body:"Farm items ordering is a form of electronic commerce which allows consumers to directly buy foods from a seller over the internet using a web browser"
      }
      return (
        <div>
          
          <div>
            <img
              className="s"
              src="https://i0.wp.com/explicitsuccess.com/wp-content/uploads/2019/09/farmer-1.jpg?fit=960%2C685&ssl=1"
              alt="nope"
            />
          </div>
          <div className="c container">
            <div className="row row-cols-sm-1 row-cols-md-2 row-cols-3">
            <CardsDemo card={card1} />
            <CardsDemo card={card2} />
            <CardsDemo card={card3} />
            </div>
          </div>
        </div>
      
  )
}

export default Home