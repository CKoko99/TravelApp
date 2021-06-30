import classes from "../DateModal/DateModal.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { savedPlanActions } from "../../../store/store";

function SuccessModal(props) {
  const router = useRouter();
  const planSelector = useSelector((state) => state.savedPlan);
  const planDispatch = useDispatch(savedPlanActions);
  const [showModal, setShowModal] = useState(false);
  const backgroundRef = useRef();
  function backgroundClicked(e) {
    if (backgroundRef.current === e.target) {
      setShowModal(false);
      planDispatch(savedPlanActions.setJustSaved(false));
    }
  }
  useEffect(() => {
    if (planSelector.justSaved === true) {
      setShowModal(true);
    }
  }, [planSelector.justSaved]);

  if (showModal) {
    return (
      <>
        <div
          ref={backgroundRef}
          onClick={backgroundClicked}
          className={classes["plan-modal-background"]}
        >
          <div className={classes["plan-modal"]}>
            <div className={classes.title}>Success!</div>
            <div className={classes["date-text"]}>
              Trip to {planSelector.city.title} has been planned!
            </div>
            <div
              onClick={() => {
                router.push("/plannedtrip");
                planDispatch(savedPlanActions.setJustSaved(false));
              }}
              className={classes["success-button"]}
            >
              View Details
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default SuccessModal;
