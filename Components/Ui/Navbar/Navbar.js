import Link from "next/Link";
import { useState } from "react";
import classes from "./Navbar.module.css";
function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  function closeModalHandler() {
    setModalOpen(false);
  }
  function openModalHandler() {
    setModalOpen(true);
  }
  let modal = <></>;
  if (modalOpen) {
    modal = (
      <>
        {" "}
        <div className={classes["modal"]}>
          <h1 className={classes["modal-exit"]} onClick={closeModalHandler}>
            X
          </h1>
          <div className={classes["bottom-section"]}>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/">Home</Link>
            </div>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/plan/city">Plan A Trip!</Link>
            </div>

            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/cities">Cities</Link>
            </div>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/flights">Flights</Link>
            </div>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/hotels">Hotels</Link>
            </div>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/rentals">Car Rentals</Link>
            </div>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/plannedtrip">Trip Details</Link>
            </div>
            <div onClick={closeModalHandler} className={classes["bottom-item"]}>
              <Link href="/cart">Cart</Link>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    modal = <></>;
  }
  return (
    <>
      <div className={classes.Navbar}>
        <div className={classes.desktop}>
          <div className={classes["top-section"]}>
            <div className={classes["top-subsection"]}>
              <h1>Ck Trips</h1>
            </div>
            <div className={classes["top-subsection"]}></div>
          </div>
          <div className={classes["bottom-section"]}>
            <div className={classes["bottom-item"]}>
              <Link href="/">Home</Link>
            </div>
            <div className={classes["bottom-item"]}>
              <Link href="/plan/city">Plan A Trip!</Link>
            </div>

            <div className={classes["bottom-item"]}>
              <Link href="/cities">Cities</Link>
            </div>
            <div className={classes["bottom-item"]}>
              <Link href="/flights">Flights</Link>
            </div>
            <div className={classes["bottom-item"]}>
              <Link href="/hotels">Hotels</Link>
            </div>
            <div className={classes["bottom-item"]}>
              <Link href="/rentals">Car Rentals</Link>
            </div>
            <div className={classes["bottom-item"]}>
              <Link href="/plannedtrip">Trip Details</Link>
            </div>
            <div className={classes["bottom-item"]}>
              <Link href="/cart">Cart</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["mobile"]}>
        <div className={classes["mobile-sections"]}>
        <img alt="home"
        className={classes["ham"]}
        src={"https://each-day-counts.web.app/static/media/home.78c6e013.svg"}
        />
        <img
          alt="ham"
          onClick={openModalHandler}
          className={classes["ham"]}
          src={"https://courtneykoko.com/static/media/ham.976b5194.png"}
        />
        </div>
        {modal}
      </div>
    </>
  );
}

export default Navbar;
