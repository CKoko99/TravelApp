import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Hero from "./Components/Ui/Hero/Hero";
import Navbar from "./Components/Ui/Navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Hero />
        <Home/>
      </div>
    </BrowserRouter>
  );
}

export default App;
