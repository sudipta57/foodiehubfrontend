import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { FaAddressCard } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const toast = useToast();
  const getUserdata = async () => {
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/getdata",
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
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (!data) {
        console.log("No data received from the server");
        return;
      }

      // Now update the state or perform other actions with the data
      setuser({
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

  const griditems = [
    {
      icon: FaPhone,
      tag: "phone",
      info: "+91823928642",
    },
    {
      icon: MdOutlineEmail,
      tag: "Email",
      info: "ghoramiswapna32@gmail.com",
    },
    {
      icon: FaAddressCard,
      tag: "Address",
      info: "Kakdwip, WB",
    },
  ];

  // we are storing data in userstate

  const handelinput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({
      ...user,
      [name]: value,
    });
  };

  // sending datas to backend

  const sendData = async (e) => {
    e.preventDefault();
    toast({
      title: "wait! 5sec",
      description: "Wait! message sending is in process",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    const { name, email, phone, message } = user;
    try {
      const res = await fetch(
        "https://foodiehub-backend.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast({
          title: "message not send",
          description: "error in message sending",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Message sent successfully",
          description:
            "Message sent successfully, we will contact you within 48 hours",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  const [isMd] = useMediaQuery("(min-width: 48em)");
  return (
    <Stack
      spacing="25"
      bgColor="#F3F3F7"
      pt={{
        base: "10",
        sm: "0",
      }}
      h="90vh"
    >
      <Box paddingTop="18">
        <Grid
          templateColumns={{
            base: "repeat(1, 2fr)",
            md: "repeat(3, 2fr)",
          }}
          gap={6}
          px="16"
        >
          {griditems.map((val) => (
            <GridItem
              w="100%"
              h="16"
              bgColor="white"
              boxShadow="md"
              key={val.icon}
            >
              <Stack>
                <Flex gap="5">
                  <Box pt="3" pl="2">
                    <Icon as={val.icon} color="blueviolet" boxSize="5" />
                  </Box>
                  <Stack>
                    <Text marginBottom="0" fontWeight="bold">
                      {val.tag}
                    </Text>
                    <Text marginTop="-1" fontSize="14">
                      {val.info}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Center>
        <Card boxShadow="md" maxW="900px" w="100%">
          <CardBody p="16">
            <Text fontSize="2xl" fontWeight="bold">
              Get In Touch
            </Text>

            <form method="GET">
              <Flex justify="space-around" py="5">
                <Grid
                  templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} // Adjust the column layout based on screen size
                  gap={4} // Adjust the gap between grid items
                >
                  <GridItem>
                    <FormControl width="100%">
                      <Input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={user.name}
                        onChange={handelinput}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl width="100%">
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={user.email}
                        onChange={handelinput}
                        name="email"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl width="100%">
                      <Input
                        type="number"
                        placeholder="Your Number"
                        value={user.phone}
                        onChange={handelinput}
                        name="phone"
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Flex>
            </form>
            <Stack>
              <Box py="5">
                <Textarea
                  placeholder="Here is a sample placeholder"
                  value={user.message}
                  onChange={handelinput}
                  name="message"
                />
              </Box>
              <Box>
                <Button colorScheme="blue" onClick={sendData}>
                  Send Message
                </Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Stack>
  );
};

export default Contact;
