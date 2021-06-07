import classes from "./Home.module.css";
import HomeItem from "./HomeItem";
const Dummy_City = [
  {
    title: "Mexico",
    imgs: [{ img: "https://i.imgur.com/RSBdXld.jpg" }],
    rating: 3,
    staffpick: true,
  },
  {
    title: "Mexico",
    imgs: [{ img: "https://i.imgur.com/RSBdXld.jpg" }],
    rating: 5,
    staffpick: false,
  },
  {
    title: "Mexico",
    imgs: [{ img: "https://i.imgur.com/RSBdXld.jpg" }],
    rating: 5,
    staffpick: false,
  },
];
function Home() {
  const topTravels = Dummy_City.map((item) => {
    return (
      <HomeItem
        rating={item.rating}
        title={item.title}
        img={item.imgs[0].img}
      />
    );
  });
  const staffPicks = Dummy_City.map((item) => {
    if (item.staffpick) {
      return (
        <HomeItem
          rating={item.rating}
          title={item.title}
          img={item.imgs[0].img}
        />
      );
    }return<></>
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
    </div>
  );
}
export default Home;
