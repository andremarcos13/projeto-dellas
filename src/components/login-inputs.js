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
import fetchCodUser from "../apis/cod-user-api";
import { BeatLoader } from "react-spinners";

function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false); // Alterado para false inicialmente
  const [welcomeText, setWelcomeText] = useState("");
  const [error, setError] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const { username, setUsername } = useAppContext();
  const { password, setPassword } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    const welcomeString = "Bem-vindo!";
    let i = 0;
    const intervalId = setInterval(() => {
      setWelcomeText((prevText) => {
        if (i < welcomeString.length) {
          return prevText + welcomeString[i++];
        } else {
          clearInterval(intervalId);
          return prevText;
        }
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

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

      const codUser = await fetchCodUser(token.access_token);
      console.log("codUser", codUser);
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
        <Heading>{welcomeText}</Heading>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Seu endereço de email"
            onKeyPress={handleKeyPress}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha secreta"
            onKeyPress={handleKeyPress}
          />
        </FormControl>
        <Button
          colorScheme="green"
          onClick={handleLogin}
          isLoading={isLoading} // Alterado para isLoading
          spinner={<BeatLoader size={8} color="white" />} // Adicionado spinner
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
          ml="23px"
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
