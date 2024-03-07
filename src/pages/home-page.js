import { VStack, Button, Icon, SimpleGrid, Box } from "@chakra-ui/react";
import { MdEvent, MdDateRange, MdList, MdAssignment } from "react-icons/md";
import UserDataHome from "../components/user-data-home";

const HomePage = () => {
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
            bg="rgba(0, 0, 0, 0.2)"
            fontSize="2xl"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={MdEvent} boxSize={8} />}
          >
            AGENDA
          </Button>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default HomePage;
