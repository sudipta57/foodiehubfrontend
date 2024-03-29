import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { Center, Spinner } from "@chakra-ui/react";

const Logout = () => {
  const navigate = useNavigate();
  const { userinfo, dispatch } = useContext(MyContext);
  const { email } = userinfo;
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

  return (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

export default Logout;
