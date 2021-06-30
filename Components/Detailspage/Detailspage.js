import classes from "./Detailspage.module.css";
import Image from "next/image";
import Star from "../../Images/Icons/Star.png";
import EmptyStar from "../../Images/Icons/EmptyStar.png";
import Link from "next/Link";
import dollar from "../../Images/Icons/dollar.png";
import { useState } from "react";
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
function Detailspage(props) {
  const [currentSlide, setCurrentSlide] = useState(1);
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
          key={"filled" + props.id + i}
          width={25}
          height={23}
          className={classes.star}
          alt="ratings"
          src={Star}
        />
      );
    }
    for (let i = 1; i <= EmptyStarAmount; i++) {
      EmptyStars.push(
        <Image
          key={"empty" + props.id + i}
          width={25}
          height={23}
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
  function changeSlideHandler(n) {
    const newSlide = currentSlide + n;
    if (newSlide < 1) {
      setCurrentSlide(slides.length);
    } else if (newSlide > slides.length) {
      setCurrentSlide(1);
    } else {
      setCurrentSlide(newSlide);
    }
  }
  function dotSlideHandler(n) {
    setCurrentSlide(n);
  }
  let counter = 0;
  const slides = props.imgs.map((img) => {
    counter++;
    if (counter == currentSlide) {
      return (
        <div
          key={img}
          className={`${classes["mySlides"]} ${classes["chosen"]} ${classes["fade"]}`}
        >
          <Image
            layout={"fill"}
            src={img}
            alt={props.title}
            className={classes["slide-img"]}
          />
        </div>
      );
    } else {
      return (
        <div key={img} className={`${classes["mySlides"]} ${classes["fade"]}`}>
          <Image
            layout={"fill"}
            src={img}
            alt={props.title}
            className={classes["slide-img"]}
          />
        </div>
      );
    }
  });
  return (
    <div onClick={props.onClick} className={classes["Detailspage"]}>
      <div className={classes["title"]}>{props.title}</div>
      <div className={classes["slideshow-container"]}>
        {slides}
        <a
          className={classes.prev}
          onClick={() => {
            changeSlideHandler(-1);
          }}
        >
          &#10094;
        </a>
        <a
          className={classes.next}
          onClick={() => {
            changeSlideHandler(1);
          }}
        >
          &#10095;
        </a>
      </div>
      <div className={classes.rating}>
        {rating[0] != "New Listing" && (
          <div className={classes["stars-row"]}>{rating}</div>
        )}
        {rating[0] == "New Listing" && <div>{rating}</div>}
      </div>
      {props.type == "city" && (
        <div className={classes.price}>Price Rating: {dollars}</div>
      )}
      {props.type === "flight" && (
        <div className={classes["small-text-rows"]}>
          <div className={classes["price"]}>
            {!props.planning && <>From</>} ${props.price} per ticket
          </div>
        </div>
      )}
      {(props.type === "hotel" || props.type === "rental") && (
        <div className={classes["small-text-rows"]}>
          <div className={classes["price"]}>
            {" "}
            {!props.planning && <>From</>} ${props.price} per night
          </div>
        </div>
      )}
      <div className={classes["text-section"]}>
        <div className={classes["desc"]}>
          <div>{props.desc}</div>
        </div>
      </div>
      {!props.planning && (
        <Link href={"/plan/city"}>
          <div className={classes["plan-button"]}>Plan a Trip!</div>
        </Link>
      )}
    </div>
  );
}
export default Detailspage;
