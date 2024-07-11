import { Flex, Box, Heading, Spacer, Link } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";

function Header() {
  const { username } = useAppContext();
  const navigate = useNavigate();

  const useRestTest = localStorage.getItem("useRestTest");

  const headerBgColor = useRestTest === "2" ? "red.500" : "#2C0E37";
  const headerText = useRestTest === "2" ? "Dellas - ambiente test" : "Dellas";

  const handleStartAtendimento = () => {
    navigate("/atendimento");
  };

  return (
    <Flex
      p="4"
      bg={headerBgColor}
      color="white"
      alignItems="center"
      position="relative"
    >
      <Box>
        <Heading size="md">{headerText}</Heading>
      </Box>
      <Spacer />
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        alignItems="center"
      >
        <Box position="relative" display="flex" alignItems="center" p={3}>
          <Link
            ml="4"
            onClick={handleStartAtendimento}
            style={{ cursor: "pointer" }}
          >
            Iniciar Atendimento
          </Link>
          <Box ml="4">
            <FaHeadphones size="24px" />
          </Box>
        </Box>
      </Box>
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
