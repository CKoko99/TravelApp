import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Footer from "./Components/Ui/Footer/Footer";
import Hero from "./Components/Ui/Hero/Hero";
import Navbar from "./Components/Ui/Navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Hero />
            <Home />
          </Route>
          <Route path='/admin' exact>
            <Admin/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
