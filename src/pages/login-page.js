import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import LoginComponent from "../components/login-inputs";
import { CiUnlock } from "react-icons/ci";
import imagelogo from "../images/205677077_207379361390501_3299387424663450272_n-removebg-preview.png";

const LoginPage = () => {
  return (
    <Flex
      minHeight="100vh"
      bgGradient="linear(to-r, #2C0E37, #8A2387)"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p="5"
        borderRadius="lg"
        // Adiciona uma animação na sombra
        animation="shadowAnimate 2s infinite alternate"
        textAlign="center"
      >
        <style>
          {`
            @keyframes shadowAnimate {
              30% {
                box-shadow: 0 0 10px rgba(106, 90, 205, 0.5);
              }
              100% {
                box-shadow: 0 0 25px rgba(180, 180, 180, 0.8);
              }
            }
          `}
        </style>
        <Image
          src={imagelogo}
          alt="Dellas Logo"
          maxW="230px" // Defina o tamanho máximo da imagem
          maxH="230px"
          mb="2" // Adiciona margem na parte inferior da imagem
          mx="auto" // Centraliza a imagem horizontalmente
        />
        {/* <Heading as="h1" size="lg" color="gray.800">
          Bem-vindo!
        </Heading> */}
        <LoginComponent />
      </Box>
    </Flex>
  );
};

export default LoginPage;
