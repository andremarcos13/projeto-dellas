import React, { useState, useEffect } from "react";
import { VStack, Box, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { MdPhone, MdToday, MdOfflinePin } from "react-icons/md"; // Importa os ícones relevantes
import { FaClock } from "react-icons/fa";

const UserDataHome = () => {
  // Obtenha a data de hoje
  const today = new Date();
  // Formate a data como DD/MM/YYYY
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;

  // Estado para armazenar a hora atual
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza a hora atual a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formata a hora atual como HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString();

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
        // bg="rgba(0, 0, 0, 0.2)"
        bg="#EDF2F7"
        textAlign="center" // Alinha o texto centralmente dentro do Box
      >
        <Flex justify="space-around">
          <Box>
            <Icon as={MdPhone} boxSize={8} color="#1A202C" mb="2" />
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Ligações
            </Text>
            <Text fontSize="2xl" color="#1A202C">
              10
            </Text>
          </Box>
          <Box>
            <Icon as={MdToday} boxSize={8} color="#1A202C" mb="2" />
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Data
            </Text>
            <Text fontSize="2xl" color="#1A202C">
              {formattedDate}
            </Text>
          </Box>

          <Box>
            <Icon as={FaClock} boxSize={8} color="#1A202C" mb="2" />
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Hora
            </Text>
            <Text fontSize="2xl" color="#1A202C">
              {formattedTime}
            </Text>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
};

export default UserDataHome;
