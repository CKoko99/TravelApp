import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import HomeItem from "./HomeItem";
function Home() {
  const cities = useSelector((state) => state.cities.citiesList);
  const hotels = useSelector((state) => state.hotels.hotelsList);
  const cityCopy = [...cities];
  cityCopy.sort((a, b) => (a.rating > b.rating ? -1 : 1));
  const topTravels = cityCopy.map((item) => {
    return (
      <HomeItem key={item.id} rating={item.rating} title={item.title} img={item.imgs[0]} />
    );
  });
  const staffPicks = cities.filter(city => city.staffPick).map((item) => {
      return (
        <HomeItem key={item.id} rating={item.rating} title={item.title} img={item.imgs[0]} />
      );
  });
  const hotelList = hotels.map((item) => {
    return (
      <HomeItem key={item.id} rating={item.rating} title={item.title} img={item.imgs[0]} />
    );
  });
  return (
    <div className={classes.home}>
      <div className={classes["home-section"]}>
        <h3>Top Travel Locations</h3>
        <div className={classes["section-list"]}>{topTravels}</div>
      </div>
      <div className={classes["home-section"]}>
        <h3>Staff Picks</h3>
        <div className={classes["section-list"]}>{staffPicks}</div>
      </div>
      <div className={classes["home-section"]}>
        <h3>Hotels</h3>
        <div className={classes["section-list"]}>{hotelList}</div>
      </div>
    </div>
  );
}
export default Home;
