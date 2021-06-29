import Detailspage from "../../Components/Detailspage/Detailspage";
import { db } from "../_app";

export async function getStaticPaths() {
  const Flights = [];
  let paths
  try{
  const snapshot = await db.collection("Flights")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const flight = {
          title: doc.data().title,
          id: doc.data().id,
          price: doc.data().price,
          rating: doc.data().rating,
          staffPick: doc.data().staffpick,
          imgs: doc.data().imgs,
          desc: doc.data().desc,
        };
        Flights.push(flight.id);
      });
       paths = Flights.map((flight) => {
        return {
          params: { flightId: String(flight) },
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
  const flightId = context.params.flightId;
  const Flights = [];
  let selectedFlight = null;
  try {
    const snapshot = await db
      .collection("Flights")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const flight = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Flights.push(flight);
        });
        selectedFlight = 
          Flights.find((flight) => String(flight.id) === String(flightId)
        );
      });
    } catch (e) {}
  return {
    props: {
      City: selectedFlight,
    },
  };
}

function FlightDetails(props) {
  return  <Detailspage desc={props.City.desc} rating={props.City.rating} title={props.City.title} imgs={props.City.imgs} />

}
export default FlightDetails;
