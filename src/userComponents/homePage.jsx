import React, { useContext, useState } from "react";
// import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MyContext } from "../App";
import ResturantCard from "./minicomponent/resturantCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const toast = useToast();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const {
    state,
    dispatch,
    userinfo,
    setuserinfo,
    resturantinfo,
    setresturantinfo,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const switchToLogin = () => {
    setIsLoginForm(true);
  };

  const switchToSignup = () => {
    setIsLoginForm(false);
  };
  //saving the data in state
  const onresturantInputChange = (e) => {
    const { name, value } = e.target;
    setresturantinfo({ ...resturantinfo, [name]: value });
  };
  //saving the data in state
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setuserinfo({ ...userinfo, [name]: value });
  };
  // sending user data to the backend

  const sendData = async (e) => {
    // const navigate = useNavigate();
    e.preventDefault();
    const { email, password } = userinfo;
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      try {
        await res.json();
        if (!res.ok) {
          toast({
            title: "Invalid Log in ",
            description: "error in Log in",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else if (res.status == 200) {
          toast({
            title: "Logged in succesfully",
            description: "User Log in successfully ",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setuserinfo({ email: "", password: "" });
          dispatch({ type: "USERIN" });
          // navigate("/");
        }
      } catch (error) {
        window.alert(error);
      }
    } catch (error) {
      window.alert(error);
    }
  };
  // send resturant data
  const sendresturantData = async (e) => {
    // const navigate = useNavigate();
    e.preventDefault();
    const { email, password } = resturantinfo;
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/resturantlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      try {
        const data = await res.json();
        if (!res.ok || !data) {
          toast({
            title: "resturant Log in invalid",
            description: "error in Log in",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else if (res.status == 200) {
          toast({
            title: "Logged in succesfully",
            description: "Resturant Log In Successful",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          dispatch({ type: "RESTURANTIN" });

          navigate("/orders");
        }
      } catch (error) {
        window.alert(error);
      }
    } catch (error) {
      window.alert(error);
    }
  };
  return (
    <>
      <div
        id="homepage"
        style={{ height: state === "userin" ? "30vh" : "100vh" }}
      >
        <div className="container">
          <Flex
            flexDirection={{
              base: "column",
              sm: "row",
            }}
            py="10"
            justify="space-between"
          >
            <Stack maxW="700px" justify="center">
              <Text fontSize="2.5vw" fontWeight="bold">
                Be the Fastest In Delhivery Your
                <Text as="span" color="#a5910a" ps="23px">
                  Food
                </Text>
              </Text>
              <Text fontSize="1.5vw" fontWeight="bold">
                We Are The Best In The Town
              </Text>
              {state == false ? (
                <Button
                  w="200px"
                  color="#a5910a"
                  bgColor="f0f1f0"
                  fontWeight="bold"
                >
                  LogIn to Make orders
                </Button>
              ) : (
                ""
              )}
            </Stack>
            {state === "userin" ? (
              <Box maxW="600px" textAlign="center">
                <Text fontSize="2.5vw" fontWeight="bold" pt="10" px="10">
                  You can <span style={{ color: "white" }}> place order</span>
                  <span style={{ color: "#a5910a" }}> from the Listed </span>
                  <span style={{ color: "white" }}> resturants </span>
                </Text>
              </Box>
            ) : (
              <Flex
                w={{
                  base: "",
                  md: "490px",
                }}
                m="auto"
                mt="16"
              >
                <div className="wrapper" style={{ background: "transparent" }}>
                  <div className="title-text">
                    <div
                      className={`title ${isLoginForm ? "login" : "signup"}`}
                    >
                      <Text fontWeight="bold">Sign In as a</Text>
                    </div>
                  </div>
                  <div className="form-container">
                    <div className="slide-controls">
                      <input
                        type="radio"
                        name="slide"
                        id="login"
                        checked={isLoginForm}
                        onChange={switchToLogin}
                      />
                      <input
                        type="radio"
                        name="slide"
                        id="signup"
                        checked={!isLoginForm}
                        onChange={switchToSignup}
                      />
                      <label
                        htmlFor="login"
                        className={`slide login ${isLoginForm ? "active" : ""}`}
                      >
                        User
                      </label>
                      <label
                        htmlFor="signup"
                        className={`slide signup ${
                          !isLoginForm ? "active" : ""
                        }`}
                      >
                        Resturant
                      </label>
                      <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                      {isLoginForm ? (
                        //user form
                        <form method="POST" w="50%">
                          <Stack spacing="4">
                            <FormControl>
                              <Input
                                name="email"
                                type="email"
                                placeholder="Enter Your Email"
                                onChange={onInputChange}
                                bg="white"
                              />
                            </FormControl>

                            <FormControl>
                              <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={onInputChange}
                                bg="white"
                              />
                            </FormControl>

                            <Button
                              w="100px"
                              colorScheme="green"
                              m="auto"
                              onClick={sendData}
                            >
                              Sign Up
                            </Button>
                          </Stack>
                        </form>
                      ) : (
                        //resturant form
                        <form action="" method="POST" w="50%">
                          <Stack spacing="4">
                            <FormControl>
                              <Input
                                name="email"
                                type="email"
                                placeholder="Enter Your Email"
                                onChange={onresturantInputChange}
                                bg="white"
                              />
                            </FormControl>

                            <FormControl>
                              <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={onresturantInputChange}
                                bg="white"
                              />
                            </FormControl>

                            <Button
                              w="100px"
                              colorScheme="green"
                              m="auto"
                              onClick={sendresturantData}
                            >
                              Sign Up
                            </Button>
                          </Stack>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </Flex>
            )}
          </Flex>
        </div>
      </div>
      {state === "userin" ? <ResturantCard /> : ""}
    </>
  );
};

export default HomePage;
