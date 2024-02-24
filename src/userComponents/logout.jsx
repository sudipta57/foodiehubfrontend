import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

const Logout = () => {
  const Navigate = useNavigate();
  const { state, dispatch } = useContext(MyContext);
  const fetchdata = async () => {
    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!res.ok) {
        console.log(res.error);
      }
      const data = res.json();
      if (!res.status == 200 || !data) {
        console.log(data.error);
      }
      dispatch({ type: "USEROUT" });
      Navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
