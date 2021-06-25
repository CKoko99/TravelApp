import { Link } from "react-router-dom";
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
            <Link to="/plannedtrip">
            <h1>Trip Details</h1>
            </Link>
            <Link to="/cart"><h1>Cart</h1></Link>
          </div>
        </div>
        <div className={classes["bottom-section"]}>
          <div className={classes["bottom-item"]}>
            <Link to="/">Home</Link>
          </div>
          <Link to="/plan/city">
            <div className={classes["bottom-item"]}>Plan A Trip!</div>
          </Link>

          <Link to="/flights">
            <div className={classes["bottom-item"]}>Flights</div>
          </Link>
          <Link to="/hotels">
            <div className={classes["bottom-item"]}>Hotels</div>
          </Link>
          <Link to="/rentals">
            <div className={classes["bottom-item"]}>Car Rentals</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
