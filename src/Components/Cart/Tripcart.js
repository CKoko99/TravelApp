import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
function Tripcart() {
  const planSelector = useSelector((state) => state.plan);
    console.log(planSelector.startDate)
    console.log(typeof(planSelector.startDate))
  const [selectedHotel, setSelectedHotel] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(false);
  const [selectedRental, setSelectedRental] = useState(false);
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
    days = planSelector.days
    setTripPrice(tripPriceCalculator(cityMulti, flightPrice, hotelPrice, rentalPrice, days))
    
  },[planSelector.flight, planSelector.rental, planSelector.hotel, planSelector.city, planSelector.days]);
  if(!planSelector.startDate){
    return <button>Click to Plan trip</button>
  }else if(isEmpty(planSelector.city)){
    return <>
    {planSelector.startDate}
    {planSelector.endDate}
    <button>Continue planning trip</button>
    </>
  }else if(isEmpty(planSelector.flight)){
    return <>
    {planSelector.startDate}
    {planSelector.endDate}
    {selectedCity.id && (
        <Pagecard
          desc={selectedCity.desc}
          rating={selectedCity.rating}
          title={selectedCity.title}
          img={selectedCity.imgs[0]}
        />
      )}
    <button>Continue planning trip</button>
    </>
  }else if(isEmpty(planSelector.hotel)){
    return <>
    {planSelector.startDate}
    {planSelector.endDate}
    {selectedCity.id && (
        <Pagecard
          desc={selectedCity.desc}
          rating={selectedCity.rating}
          title={selectedCity.title}
          img={selectedCity.imgs[0]}
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
    <button>Continue planning trip</button>
    </>
  }else{
    return (
    <>
    {planSelector.startDate}
    {planSelector.endDate}
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
      {selectedRental.id && (
        <Pagecard
          desc={selectedRental.desc}
          rating={selectedRental.rating}
          title={selectedRental.title}
          img={selectedRental.imgs[0]}
        />
      )}
      {!selectedRental.id && <button>Click to Add Rental Service</button>}
      {tripPrice}
    </>)
  }
}


export default Tripcart;
