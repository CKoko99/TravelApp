import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import HomeItem from "./HomeItem";
function Home() {
  const cities = useSelector((state) => state.cities.citiesList);
  const hotels = useSelector((state) => state.hotels.hotelsList);
  const cityCopy = [...cities];
  cityCopy.sort((a, b) => (a.rating > b.rating ? -1 : 1));
  let count = 0;
  const topTravels = cityCopy.map((item) => {
    if (count < 3) {
      count++;
      return (
        <HomeItem
          type="city"
          key={item.id}
          id={item.id}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />
      );
    } else {
      return <></>;
    }
  });
  const staffPicks = cities
    .filter((city) => city.staffPick)
    .map((item) => {
      return (
        <HomeItem
          type="city"
          id={item.id}
          key={item.id}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />
      );
    });
  const hotelList = hotels.map((item) => {
    return (
      <HomeItem
        type="hotel"
        id={item.id}
        key={item.id}
        rating={item.rating}
        title={item.title}
        img={item.imgs[0]}
      />
    );
  });
  return (
    <div className={classes.home}>
      <div className={classes["home-section"]}>
        <h3 className={classes["section-title"]}>Staff Picks</h3>
        <div className={classes["section-list"]}>{staffPicks}</div>
      </div>
      <div className={classes["home-section"]}>
        <h3 className={classes["section-title"]}>Top Travel Locations</h3>
        <div className={classes["section-list"]}>{topTravels}</div>
      </div>
      <div className={classes["home-section"]}>
        <h3 className={classes["section-title"]}>Hotels</h3>
        <div className={classes["section-list"]}>{hotelList}</div>
      </div>
    </div>
  );
}
export default Home;
