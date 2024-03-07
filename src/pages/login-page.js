import { Box, Flex, Heading } from "@chakra-ui/react";
import LoginComponent from "../components/login-inputs";

const LoginPage = () => {
  return (
    <Flex height="100vh">
      {/* Metade esquerda */}
      <Box width="25%" p="15px" bg="rgba(0,0,0,0.5)">
        <LoginComponent />
      </Box>
      {/* Metade direita */}
      <Box width="75%" p="15px" position="relative">
        <img
          src="https://c.wallhere.com/photos/7b/70/Scania_Truck_vehicle-78949.jpg!d"
          alt="Imagem"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: "0",
            left: "0",
            filter: "blur(10px)",
          }}
        />
        {/* Box para o texto */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
        >
          {/* Box para o fundo opaco */}
          <Box
            bg="rgba(0, 0, 0, 0.5)" // Cor de fundo cinza com opacidade
            py="10" // Adiciona um pouco de espaço acima e abaixo do texto
            px="8" // Adiciona um pouco de espaço à esquerda e à direita do texto
            borderRadius="md" // Borda arredondada
          >
            {/* Texto "DELLAS" com tamanho maior */}
            <Heading
              fontSize="8xl" // Tamanho de fonte maior
              color="white"
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)" // Sombra no texto para melhor visibilidade
              mb="1" // Margem inferior menor
            >
              DELLAS
            </Heading>
            {/* Texto restante com tamanho menor */}
            <Heading
              fontSize="3xl" // Tamanho de fonte menor
              color="white"
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)" // Sombra no texto para melhor visibilidade
            >
              COMÉRCIO E TRANSPORTE
            </Heading>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
