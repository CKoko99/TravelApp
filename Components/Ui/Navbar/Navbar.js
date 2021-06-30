import Link from "next/Link";
import Image from "next/image";
import { useState } from "react";
import classes from "./Navbar.module.css";
import home from "./homeic.svg";
import ham from "./hamic.png";
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
          <div className={classes["section"]}>
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
              <Link href="/plannedtrip">Planned Trip</Link>
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
          <div className={classes["section"]}>
            <div className={classes["bottom-item"]}>
              <Link href="/">Ck Trips</Link>
            </div>
            <Link href="/plan/city">
              <div className={classes["bottom-item"]}>Plan A Trip!</div>
            </Link>

            <Link href="/cities">
              <div className={classes["bottom-item"]}>Cities</div>
            </Link>
            <Link href="/flights">
              <div className={classes["bottom-item"]}>Airlines</div>
            </Link>
            <Link href="/hotels">
              <div className={classes["bottom-item"]}>Hotels</div>
            </Link>
            <Link href="/rentals">
              <div className={classes["bottom-item"]}>Rental Services</div>
            </Link>
            <Link href="/plannedtrip">
              <div className={classes["bottom-item"]}>Planned Trips</div>
            </Link>
            <Link href="/cart">
              <div className={classes["bottom-item"]}>Cart</div>
            </Link>
          </div>
        </div>
      </div>
      <div className={classes["mobile"]}>
        <div className={classes["mobile-sections"]}>
          <Link href="/">
            <div className={classes.evildiv}>
              <Image
                layout="fill"
                alt="home"
                className={classes["ham"]}
                src={home}
              />
            </div>
          </Link>
          <div className={classes.evildiv}>
            <Image
              layout="fill"
              alt="ham"
              onClick={openModalHandler}
              className={classes["ham"]}
              src={ham}
            />
          </div>
        </div>
        {modal}
      </div>
    </>
  );
}

export default Navbar;
