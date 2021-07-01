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
function Planrental() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const router = useRouter();

  const rentals = useSelector((state) => state.rentals.rentalsList);
  const [selectedRental, setSelectedRental] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("HotelID")) {
      router.replace("/plan/city");
    }
  });
  function clicked(text) {
    if (selectedRental) {
      window.scrollTo(0, 100);
    } else {
      window.scroll(0, 0);
    }
    setSelectedRental(text);
  }
  function selectRentalHandler() {
    planDispatch(planActions.addRental(selectedRental));
    router.push("/cart");
  }
  const rentalList = rentals.map((item) => {
    return (
      <Plancard
        onClick={() => {
          clicked(item);
        }}
        type="rental"
        price={item.price}
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
      <div className={classes.plan}>
        {selectedRental && (
          <div className={classes.details}>
            <Detailspage
              type="rental"
              price={selectedRental.price * planSelector.city.price}
              desc={selectedRental.desc}
              planning={true}
              rating={selectedRental.rating}
              title={selectedRental.title}
              imgs={selectedRental.imgs}
            />
          </div>
        )}
        {selectedRental && (
          <div className={classes["plan-button"]} onClick={selectRentalHandler}>
            Finalize Trip Plans
          </div>
        )}
        <div className={classes["plan-title"]}>Choose Your Rental Service</div>
        {rentalList}
      </div>
    </>
  );
}

export default Planrental;
