import Hero from "../Components/Ui/Hero/Hero";
import Home from "../Components/Home/Home";
import SuccessModal from "../Components/Ui/Modals/SuccesModal";
import CancelModal from "../Components/Ui/Modals/CancelModal";
export default function Homepage() {
  return (
    <>
      <SuccessModal />
      <CancelModal />
      <Hero />
      <Home />
    </>
  );
}
