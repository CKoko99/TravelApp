import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagecard from "../Ui/Cards/Pagecard";
import { planActions } from "../../store/store";
import { useHistory } from "react-router";
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function Planhotel() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const history = useHistory();

  const hotels = useSelector((state) => state.hotels.hotelsList);
  const [selectedHotel, setSelectedHotel] = useState(false);
  useEffect(() => {
    if (isEmpty(planSelector.flight)) {
      console.log(planSelector.flight);
      history.replace("/plan/city");
    }
  });
  function clicked(text) {
    setSelectedHotel(text);
  }
  function selectHotelHandler() {
    planDispatch(planActions.addHotel(selectedHotel));
    history.push("/plan/rental");
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
        <button onClick={selectHotelHandler}>Choose a Hotel</button>
      )}
      {hotelList}
    </>
  );
}

export default Planhotel;
