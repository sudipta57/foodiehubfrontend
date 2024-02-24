import { Box } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Box w="100%" height="89vh">
      {children}
    </Box>
  );
};

export default Layout;
