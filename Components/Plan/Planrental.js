import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagecard from '../Ui/Cards/Pagecard'
import { planActions } from "../../store/store";
import { useHistory } from "react-router";
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function Planrental() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const history = useHistory()

  const rentals = useSelector((state) => state.rentals.rentalsList);
    const [selectedRental, setSelectedRental] = useState(false)
  useEffect(() => {
    if (isEmpty(planSelector.flight)) {
        console.log(planSelector.flight)
        history.replace('/plan/city')
    }
  });
  function clicked(text){
    setSelectedRental(text)
  }
  function selectRentalHandler(){
    planDispatch(planActions.addRental(selectedRental))
    history.push('/plan/details')
  }
  const rentalList = rentals.map((item) => {
    return (
      <Pagecard onClick={() =>{clicked(item)}} desc={item.desc} rating={item.rating} title={item.title} img={item.imgs[0]} />
      );
    });
    return <>
  {selectedRental && <Pagecard desc={selectedRental.desc} rating={selectedRental.rating} title={selectedRental.title} img={selectedRental.imgs[0]} />}
  {selectedRental && <button onClick={selectRentalHandler}>View Trip Plans</button>}
  {rentalList}</>;
}

export default Planrental;
