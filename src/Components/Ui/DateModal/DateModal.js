import classes from "./DateModal.module.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { planActions } from "../../../store/store";

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

function Datemodal(props) {
  const history = useHistory();
  const planDispatch = useDispatch(planActions);
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
    const Difference_In_Time = endDateObject.getTime() - startDateObject.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    planDispatch(planActions.setStartDate(inputStartDate));
    planDispatch(planActions.setEndDate(inputEndDate));
    planDispatch(planActions.setDays(Difference_In_Days));
    history.push("/plan/city");
  }
  const minDate = new Date();
  const minDateValue = returnDate(
    minDate.getFullYear(),
    minDate.getMonth(),
    minDate.getDate()
  );

  return (
    <>
      <div className={classes["plan-modal"]}>
        <div>Select Dates</div>
        <form>
          <div>
            <input
              type="date"
              name="trip-start"
              onChange={startDateChangeHandler}
              ref={startRef}
              value={inputStartDate}
              min={minDateValue}
            />
            <input
              type="date"
              name="trip-end"
              ref={endRef}
              onChange={endDateChangeHandler}
              value={inputEndDate}
              min={minDateValue}
            />
          </div>
          {validDates && (
            <button onClick={submitDateHandler} type="submit">
              Plan
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Datemodal;
