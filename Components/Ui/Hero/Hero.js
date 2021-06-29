import Image from 'next/image'
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
          <h1>Turn Your Adventurous Dreams to Reality</h1>
        </div>
          <input className={classes.search} placeholder="Search..."/>
      </div>
      {showModal && <Datemodal/>}
    </>
  );
}

export default Hero;
