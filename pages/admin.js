import classes from "./Admin.module.css";
import { useState } from "react";
import { useRef } from "react";
import Detailspage from "../Components/Detailspage/Detailspage";
import { db } from "./_app";
import { useDispatch, useSelector } from "react-redux";
import {
  adminActions,
  cityActions,
  flightActions,
  hotelActions,
  rentalActions,
} from "../store/store";
import { useEffect } from "react";

function getRandomInt() {
  const min = 0;
  const max = 100000;
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function Admin() {
  const typeRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const descRef = useRef();
  const staffPickRef = useRef();
  const hotelDispatch = useDispatch(hotelActions);
  const cityDispatch = useDispatch(cityActions);
  const flightDispatch = useDispatch(flightActions);
  const rentalDispatch = useDispatch(rentalActions);
  const adminDispatch = useDispatch(adminActions);
  const cityList = useSelector((state) => state.cities.citiesList);
  const adminCities = useSelector((state) => state.admin.cityList);
  const [priceInput, setPriceInput] = useState(
    <>
      <label htmlFor="price">How Expensive?</label>
      <input
        ref={priceRef}
        type="range"
        step=".01"
        min=".5"
        max="3"
        className="slider"
        id="myRange"
      ></input>
    </>
  );
  useEffect(() => {
    adminDispatch(adminActions.fillCityList(cityList));
  }, [cityList, adminDispatch]);
  const [citySelector, setCitySelector] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [readyToPost, setReadyToPost] = useState(false);
  let readyToPostButton;
  const [itemData, setItemData] = useState({});
  const [previewItem, setPreviewItem] = useState("");
  function cityCheckedHandler(event) {
    adminDispatch(adminActions.markCity(event.target.id));
  }
  function typeSelectHandler(event) {
    if (typeRef.current.value === "Flight") {
      setPriceInput(
        <>
          <label htmlFor="price">Average Price Per Flight $</label>
          <input ref={priceRef} type="number" id="price" />
        </>
      );
      setCitySelector();
      return;
    }
    if (typeRef.current.value === "City") {
      setPriceInput(
        <>
          <label htmlFor="price">How Expensive?</label>
          <input
            ref={priceRef}
            type="range"
            step=".01"
            min=".5"
            max="3"
            className="slider"
            id="myRange"
          ></input>
        </>
      );
      setCitySelector();
      return;
    }
    if (typeRef.current.value === "Hotel") {
      setPriceInput(
        <>
          <label htmlFor="price">Average Price Per Day</label>
          <input ref={priceRef} type="number" id="price" />
        </>
      );
      const citiesToSelect = cityList.map((city) => {
        return (
          <>
            <input
              type="checkbox"
              id={city.title}
              name={city.title}
              onChange={cityCheckedHandler}
            />
            <label htmlFor={city.title}>{city.title}</label>{" "}
          </>
        );
      });
      setCitySelector(citiesToSelect);
    } else {
      setPriceInput(
        <>
          <label htmlFor="price">Average Price Per Day</label>
          <input ref={priceRef} type="number" id="price" />
        </>
      );
      setCitySelector();
    }
  }
  function onSubmitHandler(event) {
    event.preventDefault();
    if (titleRef.current.value.trim() === "") {
      setErrorMessage("Please Enter a valid Title");
      return;
    }
    if (priceRef.current.value.trim() === "") {
      setErrorMessage("Please Enter a valid Price");
      return;
    }
    if (imgRef.current.value.trim() === "") {
      setErrorMessage("Please Enter a valid Image");
      return;
    }
    if (descRef.current.value.trim() === "") {
      setErrorMessage("Please Enter a valid Description");
      return;
    }
    let staffBool = false;
    if (staffPickRef.current.value === "Yes") {
      staffBool = true;
    }
    const imgs = imgRef.current.value.split(" ");
    if (typeRef.current.value === "City") {
      setItemData({
        type: typeRef.current.value,
        title: titleRef.current.value,
        id: getRandomInt(),
        price: priceRef.current.value,
        rating: 0,
        staffPick: staffBool,
        imgs: imgs,
        desc: descRef.current.value,
      });
    }
    if (typeRef.current.value === "Flight") {
      setItemData({
        type: typeRef.current.value,
        title: titleRef.current.value,
        id: getRandomInt(),
        price: priceRef.current.value,
        rating: 0,
        staffPick: staffBool,
        imgs: imgs,
        desc: descRef.current.value,
      });
    }
    if (typeRef.current.value === "Rental") {
      setItemData({
        type: typeRef.current.value,
        title: titleRef.current.value,
        id: getRandomInt(),
        price: priceRef.current.value,
        rating: 0,
        staffPick: staffBool,
        imgs: imgs,
        desc: descRef.current.value,
      });
    }
    if (typeRef.current.value === "Hotel") {
      const markedCityList = adminCities.filter((city) => city.marked === true);
      const markedCityNames = [];
      markedCityList.forEach((city) => {
        markedCityNames.push(city.title);
      });
      setItemData({
        type: typeRef.current.value,
        title: titleRef.current.value,
        id: getRandomInt(),
        price: priceRef.current.value,
        rating: 0,
        staffPick: staffBool,
        imgs: imgs,
        desc: descRef.current.value,
        cities: markedCityNames,
      });
    }
    setPreviewItem(
      <Detailspage
        key={1}
        title={titleRef.current.value}
        desc={descRef.current.value}
        planning={true}
        imgs={imgs}
      />
    );
    setReadyToPost(true);
  }
  function resethtmlForm() {
    titleRef.current.value = "";
    priceRef.current.value = "";
    staffPickRef.current.value = "Yes";
    imgRef.current.value = "";
    descRef.current.value = "";
    setPreviewItem("");
    setSuccessMessage(itemData.title + " added Succesfully");
    setItemData({});
    setReadyToPost(false);
  }
  function submitToDb() {
    try {
      if (itemData.type === "City") {
        const Cities = [];
        db.collection("Cities")
          .add({
            title: itemData.title,
            id: itemData.id,
            price: itemData.price,
            rating: itemData.rating,
            staffpick: itemData.staffPick,
            imgs: itemData.imgs,
            desc: itemData.desc,
          })
          .then((res) => {
            resethtmlForm();
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
              });
          })
          .catch((error) => alert(error.message));
      }
      if (itemData.type === "Flight") {
        const Flights = [];
        db.collection("Flights")
          .add({
            title: itemData.title,
            id: itemData.id,
            price: itemData.price,
            rating: itemData.rating,
            staffpick: itemData.staffPick,
            imgs: itemData.imgs,
            desc: itemData.desc,
          })
          .then((res) => {
            resethtmlForm();
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
          })
          .catch((error) => alert(error.message));
      }
      if (itemData.type === "Rental") {
        const Rentals = [];
        db.collection("Rentals")
          .add({
            title: itemData.title,
            id: itemData.id,
            price: itemData.price,
            rating: itemData.rating,
            staffpick: itemData.staffPick,
            imgs: itemData.imgs,
            desc: itemData.desc,
          })
          .then((res) => {
            resethtmlForm();
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
          })
          .catch((error) => alert(error.message));
      }
      if (itemData.type === "Hotel") {
        const Hotels = [];
        db.collection("Hotels")
          .add({
            title: itemData.title,
            id: itemData.id,
            price: itemData.price,
            rating: itemData.rating,
            staffpick: itemData.staffPick,
            imgs: itemData.imgs,
            desc: itemData.desc,
            cities: itemData.cities,
          })
          .then((res) => {
            resethtmlForm();
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
          })
          .catch((error) => alert(error.message));
      }
    } catch (e) {
      setSuccessMessage(e);
    }
  }
  if (readyToPost) {
    readyToPostButton = <button onClick={submitToDb}>Submit to DB</button>;
  }
  return (
    <div className={classes.admin}>
      <div className={classes.title}>Insert a New Travel Form</div>
      {successMessage}
      <form autoComplete="off" className={classes.form}>
        <div className={classes["form-section"]}>
          <label htmlFor="type">Type</label>
          <select ref={typeRef} onChange={typeSelectHandler} name="Type">
            <option value="City">City</option>
            <option value="Flight">Flight</option>
            <option value="Hotel">Hotel</option>
            <option value="Rental">Car Rental</option>
          </select>
        </div>
        <div className={classes["form-section"]}>
          <label htmlFor="title">Title</label>
          <input ref={titleRef} type="text" id="title" label="Title" />
        </div>
        {citySelector}
        <div className={classes["form-section"]}>
          <label htmlFor="title">
            Insert Image Links (Seperated By Spaces)
          </label>
          <input
            autoComplete="off"
            ref={imgRef}
            type="text"
            id="imgs"
            label="Img Link"
          />
        </div>
        <div className={classes["form-section"]}>
          <label htmlFor="desc">Description</label>
          <input autoComplete="off" ref={descRef} type="text" id="desc" />
        </div>
        <div className={classes["form-section"]}>
          <label htmlFor="staffPick">Staff Pick?</label>
          <select ref={staffPickRef} name="staffPick">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={classes["form-section"]}>{priceInput}</div>
        {errorMessage}
        <button type="submit" onClick={onSubmitHandler}>
          Preview
        </button>
      </form>
      {previewItem}
      {readyToPostButton}
    </div>
  );
}

export default Admin;
