import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";

const ResturantLogout = () => {
  const Navigate = useNavigate();
  const { dispatch, resturantinfo } = useContext(MyContext);
  const { email } = resturantinfo;

  // for resturant
  const fetchresturantdata = async () => {
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/resturantlogout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
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
