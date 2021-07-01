import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plancard from "../../Components/Ui/Cards/Plancard";
import Detailspage from "../../Components/Detailspage/Detailspage";
import { planActions } from "../../store/store";
import { useRouter } from "next/dist/client/router";
import classes from "./plan.module.css";

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
    if (selectedHotel) {
      window.scrollTo(0, 100);
    } else {
      window.scroll(0, 0);
    }
    setSelectedHotel(text);
  }
  function selectHotelHandler() {
    planDispatch(planActions.addHotel(selectedHotel));
    router.push("/plan/rental");
  }
  const hotelList = hotels.map((item) => {
    if (item.cities.includes(planSelector.city.title)) {
      return (
        <Plancard
          onClick={() => {
            clicked(item);
          }}
          type="hotel"
          price={item.price}
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
      <div className={classes.plan}>
        {selectedHotel && (
          <div className={classes.details}>
            <Detailspage
              type="hotel"
              price={(selectedHotel.price * planSelector.city.price).toFixed(2)}
              desc={selectedHotel.desc}
              rating={selectedHotel.rating}
              title={selectedHotel.title}
              imgs={selectedHotel.imgs}
              planning={true}
            />
          </div>
        )}
        {selectedHotel && (
          <div className={classes["plan-button"]} onClick={selectHotelHandler}>
            Continue to Rental Service
          </div>
        )}
        <div className={classes["plan-title"]}>Choose Your Hotel</div>
        {hotelList}
      </div>
    </>
  );
}

export default Planhotel;
