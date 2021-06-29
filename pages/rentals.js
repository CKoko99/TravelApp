import classes from "./pages.module.css";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Rentals(){
    const Rentals = useSelector((state) => state.rentals.rentalsList);
    const rentalList = Rentals.map((item) => {
        return (<Pagecard
          type="rental"
          id={item.id}
          key={item.id}
            desc={item.desc}
            rating={item.rating}
            title={item.title}
            img={item.imgs[0]}
          />)
      });
    return<><div className={classes["page-list"]}>
    <div className={classes.title}>Airlines</div>{rentalList}</div></>
}

export default Rentals