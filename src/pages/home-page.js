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
import fetchTransportadoras from "../apis/transportadoras-api";
import fetchCondPagamentos from "../apis/cond-pagamento";
import fetchOperadores from "../apis/operadores-api";

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
        console.log("Fetching user data...");
        const response = await fetchCodUser(globalToken.access_token);
        console.log("User data fetched:", response);

        const response_trans = await fetchTransportadoras(
          globalToken.access_token
        );
        console.log("Transportadoras fetched:", response_trans);

        const response_cond = await fetchCondPagamentos(
          globalToken.access_token
        );
        console.log("Condições de Pagamento fetched:", response_cond);

        const response_operadores = await fetchOperadores({
          empresa: "01",
          filial: "01",
          token: globalToken.access_token,
        });
        console.log("Operadores fetched:", response_operadores);

        const operadoresString = JSON.stringify(response_operadores.items);
        sessionStorage.setItem("operadores", operadoresString);

        const transportadorasString = JSON.stringify(response_trans.items);
        sessionStorage.setItem("transportadoras", transportadorasString);

        const condPagamentosString = JSON.stringify(response_cond.items);
        sessionStorage.setItem("condPagamentos", condPagamentosString);

        const { items } = response;
        const user = items.find((item) => item.u7_nome.includes(username));

        if (user) {
          setUserData(user);
          setUserCod(user.u7_codusu);
          setUserFound(true);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);

        try {
          console.log("Fetching new token...");
          const newToken = await fetchToken(username, password);
          setGlobalToken(newToken);
          console.log("New token obtained:", newToken);

          const newResponse = await fetchCodUser(newToken.access_token, 1);
          console.log("New user data fetched:", newResponse);

          const { items } = newResponse;
          const user = items.find((item) => item.u7_nome.includes(username));
          if (user) {
            setUserData(user);
            setUserCod(user.u7_codusu);
            setUserFound(true);
          }
        } catch (tokenError) {
          console.error("Erro ao obter novo token:", tokenError);
        }
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
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
