import classes from "../DateModal/DateModal.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savedPlanActions } from "../../../store/store";

function CancelModal(props) {
  const planSelector = useSelector((state) => state.savedPlan);
  const planDispatch = useDispatch(savedPlanActions);
  const [showModal, setShowModal] = useState(false);
  const backgroundRef = useRef();
  function backgroundClicked(e) {
    if (backgroundRef.current === e.target) {
      setShowModal(false);
      planDispatch(savedPlanActions.setJustCancelled(false));
    }
  }
  useEffect(() => {
    if (planSelector.justCancelled === true) {
      setShowModal(true);
      planDispatch(savedPlanActions.setJustCancelled(false));
    }
  }, [planSelector.justCancelled, planDispatch]);

  if (showModal) {
    return (
      <>
        <div
          ref={backgroundRef}
          onClick={backgroundClicked}
          className={classes["plan-modal-background"]}
        >
          <div className={classes["plan-modal"]}>
            <div className={classes.title}>Confirmation</div>
            <div className={classes["date-text"]}>
              Your Trip has been cancelled
            </div>
            <div
              onClick={() => {
                setShowModal(false);
                planDispatch(savedPlanActions.setJustCancelled(false));
              }}
              className={classes["success-button"]}
            >
              Okay
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default CancelModal;
