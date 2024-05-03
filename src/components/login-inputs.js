import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Alert,
  AlertIcon,
  Box,
  Fade,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { getToken } from "../apis/token-api";
import { BeatLoader } from "react-spinners";
import { MdEmail, MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false); // Alterado para false inicialmente
  const [welcomeText, setWelcomeText] = useState("");
  const [error, setError] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const { username, setUsername } = useAppContext();
  const { password, setPassword } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const welcomeString = "Bem-vindo!";
  //   let i = 0;
  //   const intervalId = setInterval(() => {
  //     setWelcomeText((prevText) => {
  //       if (i < welcomeString.length) {
  //         return prevText + welcomeString[i++];
  //       } else {
  //         clearInterval(intervalId);
  //         return prevText;
  //       }
  //     });
  //   }, 200);

  //   return () => clearInterval(intervalId);
  // }, []);

  const handleLogin = async () => {
    setIsLoading(true); // Alterado para true ao iniciar o login
    if (!username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      setIsErrorVisible(true);
      setIsLoading(false); // Alterado para false quando houver um erro
      return;
    }

    try {
      const token = await getToken(username, password);

      console.log("Token:", token);

      setGlobalToken(token);

      // Verifica se o token foi recebido com sucesso
      if (token && token.access_token) {
        console.log("Login bem-sucedido.");
        console.log("Token global:", globalToken);
        setIsLoading(false); // Alterado para false após login bem-sucedido

        navigate("/home");
      } else {
        setError(
          "Credenciais inválidas. Por favor, verifique seu usuário e senha."
        );
        setIsErrorVisible(true);
        setIsLoading(false); // Alterado para false quando houver um erro
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false); // Alterado para false quando houver um erro

      setError(
        "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde."
      );
      setIsErrorVisible(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box>
      <Stack spacing={3} maxW="400px" mx="auto" mt="8">
        <FormControl id="email">
          <FormLabel htmlFor="email" display="flex" alignItems="center">
            <Box as={FaUser} color="gray.400" mr="2" />
            Usuário
          </FormLabel>
          <Input
            focusBorderColor="purple.700" // Definindo a cor da borda quando em foco como verde
            type="email"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ex: JOÃO CARLOS"
            onKeyPress={handleKeyPress}
            leftIcon={<MdEmail />}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel htmlFor="password" display="flex" alignItems="center">
            <Box as={MdLock} color="gray.400" mr="2" />
            Senha
          </FormLabel>
          <Input
            focusBorderColor="purple.700" // Definindo a cor da borda quando em foco como verde
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            onKeyPress={handleKeyPress}
            leftIcon={<MdLock />}
          />
        </FormControl>
        <Button
          color="white"
          bg="#2C0E37"
          onClick={handleLogin}
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
        >
          Entrar
        </Button>
      </Stack>
      <Fade in={isErrorVisible}>
        <Alert
          status="error"
          mt="15px"
          borderRadius="9px"
          width="405px"
          transition="opacity 0.3s ease"
        >
          <AlertIcon />
          {error}
        </Alert>
      </Fade>
    </Box>
  );
}

export default LoginComponent;
