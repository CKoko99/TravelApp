import classes from "./HomeItem.module.css";
import Star from "../../Images/Icons/Star.png";
import EmptyStar from "../../Images/Icons/EmptyStar.png";

function HomeItem(props) {
    let rating = ''
    const filledStars = [];
    const EmptyStars = [];
    if(props.rating !== 0){
  const EmptyStarAmount = 5 - props.rating;
  for (let i = 1; i <= props.rating; i++) {
    filledStars.push(<img className={classes.star} key={i} alt="ratings" src={Star} />);
  }
  for (let i = 1; i <= EmptyStarAmount; i++) {
    EmptyStars.push(<img key={i} className={classes.star} alt="ratings" src={EmptyStar} />);
  }}else{
    rating = "New Listing"
  }
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
          <div>{rating || props.rating}</div>
          {filledStars}
          {EmptyStars}
        </div>
      </div>
    </div>
  );
}

export default HomeItem;
