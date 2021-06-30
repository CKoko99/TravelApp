import Detailspage from "../../Components/Detailspage/Detailspage";
import Pagecard from "../../Components/Ui/Cards/Pagecard";
import { db } from "../_app";

export async function getStaticPaths() {
  const Hotels = [];
  let paths
  try{
  const snapshot = await db.collection("Hotels")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const hotel = {
          title: doc.data().title,
          id: doc.data().id,
          price: doc.data().price,
          rating: doc.data().rating,
          staffPick: doc.data().staffpick,
          imgs: doc.data().imgs,
          desc: doc.data().desc,
        };
        Hotels.push(hotel.id);
      });
       paths = Hotels.map((hotel) => {
        return {
          params: { hotelId: String(hotel) },
        };
      });
    });}catch(e){

    }
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const hotelId = context.params.hotelId;
  const Hotels = [];
  let selectedhotel = null;
  try {
    const snapshot = await db
      .collection("Hotels")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const hotel = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Hotels.push(hotel);
        });
        selectedhotel = 
          Hotels.find((hotel) => String(hotel.id) === String(hotelId)
        );
      });
    } catch (e) {}
  return {
    props: {
      City: selectedhotel,
    },
  };
}

function HotelDetails(props) {
  return  <Detailspage type="hotel" desc={props.City.desc} price={props.City.price}  rating={props.City.rating} title={props.City.title} imgs={props.City.imgs} />

}
export default HotelDetails;
