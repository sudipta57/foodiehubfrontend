import {
  Box,
  Button,
  Center,
  Text,
  Toast,
  space,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Paymentsuccess = () => {
  const Navigate = useNavigate();
  const toast = useToast();
  const sendmailtoResturant = async () => {
    toast({
      title: "Item ordered",
      description: "Your food is ordered ",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    Navigate("/");
  };

  return (
    <Center w="100%" h="85vh">
      <Text m="auto" fontSize="6xl" fontWeight="900" textAlign="center">
        Your payment have <Text color="green">succeded</Text>
        <Text>make sure to click the continue button</Text>
        <Button onClick={sendmailtoResturant} colorScheme="green">
          Continue
        </Button>
      </Text>
    </Center>
  );
};

export default Paymentsuccess;
