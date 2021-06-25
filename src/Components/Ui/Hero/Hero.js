import classes from "./Hero.module.css";
import hero from "./hero.jpeg";
import {useState } from "react";

import Datemodal from "../DateModal/DateModal";

function Hero() {

  const [showModal, setShowModal] = useState(false);

  function heroButtonClickHandler() {
    setShowModal(true);
  }
  return (
    <>
      <div className={classes.hero}>
        <div className={classes["hero-text"]}>
          <h1>Welcome to CK Trips</h1>
          <button
            onClick={heroButtonClickHandler}
            className={classes["hero-button"]}
          >
            Plan Your Next Adventure
          </button>
        </div>
        <img alt="hero" src={hero} />
      </div>
      {showModal && <Datemodal/>}
    </>
  );
}

export default Hero;
