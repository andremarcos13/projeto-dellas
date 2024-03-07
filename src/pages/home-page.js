import { VStack, Button, Icon, SimpleGrid, Box, Link } from "@chakra-ui/react";
import { MdEvent, MdDateRange, MdList, MdAssignment } from "react-icons/md";
import UserDataHome from "../components/user-data-home";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/agenda");
  };

  return (
    <>
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
            fontSize="2xl"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={MdEvent} boxSize={8} />}
            onClick={handleRoute}
          >
            AGENDA
          </Button>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default HomePage;
