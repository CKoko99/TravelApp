import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Cities(){
    const Cities = useSelector((state) => state.cities.citiesList);
    const cityList = Cities.map((item) => {
        return (
          <Pagecard desc={item.desc} rating={item.rating} title={item.title} img={item.imgs[0]} />
        );
      });
    return<>{cityList}</>
}

export default Cities