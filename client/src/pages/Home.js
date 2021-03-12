import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import BestSeller from "../components/home/BestSeller";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {

  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrival", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        New Arrivals
      </h4>

      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        Best Seller
      </h4>

      <BestSeller />
      <br/>
      <br/>
    </>
  );
};
export default Home;
