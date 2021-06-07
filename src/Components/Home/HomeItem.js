import classes from "./HomeItem.module.css";
import Star from "../../Images/Icons/Star.png";
import EmptyStar from "../../Images/Icons/EmptyStar.png";

function HomeItem(props) {
    const filledStars = [];
    const EmptyStars = [];
    if(props.rating !== "New Listing"){
  const EmptyStarAmount = 5 - props.rating;
  console.log(EmptyStarAmount);
  for (let i = 1; i <= props.rating; i++) {
    filledStars.push(<img className={classes.star} alt="ratings" src={Star} />);
  }
  for (let i = 1; i <= EmptyStarAmount; i++) {
    EmptyStars.push(<img className={classes.star} alt="ratings" src={EmptyStar} />);
  }}
  return (
    <div className={classes["home-item"]}>
      <img
        className={classes["home-img"]}
        alt={props.title}
        src={props.img}
      ></img>
      <div className={classes.Rows}>
        <div className={classes.Row1}>
          <div>{props.title}</div>
        </div>
        <div className={classes.Row2}>
          <div>{props.rating}</div>
          {filledStars}
          {EmptyStars}
        </div>
      </div>
    </div>
  );
}

export default HomeItem;
