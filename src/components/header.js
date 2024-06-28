import { Flex, Box, Heading, Spacer, Link } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  const { username } = useAppContext();

  const useRestTest = localStorage.getItem("useRestTest");

  const headerBgColor = useRestTest === "2" ? "red.500" : "#2C0E37";

  return (
    <Flex p="4" bg={headerBgColor} color="white" alignItems="center">
      <Box>
        <Heading size="md">Dellas</Heading>
      </Box>
      <Spacer />
      <Box>
        <RouterLink to="/home" style={{ marginRight: "16px" }}>
          Página Inicial
        </RouterLink>
        <Link ml="4">{username}</Link>
      </Box>
    </Flex>
  );
}

export default Header;
