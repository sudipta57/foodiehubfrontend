import {
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import reducer, { initialval } from "./reducer/registrationReducer";
const Registration = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initialval);

  // getting secret code

  const getsecretcode = async () => {
    const res = await fetch(
      "https://foodiehubbackend.onrender.com/api/getcode",
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
    console.log(data.seccode);
    dispatch({ type: "codedata", payload: data.seccode });
  };
  useEffect(() => {
    getsecretcode();
  }, []);

  const switchToLogin = () => {
    setIsLoginForm(true);
  };

  const switchToSignup = () => {
    setIsLoginForm(false);
  };
  const navigate = useNavigate();
  //saving normal user's data
  const [userinfo, setuserinfo] = useState({});

  //saving the data in state
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setuserinfo({ ...userinfo, [name]: value });
  };
  // sending to the backend

  const sendData = async (e) => {
    // const navigate = useNavigate();
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = userinfo;
    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            phone,
            work,
            password,
            cpassword,
          }),
        }
      );
      try {
        const data = await res.json();
        if (!res.ok) {
          toast({
            title: "error occured",
            description: data.error,
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        } else if (res.status == 201) {
          toast({
            title: "registered successfull",
            description: "Your account have registered successfully",
            status: "success",
            duration: 1000,
            isClosable: true,
          });

          navigate("/");
        }
      } catch (error) {
        window.alert(error);
      }
    } catch (error) {
      window.alert(error);
    }
  };

  //saving resturant's  data
  const [resturantinfo, setresturantinfo] = useState({});

  //saving the data in state
  const onresturantInputChange = (e) => {
    const { name, value } = e.target;
    setresturantinfo({ ...resturantinfo, [name]: value });
  };
  // sending to the backend

  const sendresturantData = async (e) => {
    // const navigate = useNavigate();
    e.preventDefault();
    const { name, email, phone, address, password, cpassword } = resturantinfo;
    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/resturantregistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            password,
            cpassword,
          }),
        }
      );
      try {
        const data = await res.json();
        if (!res.ok) {
          toast({
            title: "error occured",
            description: data.error,
            duration: 1000,
            isClosable: true,
            status: "error",
          });
        } else if (res.status == 201) {
          toast({
            title: "Registration successfull",
            description: "You have registered successfully ",
            duration: 1000,
            isClosable: true,
            status: "success",
          });

          navigate("/");
        }
      } catch (error) {
        window.alert(error);
      }
    } catch (error) {
      window.alert(error);
    }
  };

  const handleVerifyClick = async () => {
    dispatch({ type: "loading", payload: true });
    const { email } = userinfo;
    //now start the server side code

    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/createotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
          }),
        }
      );
      const data = await res.json();
      setuserinfo({ ...userinfo, otp: data.otp });
      if (!res.ok) {
        dispatch({ type: "loading", payload: false });
        toast({
          title: "error occured",
          description: "message not sending pls refresh the app",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        dispatch({ type: "loading", payload: false });
        toast({
          title: "OTP sent",
          description: "OTP sent to your mail please check your mail",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        dispatch({ type: "otpsendVerify", payload: true });
      }
    } catch (error) {
      toast({
        title: "error occured",
        description: error,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const reshandleVerifyClick = async () => {
    dispatch({ type: "resloading", payload: true });
    const { email } = resturantinfo;
    console.log(email);
    //now start the server side code

    try {
      const res = await fetch(
        "https://foodiehubbackend.onrender.com/api/createresotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
          }),
        }
      );
      const data = await res.json();
      setresturantinfo({ ...resturantinfo, otp: data.otp });
      if (!res.ok) {
        dispatch({ type: "resloading", payload: false });
        toast({
          title: "error occured",
          description: "message not sending pls refresh the app",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        dispatch({ type: "resloading", payload: false });
        toast({
          title: "OTP sent",
          description: "OTP sent to your mail please check your mail",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        dispatch({ type: "resotpsendVerify", payload: true });
      }
    } catch (error) {
      toast({
        title: "error occured",
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  /// onchange event handeler for otp for user

  const otponclick = () => {
    const { InputOtp, otp } = userinfo;
    if (InputOtp === otp) {
      toast({
        title: "Otp verified",
        description: "Otp verified successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      dispatch({ type: "otpVerify", payload: true });
    } else {
      toast({
        title: "wrong otp",
        description: "Otp isn't maching",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const resotponclick = () => {
    const { InputOtp, otp } = resturantinfo;
    console.log(InputOtp, otp);
    if (InputOtp === otp) {
      toast({
        title: "Otp verified",
        description: "Otp verified successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      dispatch({ type: "resotpVerify", payload: true });
    } else {
      toast({
        title: "wrong otp",
        description: "Otp isn't maching",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  // checking if the secret code which is input by user correct or not

  const codeOnClick = (e) => {
    const { secretCode } = resturantinfo;
    const { codedata } = state;
    if (
      secretCode &&
      (secretCode === codedata ||
        codedata.some((obj) => obj.seccode === secretCode))
    ) {
      toast({
        title: "Code matched",
        description: "Your code is matched ",
        duration: 1500,
        status: "success",
        isClosable: true,
      });
      dispatch({ type: "codematch", payload: true });
    } else {
      toast({
        title: "Code is not matching",
        description: "Your code is not matching",
        duration: 1500,
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <Flex maxW="500px" m="auto" mt="16">
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLoginForm ? "login" : "signup"}`}>
            <Text fontWeight="bold">Sign Up as a</Text>
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
              className={`slide signup ${!isLoginForm ? "active" : ""}`}
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
                      name="name"
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={onInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={onInputChange}
                      />
                      <InputRightElement width="4.5rem">
                        {state.loading ? (
                          <Spinner size="sm" color="green" />
                        ) : state.otpsendVerify ? (
                          <IconButton
                            isRound={true}
                            variant="solid"
                            colorScheme="teal"
                            aria-label="Done"
                            fontSize="20px"
                            icon={<CheckIcon />}
                          />
                        ) : (
                          <Button
                            h="1.75rem"
                            size="sm"
                            me="2"
                            onClick={handleVerifyClick}
                          >
                            send otp
                          </Button>
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl display={!state.loading ? "block" : "none"}>
                    <InputGroup>
                      <Input
                        name="InputOtp"
                        type="number"
                        placeholder="Enter Your otp"
                        onChange={onInputChange}
                      />
                      <InputRightElement width="4.5rem">
                        {state.otpVerify ? (
                          <IconButton
                            isRound={true}
                            variant="solid"
                            colorScheme="teal"
                            aria-label="Done"
                            fontSize="20px"
                            icon={<CheckIcon />}
                          />
                        ) : (
                          <Button h="1.75rem" size="sm" onClick={otponclick}>
                            verify
                          </Button>
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <Input
                      name="phone"
                      type="number"
                      placeholder="Enter Your Number"
                      onChange={onInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      name="work"
                      type="text"
                      placeholder=" Your Work"
                      onChange={onInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={onInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      name="cpassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={onInputChange}
                    />
                  </FormControl>
                  <Button
                    w="100px"
                    colorScheme="green"
                    m="auto"
                    onClick={
                      state.otpVerify
                        ? sendData
                        : () => {
                            toast({
                              title: "Error",
                              description: "Please verify the email",
                              duration: 1500,
                              status: "error",
                              isClosable: true,
                            });
                          }
                    }
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
                      name="name"
                      type="text"
                      placeholder="Enter Your Resturant Name"
                      onChange={onresturantInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={onresturantInputChange}
                      />
                      <InputRightElement width="4.5rem">
                        {state.resloading ? (
                          <Spinner size="sm" color="green" />
                        ) : state.resotpsendVerify ? (
                          <IconButton
                            isRound={true}
                            variant="solid"
                            colorScheme="teal"
                            aria-label="Done"
                            fontSize="20px"
                            icon={<CheckIcon />}
                          />
                        ) : (
                          <Button
                            h="1.75rem"
                            size="sm"
                            me="2"
                            onClick={reshandleVerifyClick}
                          >
                            send otp
                          </Button>
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl display={!state.resloading ? "block" : "none"}>
                    <InputGroup>
                      <Input
                        name="InputOtp"
                        type="number"
                        placeholder="Enter Your otp"
                        onChange={onresturantInputChange}
                      />
                      <InputRightElement width="4.5rem">
                        {state.resotpVerify ? (
                          <IconButton
                            isRound={true}
                            variant="solid"
                            colorScheme="teal"
                            aria-label="Done"
                            fontSize="20px"
                            icon={<CheckIcon />}
                          />
                        ) : (
                          <Button h="1.75rem" size="sm" onClick={resotponclick}>
                            verify
                          </Button>
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <Input
                      name="phone"
                      type="number"
                      placeholder="Enter Your Number"
                      onChange={onresturantInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      name="address"
                      type="text"
                      placeholder=" Resturant Address"
                      onChange={onresturantInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={onresturantInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      name="cpassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={onresturantInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        name="secretCode"
                        type="text"
                        placeholder="Enter your secret code"
                        onChange={onresturantInputChange}
                      />
                      <InputRightElement>
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={codeOnClick}
                          me="2"
                          w=""
                        >
                          verify
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    w="100px"
                    colorScheme="green"
                    m="auto"
                    onClick={
                      state.codematch
                        ? sendresturantData
                        : () => {
                            toast({
                              title: "Error occured",
                              description:
                                "please fill the all inputs and provide the secret code",
                              duration: 2000,
                              status: "error",
                              isClosable: true,
                            });
                          }
                    }
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
  );
};

export default Registration;
