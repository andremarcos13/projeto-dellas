import { VStack, Box, Heading, Text, Flex } from "@chakra-ui/react";

const UserDataHome = () => {
  // Obtenha a data de hoje
  const today = new Date();
  // Formate a data como DD/MM/YYYY
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <VStack spacing="6" h="50%" justifyContent="flex-start" alignItems="center">
      <Box
        maxW="100vw" // Define a largura máxima como 100vw para ocupar toda a largura da tela
        borderWidth="1px"
        borderRadius="lg"
        width="100vh"
        overflow="hidden"
        boxShadow="md"
        p="4"
        flexGrow="1" // Define para ocupar todo o espaço disponível na vertical
        mt="20px"
        bg="rgba(0, 0, 0, 0.2)"
        textAlign="center" // Alinha o texto centralmente dentro do Box
      >
        <Flex direction="column" alignItems="center" mb="4">
          <Heading as="h2" size="lg" mb="2">
            João Carlos
          </Heading>
          <Text fontSize="md" color="gray.500">
            Dev-Lindo
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Ligações Agendadas
            </Text>
            <Text fontSize="2xl" color="blue.500">
              10
            </Text>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Data
            </Text>
            <Text fontSize="2xl" color="blue.500">
              {formattedDate}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Status
            </Text>
            <Text fontSize="2xl" color="green.500">
              Disponível
            </Text>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
};

export default UserDataHome;
