import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
function Navbar() {
  return (
    <>
      <div className={classes.Navbar}>
        <div className={classes["top-section"]}>
          <div className={classes["top-subsection"]}>
            <h1>Trip Planner</h1>
          </div>
          <div className={classes["top-subsection"]}>
            <h1>Search</h1>
            <h1>Trip Details</h1>
          </div>
        </div>
        <div className={classes["bottom-section"]}>
          <div className={classes["bottom-item"]}>
            <Link to="/">Home</Link>
          </div>
          <div className={classes["bottom-item"]}>Plan A Trip!</div>
          <div className={classes["bottom-item"]}>Flights</div>
          <div className={classes["bottom-item"]}>Hotels</div>
          <div className={classes["bottom-item"]}>Car Rentals</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
