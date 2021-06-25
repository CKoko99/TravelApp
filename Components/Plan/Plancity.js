import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datemodal from "../Ui/DateModal/DateModal";
import Pagecard from '../Ui/Cards/Pagecard'
import { planActions } from "../../store/store";
import { useHistory } from "react-router";
function Plancity() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const history = useHistory()

  const cities = useSelector((state) => state.cities.citiesList);
    const [selectedCity, setSelectedCity] = useState(false)
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (planSelector.days <= 0) {
      setShowModal(true);
    }else{
      setShowModal(false)
    }
  },[planSelector.days]);
  function clicked(text){
      setSelectedCity(text)
  }
  function selectCityHandler(){
    planDispatch(planActions.addCity(selectedCity))
    history.push('/plan/flight')

  }
  const cityList = cities.map((item) => {
    return (
      <Pagecard onClick={() =>{clicked(item)}} desc={item.desc} rating={item.rating} title={item.title} img={item.imgs[0]} />
      );
    });
    return <>{showModal && <Datemodal />}
  {selectedCity && <Pagecard desc={selectedCity.desc} rating={selectedCity.rating} title={selectedCity.title} img={selectedCity.imgs[0]} />}
  {selectedCity && <button onClick={selectCityHandler}>Plan a flight</button>}
  {cityList}</>;
}

export default Plancity;
