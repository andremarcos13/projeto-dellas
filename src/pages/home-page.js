import { VStack, Button, Icon, SimpleGrid, Box, Link } from "@chakra-ui/react";
import { MdEvent, MdDateRange, MdList, MdAssignment } from "react-icons/md";
import UserDataHome from "../components/user-data-home";
import { useNavigate } from "react-router-dom";
import { IoConstruct } from "react-icons/io5";
import BreadCrumbLinks from "../components/breadcumber";
import { useAppContext } from "../context/AppContext";
import fetchCodUser from "../apis/cod-user-api";
import { useEffect, useState } from "react";
import { getToken } from "../apis/token-api";
import Header from "../components/header";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const { username, setUsername } = useAppContext();
  const { userCod, setUserCod } = useAppContext();
  const { globalToken, setGlobalToken } = useAppContext();
  const { password, setPassword } = useAppContext();

  console.log("username home", username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let hasNext = true;
        let page = 1;

        while (hasNext) {
          const response = await fetchCodUser(globalToken.access_token, page);
          const { items, hasNext: next } = response;

          console.log(`Página ${page}:`, items); // Console log para mostrar os itens da página

          // Verificar se encontramos o usuário
          const user = items.find((item) => item.u7_nome.includes(username));
          if (user) {
            console.log("Usuário encontrado:", userCod);
            setUserData(user);
            setUserCod(user.u7_codusu);
            console.log("userCoduserCod", userCod);
            hasNext = false;
          }

          page++;
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);

        // Se ocorrer um erro, obter um novo token e tentar novamente
        try {
          const newToken = await getToken(username, password); // Substitua 'password' pelo valor correto
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
          }
        } catch (tokenError) {
          console.error("Erro ao obter novo token:", tokenError);
          // Trate o erro ao obter o novo token conforme necessário
        }
      }
    };

    fetchData();
  }, [globalToken.access_token, username, setGlobalToken]);

  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/agenda");
  };

  return (
    // bg="rgba(0,0,0,0.5)"
    <Box minHeight="100vh" py="0" px="0" bg="rgba(0,0,0,0.1)">
      <Box>
        <Header />
        <UserDataHome />
      </Box>
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
          </Button>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default HomePage;
