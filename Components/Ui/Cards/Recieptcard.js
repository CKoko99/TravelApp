import classes from "./Pagecard.module.css";
import Image from "next/image";
import Star from "../../../Images/Icons/Star.png";
import EmptyStar from "../../../Images/Icons/EmptyStar.png";
import Link from "next/Link";
import dollar from "../../../Images/Icons/dollar.png";
import { useRouter } from "next/dist/client/router";
function priceCalc(number) {
  if (number <= 0.6) {
    return 1;
  } else if (number <= 1.2) {
    return 2;
  } else if (number <= 1.8) {
    return 3;
  } else if (number <= 2.4) {
    return 4;
  } else {
    return 5;
  }
}
function Receiptcard(props) {
  const dollars = [];
  const Router = useRouter();
  if (props.type === "city") {
    const num = priceCalc(props.price);
    for (let i = 1; i <= num; i++) {
      dollars.push(
        <Image alt={"dollar"} src={dollar} height={15} width={15} />
      );
    }
  }
  return (
    <div onClick={props.onClick} className={classes["receipt-card"]}>
      <div className={classes["img-section"]}>
        <div className={classes.evildiv}>
          <Image
            layout="fill"
            className={classes["home-img"]}
            alt={props.title}
            src={props.img}
          />
        </div>
      </div>
      <div className={classes["text-section"]}>
        <div className={classes["title"]}>{props.title}</div>
        <div className={classes.Rows}>
          {props.type === "city" && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["price"]}>Price Ratings: {dollars}</div>
            </div>
          )}
          {props.type === "flight" && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["price"]}>${props.price}</div>
            </div>
          )}
          {(props.type === "hotel" || props.type === "rental") && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["price"]}>${props.price} per night</div>
            </div>
          )}
          <div
            onClick={() => {
              Router.push(`/plan/${props.type}`);
            }}
            className={classes["remove-button"]}
          >
            Change {props.type}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Receiptcard;
