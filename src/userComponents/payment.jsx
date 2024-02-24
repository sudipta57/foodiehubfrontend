import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
const Payment = () => {
  return (
    <Box>
      <Card w="500px" m="auto" h="92vh" p="6">
        <Flex w="100%" justify="space-between">
          <Text textAlign="center" fontSize="30px" fontWeight="700">
            Payments
          </Text>
          <Tag h="10px" mt="3">
            100% secure
          </Tag>
        </Flex>
        <Flex
          w="100%"
          h="50px"
          borderRadius="10px"
          justify="space-between"
          my="1"
          p="2"
          bgColor="rgb(231, 231, 245)"
        >
          <Text
            textAlign="center"
            fontSize="17px"
            mt="1"
            fontWeight="600"
            colorScheme="primary"
            color="rgb(97, 97, 212)"
          >
            Total Amount
          </Text>
          <Text h="10px" mt="1" color="blue">
            ₹242
          </Text>
        </Flex>
        <Box
          w="100%"
          h="50px"
          borderRadius="10px"
          justify="space-between"
          my="2"
          p="2"
        >
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Flex justify="space-between" w="13%">
                      <FaMoneyCheckDollar />
                      <Text fontWeight="bold">UPI</Text>
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl>
                  <FormLabel>UPI ID</FormLabel>
                  <InputGroup>
                    <Input type="email" />
                    <InputRightElement width="4.5rem">
                      <Button>Verify</Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button w="100%" mt="4">
                  Pay ₹242
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowMultiple my="10">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontWeight="bold">Cash On Delivery</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Button w="100%" mt="4">
                  Pay on delivery ₹242
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Card>
    </Box>
  );
};

export default Payment;
