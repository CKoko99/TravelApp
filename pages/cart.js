import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planActions, savedPlanActions } from "../store/store";
import Receiptcard from "../Components/Ui/Cards/Recieptcard";
import { useRouter } from "next/dist/client/router";
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
function Plandetails() {
  const router = useRouter();
  const savedPlanDispatch = useDispatch(savedPlanActions);
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const [selectedHotel, setSelectedHotel] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(false);
  const [selectedRental, setSelectedRental] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(false);
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
    setSelectedStartDate(planSelector.startDate);
    setSelectedEndDate(planSelector.endDate);
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

  function submitTripHandler() {
    planDispatch(savedPlanActions.addCity(selectedCity));
    planDispatch(savedPlanActions.addHotel(selectedHotel));
    planDispatch(savedPlanActions.addRental(selectedRental));
    planDispatch(savedPlanActions.addFlight(selectedFlight));
    planDispatch(savedPlanActions.setDays(selectedDays));
    planDispatch(savedPlanActions.setStartDate(selectedStartDate));
    planDispatch(savedPlanActions.setEndDate(selectedEndDate));
    planDispatch(planActions.saveTrip());
    savedPlanDispatch(savedPlanActions.setJustSaved(true));
    router.push("/");
  }

  if (
    isEmpty(planSelector.flight) ||
    isEmpty(planSelector.hotel) ||
    isEmpty(planSelector.city)
  ) {
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
          <div className={classes["cart-title"]}>Finalize Your Trip</div>
          <div className={classes["cart"]}>
            <div className={classes.sections}>
              <div className={classes.cards}>
                {selectedCity.id && (
                  <Receiptcard
                    type="city"
                    price={selectedCity.price}
                    id={selectedCity.id}
                    desc={selectedCity.desc}
                    rating={selectedCity.rating}
                    title={selectedCity.title}
                    img={selectedCity.imgs[0]}
                  />
                )}
                {selectedHotel && (
                  <Receiptcard
                    type="hotel"
                    price={(
                      selectedHotel.price * planSelector.city.price
                    ).toFixed(2)}
                    desc={selectedHotel.desc}
                    rating={selectedHotel.rating}
                    title={selectedHotel.title}
                    img={selectedHotel.imgs[0]}
                  />
                )}
                {selectedFlight && (
                  <Receiptcard
                    type="flight"
                    price={(
                      selectedFlight.price * planSelector.city.price
                    ).toFixed(2)}
                    desc={selectedFlight.desc}
                    rating={selectedFlight.rating}
                    title={selectedFlight.title}
                    img={selectedFlight.imgs[0]}
                  />
                )}
                {selectedRental && (
                  <Receiptcard
                    type="rental"
                    price={(
                      selectedRental.price * planSelector.city.price
                    ).toFixed(2)}
                    desc={selectedRental.desc}
                    rating={selectedRental.rating}
                    title={selectedRental.title}
                    img={selectedRental.imgs[0]}
                  />
                )}
              </div>
              <div className={classes.receipt}>
                <div className={classes["checkout-title"]}>Checkout</div>
                <div className={classes["price-sections"]}>
                  <div className={classes["price-section"]}>
                    Trip to {planSelector.city.title}
                  </div>
                  <div className={classes["price-section"]}>
                    {planSelector.startDate} To: {planSelector.endDate}
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
                        planSelector.city.price *
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
                  className={classes["submit-button"]}
                  onClick={submitTripHandler}
                >
                  Plan Trip
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Plandetails;
