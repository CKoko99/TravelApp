import Detailspage from "../../Components/Detailspage/Detailspage";
import { db } from "../_app";

export async function getStaticPaths() {
  const Cities = [];
  let paths;
  try {
    const snapshot = await db
      .collection("Cities")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const city = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Cities.push(city.id);
        });
        paths = Cities.map((city) => {
          return {
            params: { cityId: String(city) },
          };
        });
      });
  } catch (e) {}
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const cityId = context.params.cityId;
  const Cities = [];
  let selectedCity = null;
  try {
    const snapshot = await db
      .collection("Cities")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const city = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Cities.push(city);
        });
        selectedCity = Cities.find(
          (city) => String(city.id) === String(cityId)
        );
      });
  } catch (e) {}
  return {
    props: {
      City: selectedCity,
    },
  };
}

function CityDetails(props) {
  return (
    <Detailspage
      desc={props.City.desc}
      type="city"
      price={props.City.price}
      rating={props.City.rating}
      title={props.City.title}
      imgs={props.City.imgs}
    />
  );
}
export default CityDetails;
