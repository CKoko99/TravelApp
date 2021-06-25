import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Rentals(){
    const Rentals = useSelector((state) => state.rentals.rentalsList);
    const rentalList = Rentals.map((item) => {
        return (
          <Pagecard desc={item.desc} rating={item.rating} title={item.title} img={item.imgs[0]} />
        );
      });
    return<>{rentalList}</>
}

export default Rentals