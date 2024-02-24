import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MyContext } from "../App";

const Cart = () => {
  const { state } = useContext(MyContext);
  const toast = useToast();
  const [userAddress, setUserAddress] = useState(null);
  const [phone, setphone] = useState("");
  // const [foodname, setfoodname] = useState("");
  // const [foodquantity, setfoodquantity] = useState("");

  const navigate = useNavigate();
  const sendrequest = async () => {
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/working",
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
        throw new Error(res.error);
      }
      const data = await res.json();
      setphone(data.phone);
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  };

  useEffect(() => {
    sendrequest();
  }, []);
  const { cartdata, setCartdata } = useContext(MyContext);
  // Calculate item total
  const itemTotal = cartdata.reduce(
    (total, cartData) =>
      total + parseFloat(cartData.options[0].half) * cartData.quantity,
    0
  );

  const handelLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getlocation(latitude, longitude);
      });
    }
  };
  const apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
  const apikey = "c460576e5c0447768bea4b7083907388";
  // get location address from opencage
  const getlocation = async (latitude, longitude) => {
    const query = `${latitude},${longitude}`;
    const apiUrl = `${apiEndpoint}?key=${apikey}&q=${query}&pretty=1`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setUserAddress(data.results[0].formatted);
      toast({
        title: "Address fetched",
        description: "Address added successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error in address fetching",
        description: "Error in address fetching",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // OnplusClick
  const OnplusClick = (index) => {
    const updateCart = [...cartdata];
    updateCart[index].quantity += 1;
    setCartdata(updateCart);
  };
  //OnminusClick
  const OnminusClick = (index) => {
    const updatecart = [...cartdata];
    if (updatecart[index].quantity !== 0) {
      updatecart[index].quantity -= 1;
      setCartdata(updatecart);
    }
  };

  // creating payment order
  const Createpayment = async (price) => {
    try {
      const res = await axios.post(
        "https://foodiehub-backend.vercel.app/api/create-payment",
        {
          price,
        }
      );
      // Log order ID and other relevant data before sending the payment verification request

      const options = {
        key: "rzp_test_jMM8QdP7ZQhqoM",
        amount: price,
        currency: "INR",
        name: "Foodie Hub",
        description: "Make your payment",
        image:
          "https://cdn.pixabay.com/photo/2021/03/19/13/40/online-6107598_640.png",
        order_id: res.data.id,
        callback_url:
          "https://foodiehub-backend.vercel.app/api/paymentverification",

        notes: {
          address: "foodiehub official",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
    }
  };

  // // initiating payment
  // const initiatePayment = async () => {
  //   try {
  //     const res = await fetch("https://foodiehub-backend.vercel.app/api/initiatepayment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         orderid,
  //       }),
  //     });
  //     if (res.error) {
  //       console.log(res.error);
  //     }
  //     const data = await res.json();
  //     setpaymentid(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Box>
      {cartdata && cartdata.length > 0 ? (
        <Box maxW="480px" m="auto">
          <Box bg="rgba(13, 50, 163, 0.886)" h="32px" borderRadius="6" my="2  ">
            <Text
              color="white"
              ps="4"
              pt="1"
              fontWeight={"bold"}
              fontSize={"1.5xl"}
            >
              My Cart
            </Text>
          </Box>

          <Box>
            {cartdata.map((cartData, index) => (
              <Flex
                justify="space-between"
                my="4"
                key={`${cartData._id}_${index}`}
                p="2"
              >
                <Flex justifyContent="space-between" w="50%">
                  <Image
                    src={`https://foodiehub-backend.vercel.app/${cartData.img}`}
                    w="50"
                    h="50"
                    borderRadius="10px"
                  />
                  <Text my="auto" ps="3">
                    {cartData.name}
                  </Text>
                </Flex>
                <Flex justify="space-between" w="40%">
                  <HStack>
                    <Text
                      fontWeight="bold"
                      cursor="pointer"
                      onClick={() => OnminusClick(index)}
                      my="auto"
                    >
                      -
                    </Text>
                    <Text fontWeight="bold" color="rgb(44, 152, 240)" my="auto">
                      {cartData.quantity}
                    </Text>
                    <Text
                      fontWeight="bold"
                      color="rgb(44, 152, 240)"
                      cursor="pointer"
                      onClick={() => OnplusClick(index)}
                      my="auto"
                    >
                      +
                    </Text>
                  </HStack>
                  <Text my="auto">
                    ₹
                    {(
                      parseFloat(cartData.options[0].half) * cartData.quantity
                    ).toFixed(2)}
                  </Text>
                </Flex>{" "}
              </Flex>
            ))}
          </Box>
          <Box>
            <Text
              fontWeight="bold"
              fontSize="20px"
              color="rgb(44, 152, 240)"
              as="u"
              ps={{
                base: "80px",
                md: "160px",
              }}
              cursor="pointer"
              onClick={() => navigate("/menu")}
            >
              ADD MORE ITEM
            </Text>
          </Box>
          <Divider
            borderBottomWidth="10px" // Adjust the border width as needed
            borderBottomStyle="solid"
            borderColor="gray" // Set the color of the border
            fontWeight="300" // Make the divider bold
            my={4} // Adjust margin as needed
          />

          <Box>
            <Text fontWeight="bold" fontSize="20px">
              Bill Details
            </Text>
            <Box>
              <Flex justify="space-between">
                <Text color="gray">Item Total</Text>
                <Text color="gray">₹{itemTotal.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray">delhivery fee for 1.29 kms</Text>
                <Text color="gray">₹0.00</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray">Taxes & Charges</Text>
                <Text color="gray">₹0.00</Text>
              </Flex>
            </Box>
            <Divider
              borderBottomWidth="2px" // Adjust the border width as needed
              borderBottomStyle="solid"
              borderColor="gray" // Set the color of the border
              fontWeight="300" // Make the divider bold
              my={4} // Adjust margin as needed
            />
            <Box>
              <Flex justify="space-between">
                <Text fontWeight="bold">To Pay</Text>
                <Text fontWeight="bold">₹{itemTotal.toFixed(2)}</Text>
              </Flex>
            </Box>
            <Divider
              borderBottomWidth="4px" // Adjust the border width as needed
              borderBottomStyle="solid"
              borderColor="gray" // Set the color of the border
              fontWeight="300" // Make the divider bold
              mt={4} // Adjust margin as needed
            />
            <Box>
              {state === "userin" ? (
                userAddress ? (
                  <>
                    <Text fontSize="15px" fontWeight="bold">
                      {userAddress},{phone}
                    </Text>
                  </>
                ) : (
                  <>
                    <Box>
                      <Text fontSize="20px" fontWeight="900">
                        Add delivery address to proceed order
                      </Text>
                      <Text fontSize="13px">
                        Your delivery fee may change according to your address.
                        please add adress before proceed to pay
                      </Text>
                      <Button
                        my="4"
                        bgColor="white"
                        color="rgb(44, 152, 240)"
                        border="1px solid rgb(44, 152, 240)"
                        w="100%"
                        onClick={handelLocation}
                      >
                        ADD ADDRESS TO PROCEED
                      </Button>
                    </Box>
                  </>
                )
              ) : (
                <Box>
                  <Text fontSize="30px" fontWeight="bold" mb="0">
                    Almost There
                  </Text>
                  <Text fontWeight="10px">
                    {" "}
                    Login or sign up to place order
                  </Text>
                  <Button
                    w="100%"
                    my="4"
                    bgColor="rgb(44, 152, 240)"
                    color="whitesmoke"
                    onClick={() => navigate("/")}
                  >
                    Continue
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Flex w="100%" mt="auto">
            <Box w="50%" bgColor="white">
              <Text pt="4" ps="16" fontWeight="bold">
                To Pay ₹{itemTotal.toFixed(2)}
              </Text>
            </Box>
            <Box w="50%" bgColor="rgb(44, 152, 240)">
              <Text
                pt={{
                  base: "4",
                  md: "4",
                }}
                ps={{
                  base: "14",
                  md: "16",
                }}
                fontWeight="bold"
                cursor="pointer"
                onClick={() => {
                  if (state === "userin" && handelLocation) {
                    Createpayment(itemTotal.toFixed(2));
                  } else {
                    toast({
                      title: "User not logged in",
                      description: "Please LogIn First",
                      duration: 1000,
                      isClosable: true,
                      status: "warning",
                    });
                  }
                }}
              >
                Create order
              </Text>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Center>
          <Text>you don't have any cart items</Text>
        </Center>
      )}
    </Box>
  );
};

export default Cart;
