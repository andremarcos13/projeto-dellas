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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [error, setError] = useState("");
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

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/home");
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
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button colorScheme="green" onClick={handleLogin}>
          Entrar
        </Button>
      </Stack>
    </Box>
  );
}

export default LoginComponent;
