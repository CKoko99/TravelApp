import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plancard from "../../Components/Ui/Cards/Plancard";
import Detailspage from "../../Components/Detailspage/Detailspage";
import { planActions } from "../../store/store";
import { useRouter } from "next/dist/client/router";
import classes from "./plan.module.css";

function Planflight() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const router = useRouter();

  const flights = useSelector((state) => state.flights.flightsList);
  const [selectedFlight, setSelectedFlight] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("StartDate")) {
      router.replace("/plan/city");
    }
  });
  function clicked(text) {
    setSelectedFlight(text);
  }
  function selectFlightHandler() {
    planDispatch(planActions.addFlight(selectedFlight));
    router.push("/plan/hotel");
  }
  const flightList = flights.map((item) => {
    return (
      <Plancard
        onClick={() => {
          clicked(item);
        }}
        desc={item.desc}
        rating={item.rating}
        title={item.title}
        img={item.imgs[0]}
      />
    );
  });
  return (
    <>
        <div className={classes.plan}>

      {selectedFlight && (<div className={classes.details}>
        <Detailspage
          desc={selectedFlight.desc}
          rating={selectedFlight.rating}
          title={selectedFlight.title}
          imgs={selectedFlight.imgs}
          planning={true}
        /></div>
      )}
      {selectedFlight && (
        <div className={classes["plan-button"]} onClick={selectFlightHandler}>Choose a Hotel</div>
      )}
            <div className={classes["plan-title"]}>Choose Your Airline</div>

      {flightList}
      </div>
    </>
  );
}

export default Planflight;
