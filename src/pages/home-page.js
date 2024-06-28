import {
  VStack,
  Button,
  Icon,
  SimpleGrid,
  Box,
  Link,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { MdEvent, MdDateRange, MdList, MdAssignment } from "react-icons/md";
import UserDataHome from "../components/user-data-home";
import { useNavigate } from "react-router-dom";
import { IoConstruct } from "react-icons/io5";
import BreadCrumbLinks from "../components/breadcumber";
import { useAppContext } from "../context/AppContext";
import fetchCodUser from "../apis/cod-user-api";
import { useEffect, useState } from "react";
import { fetchToken } from "../apis/token-api";
import Header from "../components/header";
import { FaMap } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const { username, setUsername } = useAppContext();
  const { userCod, setUserCod } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();
  const { password, setPassword } = useAppContext();
  const [userFound, setUserFound] = useState(false); // Variável de controle para interromper a chamada da API
  const [isLoading, setIsLoading] = useState(false);

  console.log("username home", username);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchCodUser(globalToken.access_token);
        const { items, hasNext: next } = response;

        // Verificar se encontramos o usuário
        const user = items.find((item) => item.u7_nome.includes(username));
        if (user) {
          console.log("Usuário encontrado:", userCod);
          setUserData(user);
          setUserCod(user.u7_codusu);
          setUserFound(true); // Define que o usuário foi encontrado e interrompe a chamada da API

          console.log("userCoduserCod", userCod);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setIsLoading(true);

        // Se ocorrer um erro, obter um novo token e tentar novamente
        try {
          setIsLoading(true);

          const newToken = await fetchToken(username, password); // Substitua 'password' pelo valor correto
          setGlobalToken(newToken); // Atualiza o token global
          console.log("Novo token obtido:", newToken);

          // Após obter o novo token, fazer uma nova requisição com o token atualizado
          const newResponse = await fetchCodUser(newToken.access_token, 1);
          const { items } = newResponse;

          // Verificar se encontramos o usuário
          const user = items.find((item) => item.u7_nome.includes(username));
          if (user) {
            console.log("Usuário encontrado:", userCod);
            setUserData(user);
            setUserCod(user.u7_codusu);
            console.log("userCoduserCod", userCod);
            setUserFound(true); // Define que o usuário foi encontrado e interrompe a chamada da API
            setIsLoading(false);
          }
        } catch (tokenError) {
          console.error("Erro ao obter novo token:", tokenError);
          // Trate o erro ao obter o novo token conforme necessário
        }
      }
    };

    fetchData();
  }, [globalToken.access_token, username, setGlobalToken, setUserFound]);

  const navigate = useNavigate();

  if (username === "" || password === "") {
    navigate("/error"); // Limpar selectedItem ao clicar no botão Voltar
  }

  const handleRoute = () => {
    navigate("/agenda");
  };
  const handleRoute2 = () => {
    navigate("/maps");
  };
  const handleRoute3 = () => {
    navigate("/atendimento");
  };

  return (
    // bg="rgba(0,0,0,0.5)"
    <Box minHeight="100vh" py="0" px="0" bg="rgba(0,0,0,0.1)">
      <Box>
        <Header />
        <UserDataHome />
      </Box>
      {isLoading ? (
        <Center mt="15%">
          <Spinner size="xl" color="#1A202C" />
        </Center>
      ) : (
        <VStack spacing="6" h="50vh" justifyContent="center">
          <SimpleGrid columns={[1, 2, 4]} spacingX="8" spacingY="6">
            <Button
              size="lg"
              width="200px"
              height="200px"
              borderRadius="20px"
              colorScheme="gray"
              fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
              padding="4" // Adicionando padding interno para controlar o espaçamento
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              leftIcon={<Icon as={MdEvent} boxSize={8} />}
              onClick={handleRoute}
            >
              AGENDA
            </Button>
            {/* <Button
            size="lg"
            width="200px"
            height="200px"
            borderRadius="20px"
            colorScheme="gray"
            fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
            padding="4" // Adicionando padding interno para controlar o espaçamento
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            leftIcon={<Icon as={FaMap} boxSize={8} />}
            onClick={handleRoute2}
          >
            MAPA
          </Button> */}
            <Button
              size="lg"
              width="200px"
              height="200px"
              borderRadius="20px"
              colorScheme="gray"
              fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
              padding="4" // Adicionando padding interno para controlar o espaçamento
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              leftIcon={<Icon as={RiCustomerService2Fill} boxSize={8} />}
              onClick={handleRoute3}
            >
              REALIZAR
              <br /> ATENDIMENTO
            </Button>
            {/* <Button
              size="lg"
              width="200px"
              height="200px"
              borderRadius="20px"
              colorScheme="gray"
              fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
              padding="4" // Adicionando padding interno para controlar o espaçamento
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              leftIcon={<Icon as={IoConstruct} boxSize={8} />}
              // onClick={handleRoute}
            >
              EM CONSTRUÇÃO
            </Button>
            <Button
              size="lg"
              width="200px"
              height="200px"
              borderRadius="20px"
              colorScheme="gray"
              fontSize="lg" // Reduzindo o tamanho da fonte para "lg"
              padding="4" // Adicionando padding interno para controlar o espaçamento
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              leftIcon={<Icon as={IoConstruct} boxSize={8} />}
              // onClick={handleRoute}
            >
              EM CONSTRUÇÃO
            </Button> */}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
};

export default HomePage;
