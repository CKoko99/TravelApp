import classes from "./pages.module.css";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Flights() {
  const flights = useSelector((state) => state.flights.flightsList);
  console.log(flights);
  const flightList = flights.map((item) => {
    return (
      <Pagecard
        type="flight"
        price={item.price.toFixed(2)}
        id={item.id}
        key={item.id}
        desc={item.desc}
        rating={item.rating}
        title={item.title}
        img={item.imgs[0]}
      />
    );
  });
  return (
    <>
      <div className={classes["page-list"]}>
        <div className={classes.title}>Airlines</div>
        {flightList}
      </div>
    </>
  );
}

export default Flights;
