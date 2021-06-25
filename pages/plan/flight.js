import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagecard from "../../Components/Ui/Cards/Pagecard";
import { planActions } from "../../store/store";
import { useRouter } from "next/dist/client/router";
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
      <Pagecard
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
