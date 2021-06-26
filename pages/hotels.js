import Link from "next/Link";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Hotels(){
    const Hotels = useSelector((state) => state.hotels.hotelsList);
    const hotelList = Hotels.map((item) => {
        return <Link key={item.id} href={`/hotel/${item.id}`}>
        <Pagecard
        key={item.id}
          desc={item.desc}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />
      </Link>
      });
    return<>{hotelList}</>
}

export default Hotels