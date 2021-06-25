import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagecard from "../../Components/Ui/Cards/Pagecard";
import { planActions } from "../../store/store";
import { useRouter } from "next/dist/client/router";
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function Planhotel() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const router = useRouter();

  const hotels = useSelector((state) => state.hotels.hotelsList);
  const [selectedHotel, setSelectedHotel] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("FlightID")) {
      console.log(planSelector.flight);
      router.replace("/plan/flight");
    }
  });
  function clicked(text) {
    setSelectedHotel(text);
  }
  function selectHotelHandler() {
    planDispatch(planActions.addHotel(selectedHotel));
    router.push("/plan/rental");
  }
  const hotelList = hotels.map((item) => {
    if (item.cities.includes(planSelector.city.title)) {
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
    } else {
      return <></>;
    }
  });
  return (
    <>
      {selectedHotel && (
        <Pagecard
          desc={selectedHotel.desc}
          rating={selectedHotel.rating}
          title={selectedHotel.title}
          img={selectedHotel.imgs[0]}
        />
      )}
      {selectedHotel && (
        <button onClick={selectHotelHandler}>Choose a Rental Service</button>
      )}
      {hotelList}
    </>
  );
}

export default Planhotel;
