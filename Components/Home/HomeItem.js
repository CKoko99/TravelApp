import Image from "next/image";
import classes from "./HomeItem.module.css";
import Star from "../../Images/Icons/Star.png";
import EmptyStar from "../../Images/Icons/EmptyStar.png";
import Link from "next/link";

function HomeItem(props) {
  let rating = "";
  const filledStars = [];
  const EmptyStars = [];
  if (props.rating !== 0) {
    const EmptyStarAmount = 5 - props.rating;
    for (let i = 1; i <= props.rating; i++) {
      filledStars.push(
        <Image
          width={15}
          height={15}
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
          width={15}
          height={15}
          key={i}
          className={classes.star}
          alt="ratings"
          src={EmptyStar}
        />
      );
    }
  } else {
    rating = "New Listing";
  }
  return (
    <div className={classes["home-item"]}>
      <Link href={`/${props.type}/${props.id}`}>
        <div className={classes["evildiv"]}>
          <Image
            className={classes["home-img"]}
            alt={props.title}
            src={props.img}
            layout="fill"
          />
        </div>
      </Link>
      <div className={classes.Rows}>
        <div className={classes.title}>
          <Link href={`/${props.type}/${props.id}`}>{props.title}</Link>
        </div>
        <div className={classes.rating}>
          <div>{rating}</div>

          <div className={classes.stars}>
            {filledStars}
            {EmptyStars}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeItem;
