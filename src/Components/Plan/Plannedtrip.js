import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Pagecard from "../Ui/Cards/Pagecard";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function tripPriceCalculator(cityMulti,flightPrice, hotelPrice, rentalPrice, days){
    const var1 = cityMulti * flightPrice
    const var2 = hotelPrice *cityMulti
    const var3 = rentalPrice *cityMulti
    const var4 = (var2 + var3) * days
    const var5 = var4 + var1
    return var5.toFixed(2)
}
function Plannedtrip() {
  const history = useHistory()

  const planSelector = useSelector((state) => state.savedPlan);
  const [selectedHotel, setSelectedHotel] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(false);
  const [selectedRental, setSelectedRental] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(false);
  const [selectedDays, setSelectedDays] = useState(false);

  const[tripPrice, setTripPrice] = useState(0)
  //const useEffectDependancies = [planSelector.flight, planSelector.rental, planSelector.hotel, planSelector.city, flightPrice, rentalPrice, hotelPrice,cityMulti, days]
  useEffect(() => {
    let cityMulti = 0
    let hotelPrice = 0
    let rentalPrice = 0
    let flightPrice = 0
    let days = 0
    if (!isEmpty(planSelector.flight)) {
      setSelectedFlight(planSelector.flight);
        flightPrice = planSelector.flight.price
    }
    if (!isEmpty(planSelector.rental)) {
      setSelectedRental(planSelector.rental);
      rentalPrice = planSelector.rental.price
    }
    if (!isEmpty(planSelector.hotel)) {
      setSelectedHotel(planSelector.hotel);
      hotelPrice = planSelector.hotel.price
    }
    if (!isEmpty(planSelector.city)) {
      setSelectedCity(planSelector.city);
      cityMulti = planSelector.city.price
    }
    setSelectedDays(planSelector.days)
    setSelectedStartDate(planSelector.startDate)
    setSelectedEndDate(planSelector.endDate)
    setTripPrice(tripPriceCalculator(cityMulti, flightPrice, hotelPrice, rentalPrice, days))
    
  },[planSelector.flight, planSelector.rental, planSelector.hotel, planSelector.city, planSelector.days, planSelector.endDate, planSelector.startDate]);



  if(selectedDays <= 0){
    return <button onClick={()=>{history.push('/plan/city')}}>Click to Plan trip</button>
}else
  return (
    <>
    {selectedStartDate}
    {selectedEndDate}
      {selectedCity.id && (
        <Pagecard
          desc={selectedCity.desc}
          rating={selectedCity.rating}
          title={selectedCity.title}
          img={selectedCity.imgs[0]}
        />
      )}
      {selectedHotel && (
        <Pagecard
          desc={selectedHotel.desc}
          rating={selectedHotel.rating}
          title={selectedHotel.title}
          img={selectedHotel.imgs[0]}
        />
      )}
      {selectedFlight && (
        <Pagecard
          desc={selectedFlight.desc}
          rating={selectedFlight.rating}
          title={selectedFlight.title}
          img={selectedFlight.imgs[0]}
        />
      )}
      {selectedRental && (
        <Pagecard
          desc={selectedRental.desc}
          rating={selectedRental.rating}
          title={selectedRental.title}
          img={selectedRental.imgs[0]}
        />
      )}
      {tripPrice}
    </>
  );
}

export default Plannedtrip;
