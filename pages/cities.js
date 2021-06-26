import Link from "next/Link";
import { useSelector } from "react-redux";
import Pagecard from "../Components/Ui/Cards/Pagecard";

function Cities() {
  const Cities = useSelector((state) => state.cities.citiesList);
  const cityList = Cities.map((item) => {
    return (
      <Link key={item.id} href={`/city/${item.id}`}>
        <Pagecard
        key={item.id}
          desc={item.desc}
          rating={item.rating}
          title={item.title}
          img={item.imgs[0]}
        />
      </Link>
    );
  });
  return <>{cityList}</>;
}

export default Cities;
