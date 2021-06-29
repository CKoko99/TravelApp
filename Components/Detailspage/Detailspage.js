import classes from "./Detailspage.module.css";
import Image from "next/image";
import Star from "../../Images/Icons/Star.png";
import EmptyStar from "../../Images/Icons/EmptyStar.png";
import Link from "next/Link";
import { useState } from "react";

function Detailspage(props) {
  const [currentSlide, setCurrentSlide] = useState(1);

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
  function changeSlideHandler(n) {
    const newSlide = currentSlide + n;

    console.log("new slide" + newSlide);
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
          className={`${classes["mySlides"]} ${classes["chosen"]} ${classes["fade"]}`}
        >
          <img src={img} alt={props.title} className={classes["slide-img"]} />
        </div>
      );
    } else {
      return (
        <div className={`${classes["mySlides"]} ${classes["fade"]}`}>
          <img src={img} alt={props.title} className={classes["slide-img"]} />
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
      <div className={classes["text-section"]}>
        <div className={classes["desc"]}>
          <div>{props.desc}</div>
        </div>
      </div>
      {!props.planning &&(

        <Link href={"/plan/city"}>
        <div className={classes["plan-button"]}>Plan a Trip!</div>
      </Link>
        )}
    </div>
  );
}
export default Detailspage;
