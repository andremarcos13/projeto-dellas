import { VStack, Button, Icon, SimpleGrid, Box, Link } from "@chakra-ui/react";
import { MdEvent, MdDateRange, MdList, MdAssignment } from "react-icons/md";
import UserDataHome from "../components/user-data-home";
import { useNavigate } from "react-router-dom";
import { IoConstruct } from "react-icons/io5";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/agenda");
  };

  return (
    <Box bg="rgba(0,0,0,0.5)" minHeight="100vh" p="6">
      <Box>
        <UserDataHome />
      </Box>
      <VStack spacing="6" h="50vh" justifyContent="center">
        <SimpleGrid columns={[1, 2, 4]} spacingX="8" spacingY="6">
          <Button
            size="lg"
            width="200px"
            height="200px"
            borderRadius="20px"
            colorScheme="gray"
            fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
            padding="4" // Adicionando padding interno para controlar o espaçamento
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={MdEvent} boxSize={8} />}
            onClick={handleRoute}
          >
            AGENDA
          </Button>
          <Button
            size="lg"
            width="200px"
            height="200px"
            borderRadius="20px"
            colorScheme="gray"
            fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
            padding="4" // Adicionando padding interno para controlar o espaçamento
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={IoConstruct} boxSize={8} />}
            // onClick={handleRoute}
          >
            EM CONSTRUÇÃO
          </Button>
          <Button
            size="lg"
            width="200px"
            height="200px"
            borderRadius="20px"
            colorScheme="gray"
            fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
            padding="4" // Adicionando padding interno para controlar o espaçamento
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={IoConstruct} boxSize={8} />}
            // onClick={handleRoute}
          >
            EM CONSTRUÇÃO
          </Button>
          <Button
            size="lg"
            width="200px"
            height="200px"
            borderRadius="20px"
            colorScheme="gray"
            fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
            padding="4" // Adicionando padding interno para controlar o espaçamento
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={IoConstruct} boxSize={8} />}
            // onClick={handleRoute}
          >
            EM CONSTRUÇÃO
          </Button>
          <Button
            size="lg"
            width="200px"
            height="200px"
            borderRadius="20px"
            colorScheme="gray"
            fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
            padding="4" // Adicionando padding interno para controlar o espaçamento
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={IoConstruct} boxSize={8} />}
            // onClick={handleRoute}
          >
            EM CONSTRUÇÃO
          </Button>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default HomePage;
