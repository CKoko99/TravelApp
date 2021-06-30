import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagecard from "../Ui/Cards/Pagecard";
import { planActions } from "../../store/store";
import { useHistory } from "react-router";
function Planflight() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const history = useHistory();

  const flights = useSelector((state) => state.flights.flightsList);
  const [selectedFlight, setSelectedFlight] = useState(false);

  useEffect(() => {
    if (planSelector.startDate === null || planSelector.endDate === null) {
      console.log("yop");
      history.replace("/plan/city");
    }
  });
  function clicked(text) {
    setSelectedFlight(text);
  }
  function selectFlightHandler() {
    planDispatch(planActions.addFlight(selectedFlight));
    history.push("/plan/hotel");
  }
  const flightList = flights.map((item) => {
    return (
      <Pagecard
        onClick={() => {
          clicked(item);
        }}
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
      {selectedFlight && (
        <Pagecard
          desc={selectedFlight.desc}
          rating={selectedFlight.rating}
          title={selectedFlight.title}
          img={selectedFlight.imgs[0]}
        />
      )}
      {selectedFlight && (
        <button onClick={selectFlightHandler}>Choose a Hotel</button>
      )}
      {flightList}
    </>
  );
}

export default Planflight;
