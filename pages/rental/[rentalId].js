import Pagecard from "../../Components/Ui/Cards/Pagecard";
import { db } from "../_app";

export async function getStaticPaths() {
  const Rentals = [];
  let paths
  try{
  const snapshot = await db.collection("Rentals")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const rental = {
          title: doc.data().title,
          id: doc.data().id,
          price: doc.data().price,
          rating: doc.data().rating,
          staffPick: doc.data().staffpick,
          imgs: doc.data().imgs,
          desc: doc.data().desc,
        };
        Rentals.push(rental.id);
      });
       paths = Rentals.map((rental) => {
        return {
          params: { rentalId: String(rental) },
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
  const rentalId = context.params.rentalId;
  const Rentals = [];
  let selectedrental = null;
  try {
    const snapshot = await db
      .collection("Rentals")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const rental = {
            title: doc.data().title,
            id: doc.data().id,
            price: doc.data().price,
            rating: doc.data().rating,
            staffPick: doc.data().staffpick,
            imgs: doc.data().imgs,
            desc: doc.data().desc,
          };
          Rentals.push(rental);
        });
        selectedrental = 
          Rentals.find((rental) => String(rental.id) === String(rentalId)
        );
      });
    } catch (e) {}
  return {
    props: {
      City: selectedrental,
    },
  };
}

function RentalDetails(props) {
  return  <Pagecard desc={props.City.desc} rating={props.City.rating} title={props.City.title} img={props.City.imgs[0]} />

}
export default RentalDetails;
