import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

const Logout = () => {
  const navigate = useNavigate();
  const { userinfo, dispatch } = useContext(MyContext);
  const { email } = userinfo;
  console.log(email);
  const fetchdata = async () => {
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) {
        console.error("Error:", res.error);
      }
      const data = await res.json();
      if (!res.status === 200 || !data) {
        console.error("Error:", data.error);
      }
      dispatch({ type: "USEROUT" });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
