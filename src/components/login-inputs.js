import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate em vez de useHistory

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const navigate = useNavigate(); // Use useNavigate para navegar entre as rotas

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
    }, 200); // Velocidade de digitação, em milissegundos

    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = () => {
    // Aqui você pode adicionar lógica para lidar com a autenticação
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/home"); // Navegue para a rota "/home" ao clicar no botão "Entrar"
  };

  return (
    <Stack spacing={3} maxW="400px" mx="auto" mt="8">
      <Heading>{welcomeText}</Heading>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu endereço de email"
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha secreta"
        />
      </FormControl>
      <Button colorScheme="green" onClick={handleLogin}>
        Entrar
      </Button>
    </Stack>
  );
}

export default LoginComponent;
