import classes from "./pages.module.css";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Hotels(){
    const Hotels = useSelector((state) => state.hotels.hotelsList);
    const hotelList = Hotels.map((item) => {
        return (<Pagecard
        type="hotel"
        price={item.price}
        id={item.id}
        key={item.id}
          desc={item.desc}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />)
      });
    return<><div className={classes["page-list"]}>
    <div className={classes.title}>Hotels</div>{hotelList}</div></>
}

export default Hotels