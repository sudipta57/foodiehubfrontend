import "./App.css";
import Navbar from "./userComponents/navbar";
import HomePage from "./userComponents/homePage";
import Menu from "./userComponents/menu";
import Cart from "./userComponents/working";
import Contact from "./userComponents/contact";
import Registration from "./userComponents/registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useReducer, useState } from "react";
import reducer from "./userComponents/reducer/reducer";
import Logout from "./userComponents/logout";
import Order from "./resturantComponents/order";
import Fooditem from "./resturantComponents/fooditem";
import ResturantLogout from "./resturantComponents/resturantLogout";
import Paymentsuccess from "./userComponents/paymentsuccess";
export const MyContext = createContext();

function App() {
  const initialstate = false;
  const [state, dispatch] = useReducer(reducer, initialstate);
  const [userinfo, setuserinfo] = useState({ email: "", password: "" });
  const [resturantinfo, setresturantinfo] = useState({});

  const [cartdata, setCartdata] = useState([]);

  return (
    <>
      <Router>
        <MyContext.Provider
          value={{
            state,
            dispatch,
            cartdata,
            setCartdata,
            userinfo,
            setuserinfo,
            resturantinfo,
            setresturantinfo,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/working" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/reslogout" element={<ResturantLogout />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/fooditem" element={<Fooditem />} />
            <Route path="/paymentsuccess" element={<Paymentsuccess />} />
          </Routes>
        </MyContext.Provider>
      </Router>
    </>
  );
}

export default App;
