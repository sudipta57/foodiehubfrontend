import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

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

export default ResturantLogout;
