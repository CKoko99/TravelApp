import Footer from "../Ui/Footer/Footer";
import Navbar from "../Ui/Navbar/Navbar";
import { db } from "../../pages/_app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminActions,
  cityActions,
  flightActions,
  hotelActions,
  planActions,
  rentalActions,
  savedPlanActions,
} from "../../store/store";

function Layout(props) {
  const flightDispatch = useDispatch(flightActions);
  const rentalDispatch = useDispatch(rentalActions);
  const cityDispatch = useDispatch(cityActions);
  const adminDispatch = useDispatch(adminActions);
  const hotelDispatch = useDispatch(hotelActions);
  const planDispatch = useDispatch(planActions);
  const savedPlanDispatch = useDispatch(savedPlanActions);
  const cityList = useSelector((state) => state.cities.citiesList);
  const hotelList = useSelector((state) => state.hotels.hotelsList);
  const flightList = useSelector((state) => state.flights.flightsList);
  const rentalList = useSelector((state) => state.rentals.rentalsList);
  useEffect(() => {
    const Cities = [];
    const Hotels = [];
    const Flights = [];
    const Rentals = [];
    db.collection("Cities")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const city = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Cities.push(city);
        });
        cityDispatch(cityActions.updateFromDb(Cities));
        adminDispatch(adminActions.fillCityList(Cities));
      });
    db.collection("Flights")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const flight = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Flights.push(flight);
        });
        flightDispatch(flightActions.updateFromDb(Flights));
      });
    db.collection("Rentals")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const rental = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Rentals.push(rental);
        });
        rentalDispatch(rentalActions.updateFromDb(Rentals));
      });
    db.collection("Hotels")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const Hotel = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
            cities: doc.data().cities,
          };
          Hotels.push(Hotel);
        });
        hotelDispatch(hotelActions.updateFromDb(Hotels));
      });
  }, [
    adminDispatch,
    cityDispatch,
    flightDispatch,
    hotelDispatch,
    rentalDispatch,
  ]);
  useEffect(() => {
    if (cityList.length > 0) {
      setTimeout(() => {
        var Cityid = Number(localStorage.getItem("CityID"));
        var savedCityid = Number(localStorage.getItem("SavedCityID"));
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].id === Cityid) {
            planDispatch(planActions.addCity(cityList[i]));
          }
          if (cityList[i].id === savedCityid) {
            savedPlanDispatch(savedPlanActions.addCity(cityList[i]));
          }
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [cityList.length]);
  useEffect(() => {
    if (rentalList.length > 0) {
      setTimeout(() => {
        var RentalID = Number(localStorage.getItem("RentalID"));
        var savedRentalID = Number(localStorage.getItem("SavedRentalID"));
        for (let i = 0; i < rentalList.length; i++) {
          if (rentalList[i].id === RentalID) {
            planDispatch(planActions.addRental(rentalList[i]));
          }
          if (rentalList[i].id === savedRentalID) {
            savedPlanDispatch(savedPlanActions.addRental(rentalList[i]));
          }
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [rentalList.length]);
  useEffect(() => {
    if (hotelList.length > 0) {
      setTimeout(() => {
        var HotelID = Number(localStorage.getItem("HotelID"));
        var SavedHotelID = Number(localStorage.getItem("SavedHotelID"));
        for (let i = 0; i < hotelList.length; i++) {
          if (hotelList[i].id === HotelID) {
            planDispatch(planActions.addHotel(hotelList[i]));
          }
          if (hotelList[i].id === SavedHotelID) {
            savedPlanDispatch(savedPlanActions.addHotel(hotelList[i]));
          }
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [hotelList.length]);
  useEffect(() => {
    if (flightList.length > 0) {
      setTimeout(() => {
        var FlightID = Number(localStorage.getItem("FlightID"));
        var SavedFlightID = Number(localStorage.getItem("SavedFlightID"));
        for (let i = 0; i < flightList.length; i++) {
          if (flightList[i].id === FlightID) {
            planDispatch(planActions.addFlight(flightList[i]));
          }
          if (flightList[i].id === SavedFlightID) {
            savedPlanDispatch(savedPlanActions.addFlight(flightList[i]));
          }
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [flightList.length]);
  useEffect(() => {
    var Days = Number(localStorage.getItem("Days"));
    var startDate = String(localStorage.getItem("StartDate"));
    var endDate = String(localStorage.getItem("EndDate"));
    var SavedDays = Number(localStorage.getItem("SavedDays"));
    var SavedstartDate = String(localStorage.getItem("SavedStartDate"));
    var SavedendDate = String(localStorage.getItem("SavedEndDate"));
    planDispatch(planActions.setDays(Number(Days)));
    planDispatch(planActions.setStartDate(startDate));
    planDispatch(planActions.setEndDate(endDate));
    savedPlanDispatch(savedPlanActions.setDays(Number(SavedDays)));
    savedPlanDispatch(savedPlanActions.setStartDate(SavedstartDate));
    savedPlanDispatch(savedPlanActions.setEndDate(SavedendDate));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
