import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plannedcard from "../Components/Ui/Cards/Plannedcard";
import { savedPlanActions } from "../store/store";
import classes from "./plan/plan.module.css";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function tripPriceCalculator(
  cityMulti,
  flightPrice,
  hotelPrice,
  rentalPrice,
  days
) {
  const var1 = cityMulti * flightPrice;
  const var2 = hotelPrice * cityMulti;
  const var3 = rentalPrice * cityMulti;
  const var4 = (var2 + var3) * days;
  const var5 = var4 + var1;
  return var5.toFixed(2);
}
function Plannedtrip() {
  const router = useRouter();
  const savedPlanDispatch = useDispatch(savedPlanActions);
  const planSelector = useSelector((state) => state.savedPlan);
  const [selectedHotel, setSelectedHotel] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(false);
  const [selectedRental, setSelectedRental] = useState(false);
  const [selectedDays, setSelectedDays] = useState(false);

  const [tripPrice, setTripPrice] = useState(0);
  //const useEffectDependancies = [planSelector.flight, planSelector.rental, planSelector.hotel, planSelector.city, flightPrice, rentalPrice, hotelPrice,cityMulti, days]
  useEffect(() => {
    let cityMulti = 0;
    let hotelPrice = 0;
    let rentalPrice = 0;
    let flightPrice = 0;
    let days = planSelector.days;
    if (!isEmpty(planSelector.flight)) {
      setSelectedFlight(planSelector.flight);
      flightPrice = planSelector.flight.price;
    }
    if (!isEmpty(planSelector.rental)) {
      setSelectedRental(planSelector.rental);
      rentalPrice = planSelector.rental.price;
    }
    if (!isEmpty(planSelector.hotel)) {
      setSelectedHotel(planSelector.hotel);
      hotelPrice = planSelector.hotel.price;
    }
    if (!isEmpty(planSelector.city)) {
      setSelectedCity(planSelector.city);
      cityMulti = planSelector.city.price;
    }
    setSelectedDays(planSelector.days);
    setTripPrice(
      tripPriceCalculator(cityMulti, flightPrice, hotelPrice, rentalPrice, days)
    );
  }, [
    planSelector.flight,
    planSelector.rental,
    planSelector.hotel,
    planSelector.city,
    planSelector.days,
    planSelector.endDate,
    planSelector.startDate,
  ]);
  function cancelTripHandler() {
    savedPlanDispatch(savedPlanActions.setJustCancelled(true));
    savedPlanDispatch(savedPlanActions.cancel());
    router.push("/");
  }
  if (!selectedCity) {
    return (
      <div className={classes.spacing}>
        <div
          className={classes["plan-button"]}
          onClick={() => {
            router.push("/plan/city");
          }}
        >
          Click to Plan trip
        </div>
      </div>
    );
  } else
    return (
      <>
        <div className={classes.spacing}>
          <div className={classes["cart-title"]}>Planned Trip</div>
          <div className={classes["cart"]}>
            <div className={classes.sections}>
              <div className={classes.cards}>
                {selectedCity.id && (
                  <Plannedcard
                    type="city"
                    id={selectedCity.id}
                    price={selectedCity.price}
                    desc={selectedCity.desc}
                    rating={selectedCity.rating}
                    title={selectedCity.title}
                    img={selectedCity.imgs[0]}
                  />
                )}
                {selectedHotel && (
                  <Plannedcard
                    type="hotel"
                    id={selectedHotel.id}
                    price={(selectedHotel.price * selectedCity.price).toFixed(
                      2
                    )}
                    desc={selectedHotel.desc}
                    rating={selectedHotel.rating}
                    title={selectedHotel.title}
                    img={selectedHotel.imgs[0]}
                  />
                )}
                {selectedFlight && (
                  <Plannedcard
                    type="flight"
                    id={selectedFlight.id}
                    price={selectedFlight.price}
                    desc={selectedFlight.desc}
                    rating={selectedFlight.rating}
                    title={selectedFlight.title}
                    img={selectedFlight.imgs[0]}
                  />
                )}
                {selectedRental && (
                  <Plannedcard
                    type="rental"
                    id={selectedRental.id}
                    price={(
                      Number(selectedRental.price) * selectedCity.price
                    ).toFixed(2)}
                    desc={selectedRental.desc}
                    rating={selectedRental.rating}
                    title={selectedRental.title}
                    img={selectedRental.imgs[0]}
                  />
                )}
              </div>
              <div className={classes.receipt}>
                <div className={classes["checkout-title"]}>Trip Summary</div>
                <div className={classes["price-sections"]}>
                  <div className={classes["price-section"]}>
                    Trip to {planSelector.city.title}
                  </div>
                  <div className={classes["price-section"]}>
                    <div>{planSelector.startDate}</div>
                    <div>To:</div>
                    <div>{planSelector.endDate}</div>
                  </div>
                  {planSelector.days <= 1 && (
                    <div className={classes["price-section"]}>
                      {planSelector.days} day
                    </div>
                  )}
                  {planSelector.days > 1 && (
                    <div className={classes["price-section"]}>
                      {planSelector.days} days
                    </div>
                  )}
                  <div className={classes["price-section"]}>
                    <div>Price of Flight</div>
                    <div>
                      {" "}
                      $
                      {(selectedFlight.price * planSelector.city.price).toFixed(
                        2
                      )}
                    </div>
                  </div>
                  <div className={classes["price-section"]}>
                    <div>Total Hotel Price</div>
                    <div>
                      {" "}
                      $
                      {(
                        selectedHotel.price *
                        Number(planSelector.city.price) *
                        planSelector.days
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div className={classes["price-section"]}>
                    <div>Total Rental Price</div>
                    <div>
                      {" "}
                      $
                      {(
                        selectedRental.price *
                        planSelector.city.price *
                        planSelector.days
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div className={classes["price-section"]}>
                    <div>Total Trip Price</div>
                    <div>${tripPrice}</div>
                  </div>
                </div>
                <div
                  onClick={cancelTripHandler}
                  className={classes["submit-button"]}
                >
                  Cancel Trip
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Plannedtrip;
