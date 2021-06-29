import classes from "./DateModal.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { planActions } from "../../../store/store";
import { useRouter } from "next/dist/client/router";

function returnDate(year, month, date) {
  let newDate = date;
  if (date <= 9) {
    newDate = "0" + date;
  }
  let newMonth = month + 1;
  if (newMonth <= 9) {
    newMonth = "0" + newMonth;
  }
  return year + "-" + newMonth + "-" + newDate;
}
let first = true
function Datemodal(props) {
  const router = useRouter();
  const planDispatch = useDispatch(planActions);
  const planSelector = useSelector((state) => state.plan);
  const [showSelect, setShowSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const backgroundRef = useRef()
  useEffect(() => {
    setTimeout(()=>{
      if(first){
        first = false
        if (planSelector.days <= 0) {
          setShowSelect(true);
        } else {
        setShowModal(true)
        setShowSelect(false);
      }}
    }, 1000)
  }, [planSelector.days]);
  function displayModalHandler() {
    setShowModal(!showModal);
  }
  function backgroundClicked(e){
    if(backgroundRef.current === e.target){
      setShowModal(false)
    }
  }
  function displaySelectModalHandler() {
    setShowModal(true);
    setShowSelect(true)
  }
  function setShowSelectHandler() {
    setShowSelect(true);
    setShowModal(true)
  }
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate() + 2);
  const startDateValue = returnDate(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endDateValue = returnDate(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  const [inputStartDate, setInputStartDate] = useState(startDateValue);
  const [inputEndDate, setInputEndDate] = useState(endDateValue);
  const [validDates, setValidDates] = useState(true);
  const startRef = useRef();
  const endRef = useRef();
  function validateDates(date1, date2) {
    console.log(date1);
    console.log(date2);
    if (date2 - date1 > 0) {
      setValidDates(true);
    } else {
      setValidDates(false);
    }
  }
  function startDateChangeHandler(event) {
    setInputStartDate(event.target.value);
    const startDateObject = new Date(startRef.current.value);
    const endDateObject = new Date(endRef.current.value);
    validateDates(startDateObject, endDateObject);
  }
  function endDateChangeHandler(event) {
    setInputEndDate(event.target.value);
    const startDateObject = new Date(startRef.current.value);
    const endDateObject = new Date(endRef.current.value);
    validateDates(startDateObject, endDateObject);
  }
  function submitDateHandler(event) {
    event.preventDefault();
    const startDateObject = new Date(startRef.current.value);
    const endDateObject = new Date(endRef.current.value);
    const Difference_In_Time =
      endDateObject.getTime() - startDateObject.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    planDispatch(planActions.setStartDate(inputStartDate));
    planDispatch(planActions.setEndDate(inputEndDate));
    planDispatch(planActions.setDays(Difference_In_Days));
    setShowSelect(false);
    setShowModal(false);
    router.push("/plan/city");
  }
  const minDate = new Date();
  const minDateValue = returnDate(
    minDate.getFullYear(),
    minDate.getMonth(),
    minDate.getDate()
  );
  if (showModal) {
    return (
      <>
        <div
        ref={backgroundRef}
          onClick={backgroundClicked}
          className={classes["plan-modal-background"]}
        >
          <div className={classes["plan-modal"]}>
            {!showSelect && (
              <div>
                <div className={classes.title}>Confirm Dates</div>
                <div className={classes["date-text"]}>From: {planSelector.startDate}</div>
                <div className={classes["date-text"]}>To: {planSelector.endDate}</div>
                <button onClick={setShowSelectHandler}>Change Dates</button>
                <button style={{backgroundColor: "#fdd2d2"}} onClick={displayModalHandler}>Confirm</button>
              </div>
            )}
            {showSelect && (
              <div>
                <div className={classes.title}>Select Trip Dates</div>
                <form>
                  <div>
                    <div className={classes["date-selector"]}>
                    <div className={classes["date-text"]}>From:  </div>
                      
                    <input
                      type="date"
                      name="trip-start"
                      onChange={startDateChangeHandler}
                      ref={startRef}
                      value={inputStartDate}
                      min={minDateValue}
                    />
                    </div>
                    <div className={classes["date-selector"]}>
                    <div className={classes["date-text"]}>To:  </div>

                    <input
                      type="date"
                      name="trip-end"
                      ref={endRef}
                      onChange={endDateChangeHandler}
                      value={inputEndDate}
                      min={minDateValue}
                    />
                    </div>
                  </div>
                  <div className={classes.buttons}>
                  <button onClick={displayModalHandler} type="submit">
                    Cancel
                  </button>
                  {validDates && (
                    <button style={{backgroundColor: "#fdd2d2"}} onClick={submitDateHandler} type="submit">
                      Plan
                    </button>
                  )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {planSelector.days > 0 && (<>
            <div className={classes.title}>Selected Trip Dates</div>
          <div className={classes.dates}>
            <div className={classes.date}>From: {planSelector.startDate}</div>
            <div className={classes.date}>To: {planSelector.endDate}</div>
          </div></>
        )}
          {planSelector.days < 1 && (
            <button
              className={classes["change-btn"]}
              onClick={displaySelectModalHandler}
            >
              Select Dates
            </button>
          )}
          {planSelector.days > 0 && (
            <button
              className={classes["change-btn"]}
              onClick={displayModalHandler}
            >
              Change Dates
            </button>
          )}
      </>
    );
  }
}

export default Datemodal;
