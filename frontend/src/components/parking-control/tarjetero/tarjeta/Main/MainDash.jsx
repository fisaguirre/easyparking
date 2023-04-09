import React from "react";
import Cards from "../Cards/Cards";
import "./MainDash.css";

const MainDash = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <div className="MainDash">
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default MainDash;
