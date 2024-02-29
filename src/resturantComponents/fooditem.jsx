import React, { useState } from "react";
import Layout from "./layout";
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const Fooditem = () => {
  const [formData, setFormData] = useState({
    foodcat: "",
    foodname: "",
    image: null,
    pricehalf: "",
    pricefull: "",
    description: "",
  });

  const inputOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fileOnChange = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };
  const toast = useToast();

  const handleSubmit = async () => {
    const { foodcat, foodname, image, pricehalf, pricefull, description } =
      formData;
    try {
      const formData = new FormData();
      formData.append("CategoryName", foodcat);
      formData.append("foodname", foodname);
      formData.append("image", image);
      formData.append("pricehalf", pricehalf);
      formData.append("pricefull", pricefull);
      formData.append("description", description);

      const response = await fetch(
        "https://foodiehub-backend.vercel.app/api/insertFoodData",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message) {
        // Handle success
        toast({
          title: "Food item saved",
          description: `We've saved your food item, ${data.message}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setFormData({
          foodcat: "",
          foodname: "",
          image: null,
          pricehalf: "",
          pricefull: "",
          description: "",
        });
      } else {
        // Handle error
        toast({
          title: "Failed to insert data:",
          description: data.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <Layout>
      <Box p="10" h="auto">
        <Card maxW="700px" h="100%" m="auto" shadow="lg">
          <Box p="6">
            <Text textAlign="center" fontSize="2xl" fontWeight="bold">
              Add Food Item
            </Text>
            <form method="POST" encType="multipart/form-data">
              <Stack>
                <FormControl>
                  <Flex justify="space-between">
                    <FormLabel>Add Food_Catagory :</FormLabel>
                    <Input
                      type="text"
                      w="400px"
                      required
                      name="foodcat"
                      onChange={inputOnChange}
                      m="auto"
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex justify="space-between">
                    <FormLabel>Add Food_Name :</FormLabel>
                    <Input
                      type="text"
                      w="400px"
                      required
                      name="foodname"
                      onChange={inputOnChange}
                      m="auto"
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex justify="space-between">
                    <FormLabel>Add Food_Image :</FormLabel>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      w="400px"
                      required
                      onChange={fileOnChange}
                      m="auto"
                    />
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex justify="space-between">
                    <FormLabel>Add Food_Price :</FormLabel>
                    <Flex justify="space-between" w="50%">
                      <Flex justify="space-between" w="40%">
                        <Text pt="2">Half</Text>
                        <Input
                          type="text"
                          w="100px"
                          required
                          name="pricehalf"
                          onChange={inputOnChange}
                          m="auto"
                        />
                      </Flex>
                      <Flex justify="space-between" w="40%">
                        <Text pt="2">Full</Text>
                        <Input
                          type="text"
                          w="100px"
                          required
                          name="pricefull"
                          onChange={inputOnChange}
                          m="auto"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex justify="space-between">
                    <FormLabel>Add Food_Description :</FormLabel>
                    <Input
                      type="text"
                      w="400px"
                      required
                      name="description"
                      onChange={inputOnChange}
                      m="auto"
                    />
                  </Flex>
                </FormControl>
              </Stack>
            </form>
            {/* Your existing JSX code ... */}
            <Button
              w="150px"
              textAlign="center"
              m="auto"
              mb="6"
              onClick={handleSubmit}
            >
              Add Food Item
            </Button>
          </Box>
        </Card>
      </Box>
    </Layout>
  );
};

export default Fooditem;
