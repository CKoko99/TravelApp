import Link from "next/Link";
import classes from "./Navbar.module.css";
function Navbar() {
  return (
    <>
      <div className={classes.Navbar}>
        <div className={classes["top-section"]}>
          <div className={classes["top-subsection"]}>
            <h1>Ck Trips</h1>
          </div>
          <div className={classes["top-subsection"]}>
            <h1>Search</h1>
            <Link href="/plannedtrip">
              <h1>Trip Details</h1>
            </Link>
            <Link href="/cart">
              <h1>Cart</h1>
            </Link>
          </div>
        </div>
        <div className={classes["bottom-section"]}>
          <div className={classes["bottom-item"]}>
            <Link href="/">Home</Link>
          </div>
          <div className={classes["bottom-item"]}>
            <Link href="/plan/city">Plan A Trip!</Link>
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
        </div>
      </div>
    </>
  );
}

export default Navbar;
