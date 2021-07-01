import classes from "./pages.module.css";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Cities() {
  const Cities = useSelector((state) => state.cities.citiesList);
  const cityList = Cities.map((item) => {
    return (
      <Pagecard
        type="city"
        price={item.price}
        id={item.id}
        key={item.id}
        desc={item.desc}
        rating={item.rating}
        title={item.title}
        img={item.imgs[0]}
      />
    );
  });
  return (
    <>
      <div className={classes["page-list"]}>
        <div className={classes.title}>Cities</div>
        {cityList}
      </div>
    </>
  );
}

export default Cities;
