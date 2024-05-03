import { Flex, Box, Heading, Spacer, Link } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  const { username, setUsername } = useAppContext();

  return (
    <Flex p="4" bg="#2C0E37" color="white" alignItems="center">
      <Box>
        <Heading size="md">Dellas</Heading>
      </Box>
      <Spacer />
      <Box>
        <RouterLink to="/home" mr="4">
          Página Inicial
        </RouterLink>
        <Link ml="4">{username}</Link>
      </Box>
    </Flex>
  );
}

export default Header;
