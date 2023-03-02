import React from "react";
import { useHistory } from "react-router-dom";
import "./LPage.css";

const LandingPage = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/Home");
  }
  return (
    <div class="container my-3 ">
      <div className="subContainer">
        <div className="buttonContainer" onClick={handleClick}>
          <span className="button">START </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
