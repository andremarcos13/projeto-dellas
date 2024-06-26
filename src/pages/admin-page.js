import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminPage = () => {
  const { useRestTest, setUseRestTest } = useAppContext();
  const [selectedValue, setSelectedValue] = useState("1"); // Estado para controlar o valor selecionado

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSwitchChange = (value) => {
    setSelectedValue(value); // Atualiza o valor selecionado
    setUseRestTest(value); // Define useRestTest com base no valor selecionado
  };
  console.log("useRestTest", useRestTest);

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
          <RadioGroup value={selectedValue} onChange={handleSwitchChange}>
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="1">
                Produção
              </Radio>
              <Radio colorScheme="red" value="2">
                Teste
              </Radio>
            </Stack>
          </RadioGroup>
        </HStack>
        <Button mt={3} onClick={handleGoHome}>
          Voltar
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminPage;
