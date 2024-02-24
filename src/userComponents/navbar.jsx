import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../App";

const Navbar = () => {
  const { state } = useContext(MyContext);

  return (
    <nav className="navbar navbar-expand-lg " id="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" id="logo">
          Foodie Hunter
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {state === "resturantin" ? (
            <>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item nav-items">
                  <a className="nav-link">
                    <Link to="/orders">ORDERS</Link>
                  </a>
                </li>
                <li className="nav-item nav-items">
                  <a className="nav-link">
                    <Link to="/fooditem">ADD FOOD ITEM</Link>
                  </a>
                </li>
                {state === "resturantin" ? (
                  <li className="nav-item nav-items">
                    <a className="nav-link">
                      <Link to="/reslogout"> LOGOUT</Link>
                    </a>
                  </li>
                ) : (
                  <li className="nav-item nav-items">
                    <a className="nav-link">
                      <Link to="/registration"> REGISTRATION</Link>
                    </a>
                  </li>
                )}
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item nav-items">
                  <a className="nav-link active" aria-current="page">
                    <Link to="/">Home</Link>
                  </a>
                </li>
                <li className="nav-item nav-items">
                  <a className="nav-link">
                    <Link to="/menu"> Menu</Link>
                  </a>
                </li>
                <li className="nav-item nav-items">
                  <a className="nav-link">
                    <Link to="/working"> Cart</Link>
                  </a>
                </li>

                <li className="nav-item nav-items">
                  <a className="nav-link">
                    <Link to="/contact">Contact</Link>
                  </a>
                </li>
                {state === "userin" ? (
                  <>
                    <li className="nav-item nav-items">
                      <a className="nav-link">
                        <Link to="/logout"> Logout</Link>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="nav-item nav-items">
                    <a className="nav-link">
                      <Link to="/registration"> Registration</Link>
                    </a>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
