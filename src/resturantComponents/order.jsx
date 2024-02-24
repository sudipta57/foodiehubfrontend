import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import Layout from "./layout";
const Order = () => {
  return (
    <Layout>
      <Stack textAlign="center">
        <Text fontWeight="bold" fontSize="7xl">
          Welcome Mio Amore
        </Text>
        <Text fontSize="4xl" fontWeight="700" color="purple">
          There is no order right now
        </Text>
      </Stack>
    </Layout>
  );
};

export default Order;
