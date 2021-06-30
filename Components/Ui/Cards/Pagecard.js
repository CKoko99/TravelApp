import classes from "./Pagecard.module.css";
import Image from "next/image";
import Star from "../../../Images/Icons/Star.png";
import EmptyStar from "../../../Images/Icons/EmptyStar.png";
import Link from "next/link";
import dollar from "../../../Images/Icons/dollar.png";
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
function Pagecard(props) {
  const dollars = [];
  if (props.type === "city") {
    const num = priceCalc(props.price);
    for (let i = 1; i <= num; i++) {
      dollars.push(<Image alt="dollar" src={dollar} height={15} width={15} />);
    }
  }
  let rating = [];
  const filledStars = [];
  const EmptyStars = [];
  if (props.rating !== 0) {
    const EmptyStarAmount = 5 - props.rating;
    for (let i = 1; i <= props.rating; i++) {
      filledStars.push(
        <Image
          width={25}
          height={23}
          className={classes.star}
          key={i}
          alt="ratings"
          src={Star}
        />
      );
    }
    for (let i = 1; i <= EmptyStarAmount; i++) {
      EmptyStars.push(
        <Image
          width={25}
          height={23}
          key={i}
          className={classes.star}
          alt="ratings"
          src={EmptyStar}
        />
      );
    }
    rating.push(filledStars);
    rating.push(EmptyStars);
  } else {
    rating.push("New Listing");
  }
  return (
    <div onClick={props.onClick} className={classes["pagecard"]}>
      <div className={classes["img-section"]}>
        <Link href={`/${props.type}/${props.id}`}>
          <div className={classes.evildiv}>
            <Image
              layout="fill"
              className={classes["home-img"]}
              alt={props.title}
              src={props.img}
            />
          </div>
        </Link>
      </div>
      <div className={classes["text-section"]}>
        <Link href={`/${props.type}/${props.id}`}>
          <div className={classes["title"]}>{props.title}</div>
        </Link>
        <Link href={`/${props.type}/${props.id}`}>
          <div className={classes["desc"]}>
            <div>{props.desc.substring(0, 249)}...</div>
          </div>
        </Link>
        <div className={classes.Rows}>
          {rating[0] != "New Listing" && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["small-text"]}>Ratings: </div>
              <div className={classes["stars-row"]}>{rating}</div>
            </div>
          )}
          {rating[0] == "New Listing" && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["small-text"]}>{rating} </div>
            </div>
          )}
          {props.type === "city" && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["price"]}>Price Ratings: {dollars}</div>
            </div>
          )}
          {props.type === "flight" && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["price"]}>
                From ${props.price} per ticket
              </div>
            </div>
          )}
          {(props.type === "hotel" || props.type === "rental") && (
            <div className={classes["small-text-rows"]}>
              <div className={classes["price"]}>
                From ${props.price} per night
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Pagecard;
