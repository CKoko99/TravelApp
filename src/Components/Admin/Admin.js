import classes from "./Admin.module.css";
import { useState } from "react";
import { useRef } from "react";
import HomeItem from "../Home/HomeItem";

function Admin() {
  const typeRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const descRef = useRef();
  const staffPickRef = useRef();
  const [priceInput, setPriceInput] = useState(
    <>
      <label for="price">Price Per Day $</label>
      <input ref={priceRef} type="number" id="price" />
    </>
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [previewItem, setPreviewItem] = useState();
  function typeSelectHandler(event) {
    if (typeRef.current.value === "Flight") {
      setPriceInput(
        <>
          <label for="price">Price Per Flight $</label>
          <input ref={priceRef} type="number" id="price" />
        </>
      );
    } else {
      setPriceInput(
        <>
          <label for="price">Price Per Day</label>
          <input ref={priceRef} type="number" id="price" />
        </>
      );
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
    const imgs = imgRef.current.value.split(" ");
    console.log(imgs);
    setPreviewItem(
      <HomeItem
        rating={"New Listing"}
        title={titleRef.current.value}
        img={imgs[0]}
      />
    );
  }
  return (
    <div className={classes.admin}>
      <div className={classes.title}>Insert a New Travel Form</div>
      <form autoComplete="off" className={classes.form}>
        <div className={classes["form-section"]}>
          <label for="type">Type</label>
          <select ref={typeRef} onChange={typeSelectHandler} name="Type">
            <option value="City">City</option>
            <option value="Flight">Flight</option>
            <option value="Hotel">Hotel</option>
            <option value="Rental">Car Rental</option>
          </select>
        </div>
        <div className={classes["form-section"]}>
          <label for="title">Title</label>
          <input ref={titleRef} type="text" id="title" label="Title" />
        </div>
        <div className={classes["form-section"]}>
          <label for="title">Insert Image Links (Seperated By Spaces)</label>
          <input autoComplete="off" ref={imgRef} type="text" id="imgs" label="Img Link" />
        </div>
        <div className={classes["form-section"]}>
          <label for="desc">Description</label>
          <input autoComplete="off" ref={descRef} type="text" id="desc" />
        </div>
        <div className={classes["form-section"]}>
            <label for="staffPick">Staff Pick?</label>
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
    </div>
  );
}

export default Admin;
