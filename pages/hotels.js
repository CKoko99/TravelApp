import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Hotels(){
    const Hotels = useSelector((state) => state.hotels.hotelsList);
    const hotelList = Hotels.map((item) => {
        return (<Pagecard
        type="hotel"
        id={item.id}
        key={item.id}
          desc={item.desc}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />)
      });
    return<>{hotelList}</>
}

export default Hotels