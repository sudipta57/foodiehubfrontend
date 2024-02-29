import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { MyContext } from "../App";

const initialState = {
  foodData: [],
  catagoryData: [],
  selectedCategory: "All",
};

const menuReducer = (state, action) => {
  switch (action.type) {
    case "SET_FOOD_DATA":
      return { ...state, foodData: action.payload };
    case "SET_CATAGORY_DATA":
      return { ...state, catagoryData: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

const Menu = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(menuReducer, initialState);
  // get food data
  const sendFoodRequest = async () => {
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/resturantmenu",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
      }
      dispatch({ type: "SET_FOOD_DATA", payload: data });
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  };

  // Getting category data
  const catagoryData = async () => {
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/foodcatagory",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const catagoryData = await res.json();
      if (!Array.isArray(catagoryData)) {
        throw new Error("Invalid category data");
      }

      dispatch({ type: "SET_CATAGORY_DATA", payload: catagoryData });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendFoodRequest();
    catagoryData();
  }, []);

  const containerClassName = useBreakpointValue({
    base: "container-fluid",
    lg: "container",
  });

  // on category click
  const onCategoryClick = (categoryName) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: categoryName });
  };
  // importing the states  for cart implementation

  const { setCartdata, cartdata } = useContext(MyContext);
  const toast = useToast();
  const cartOnClick = (fooddata) => {
    setCartdata([...cartdata, fooddata]);
    toast({
      title: "Item added",
      description: `Your ${fooddata.name} has added in the cart`,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <>
      <Box>
        <Flex
          w={{
            base: "100%",
            md: "50%",
          }}
          justify="space-around"
          m="auto"
          bg="#f0f1f0"
          my="10"
          pt="2"
          borderRadius="6"
        >
          {state.catagoryData.map((category) => (
            <Text
              key={category._id}
              fontWeight="800"
              color="#6d2bf2"
              cursor="pointer"
              onClick={() => onCategoryClick(category.CategoryName)}
            >
              {category.CategoryName}
            </Text>
          ))}
        </Flex>
      </Box>

      <Box className={containerClassName} justifyContent="space-around" p={4}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {state.foodData
            .filter(
              (food) =>
                state.selectedCategory === "All" ||
                food.CategoryName.toLowerCase() ===
                  state.selectedCategory.toLowerCase()
            )
            .map((food) => (
              <div className="col" key={food._id}>
                <div className="card shadow-sm">
                  <img
                    src={food.imgPath}
                    alt="Placeholder: Thumbnail"
                    className="bd-placeholder-img card-img-top food-img"
                  />

                  <div className="card-body">
                    <Text>{food.description}</Text>
                    <Box>
                      <Flex justify="space-between">
                        <Text fontSize="2xl" fontWeight="bold">
                          {food.name}
                        </Text>
                        <Text fontSize="1.5xl" fontWeight="bold">
                          {/* {food.restaurant.location} */}
                        </Text>
                      </Flex>

                      <Flex justify="space-between">
                        <Text fontSize="2xl" fontWeight="bold">
                          Pricing
                        </Text>
                        <Stack spacing="-4">
                          {food.options[0].full ? (
                            <>
                              {" "}
                              <HStack>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  Half
                                </Text>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  {food.options[0].half}
                                </Text>
                              </HStack>
                              <HStack>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  Full
                                </Text>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  {food.options[0].full}
                                </Text>
                              </HStack>
                            </>
                          ) : (
                            ""
                          )}
                          {food.options[0].large ? (
                            <>
                              <HStack>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  Regular
                                </Text>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  {food.options[0].regular}
                                </Text>
                              </HStack>
                              <HStack>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  Medium
                                </Text>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  {food.options[0].medium}
                                </Text>
                              </HStack>
                              <HStack>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  Large
                                </Text>
                                <Text fontSize="1.5xl" fontWeight="bold">
                                  {food.options[0].large}
                                </Text>
                              </HStack>
                            </>
                          ) : (
                            ""
                          )}
                        </Stack>
                      </Flex>
                      <Button
                        colorScheme="green"
                        onClick={() => cartOnClick(food)}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Box>
    </>
  );
};

export default Menu;
