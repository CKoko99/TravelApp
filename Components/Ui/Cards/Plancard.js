import classes from "./Pagecard.module.css";
import Image from "next/image";
import Star from "../../../Images/Icons/Star.png";
import EmptyStar from "../../../Images/Icons/EmptyStar.png";
import Link from "next/Link";

function Pagecard(props) {
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
        <img
          className={classes["home-img"]}
          alt={props.title}
          src={props.img}
        />
      </div>
      <div className={classes["text-section"]}>
        <div className={classes["title"]}>{props.title}</div>
        <div className={classes["desc"]}>
          <div>{props.desc.substring(0, 249)}...</div>
        </div>
        <div className={classes.Rows}>
          {rating[0] != "New Listing" && (
            <div className={classes["stars-row"]}>{rating}</div>
          )}
          {rating[0] == "New Listing" && (
            <div >{rating}</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Pagecard;
