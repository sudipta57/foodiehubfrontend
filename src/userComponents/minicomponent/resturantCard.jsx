import React, { useEffect, useState } from "react";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
const ResturantCard = () => {
  // creating a state to store the resturant data
  const [resturants, setResturants] = useState([]);

  const fetchResturantData = async () => {
    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/resturantdata",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!res.ok) {
        console.log("server error");
      }
      const data = await res.json();
      setResturants(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResturantData();
  }, []);

  const containerclassName = useBreakpointValue({
    base: "container-fluid",
    lg: "container",
  });
  return (
    <Box className={containerclassName} justifyContent="space-around" p={4}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {resturants.map((resturant) => (
          <div className="col" key={resturant._id}>
            <div className="card shadow-sm">
              <img
                src={resturant.restaurant.img}
                alt="Placeholder: Thumbnail"
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
              />

              <div className="card-body">
                <Text>{resturant.restaurant.description}</Text>
                <Box>
                  <Flex justify="space-between">
                    <Text fontSize="2xl" fontWeight="bold">
                      {resturant.restaurant.name}
                    </Text>
                    <Text fontSize="1.5xl" fontWeight="bold">
                      {resturant.restaurant.location}
                    </Text>
                  </Flex>

                  <Flex justify="space-between">
                    <Text fontSize="2xl" fontWeight="bold">
                      Pricing
                    </Text>
                    <Text fontSize="1.5xl" fontWeight="bold">
                      {resturant.restaurant.pricing
                        ? resturant.restaurant.pricing.value
                        : "No pricing available"}
                    </Text>
                  </Flex>
                </Box>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ResturantCard;
