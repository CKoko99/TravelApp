import Link from "next/Link";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Flights(){
    const flights = useSelector((state) => state.flights.flightsList);
    console.log(flights)
    const flightList = flights.map((item) => {
        return(
        <Pagecard
        type="flight"
        id={item.id}
        key={item.id}
          desc={item.desc}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />
      )})
    return<>{flightList}</>
}

export default Flights