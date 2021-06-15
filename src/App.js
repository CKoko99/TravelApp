import { BrowserRouter, Route, Switch } from "react-router-dom";
import { db } from "./index";
import "./App.css";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Footer from "./Components/Ui/Footer/Footer";
import Hero from "./Components/Ui/Hero/Hero";
import Navbar from "./Components/Ui/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminActions, cityActions, flightActions, hotelActions, rentalActions } from "./store/store";
function App() {
  const Cities = [];
  const Hotels = [];
  const Flights = [];
  const Rentals = [];
  const flightDispatch = useDispatch(flightActions);
  const rentalDispatch = useDispatch(rentalActions);
  const cityDispatch = useDispatch(cityActions);
  const adminDispatch = useDispatch(adminActions);
  const hotelDispatch = useDispatch(hotelActions);
  useEffect(() => {
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
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Hero />
            <Home />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
