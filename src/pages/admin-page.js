import React from "react";
import { Box, Button, HStack, Switch, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminPage = () => {
  const { useRestTest, setUseRestTest } = useAppContext();

  console.log("useRestTest", useRestTest);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSwitchChange = (event) => {
    setUseRestTest(event.target.checked);
  };

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      bg="gray.300"
      borderRadius="30px"
      maxW="300px"
      mt="15px"
      ml="100px"
    >
      <VStack>
        <HStack spacing={4} align="center">
          <Text>Produção</Text>
          <Switch
            size="lg"
            isChecked={useRestTest}
            onChange={handleSwitchChange}
          />
          <Text>Teste</Text>
        </HStack>
        <Button mt={3} onClick={handleGoHome}>
          Voltar
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminPage;
