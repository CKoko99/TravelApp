import Link from "next/Link";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Flights(){
    const flights = useSelector((state) => state.flights.flightsList);
    console.log(flights)
    const flightList = flights.map((item) => {
        return <Link key={item.id} href={`/flight/${item.id}`}>
        <Pagecard
        key={item.id}
          desc={item.desc}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />
      </Link>
      });
    return<>{flightList}</>
}

export default Flights