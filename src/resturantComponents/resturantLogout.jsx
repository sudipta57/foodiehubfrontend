import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";

const ResturantLogout = () => {
  const Navigate = useNavigate();
  const { dispatch } = useContext(MyContext);
  // for resturant
  const fetchresturantdata = async () => {
    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/resturantlogout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.status == 200) {
        console.log("internel server error");
      } else {
        dispatch({ type: "RESTURANTOUT" });
        Navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchresturantdata();
  }, []);
  return <div>ResturantLogout</div>;
};

export default ResturantLogout;
