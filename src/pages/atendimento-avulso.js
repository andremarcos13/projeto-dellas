import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import fetchClientes from "../apis/clientes-api";
import {
  Box,
  Input,
  Text,
  Spinner,
  Button,
  HStack,
  Center,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Header from "../components/header";

const AtendimentoAvulso = () => {
  const { username, password, token, globalToken } = useAppContext();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [remainingRecords, setRemainingRecords] = useState(0);

  if (username === "" || password === "") {
    navigate("/error");
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClientes({
        search: search,
        token: globalToken.access_token,
      });

      // Verifica se a resposta possui o campo 'items'
      if (data && data.items) {
        setClientes(data.items);
        setHasNext(data.hasNext);
        setRemainingRecords(data.remainingRecords);
      } else {
        setClientes([]);
        setHasNext(false);
        setRemainingRecords(0);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
      setIsLoading(false);
    }
  };

  const handlePesquisar = () => {
    fetchData();
  };

  return (
    <>
      <Header />
      <Center>
        <Box mt={8}>
          <HStack spacing={4}>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              w={350}
              mr={3}
            />
            <Button
              leftIcon={<FaSearch />} // Usando o ícone de busca da react-icons
              colorScheme="blue"
              variant="outline"
              bg="white"
              onClick={handlePesquisar} // Chama handlePesquisar no clique do botão
            >
              Procurar Cliente
            </Button>{" "}
            {isLoading && <Spinner size="sm" />}
          </HStack>
          {hasNext !== undefined && remainingRecords !== undefined && (
            <Text mt={2}>
              {hasNext
                ? `Mais resultados disponíveis (${remainingRecords} restantes)`
                : "Todos os resultados foram carregados"}
            </Text>
          )}
          <Box mt={4}>
            {isLoading ? (
              <Spinner size="xl" />
            ) : (
              <Box>
                {clientes.length > 0 ? (
                  clientes.map((cliente) => (
                    <Box
                      key={cliente.codigo}
                      mb={4}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                    >
                      <Text>Nome: {cliente.nome}</Text>
                      <Text>Código: {cliente.codigo}</Text>
                      <Text>Nome Fantasia: {cliente.nomefantasia}</Text>
                      <Text>Estado: {cliente.estado}</Text>
                      <Text>Município: {cliente.municipio}</Text>
                      <Text>Observação: {cliente.observacao}</Text>
                      <Text>Codtransp: {cliente.codtransp}</Text>
                      <Text>Codgrupovenda: {cliente.codgrupovenda}</Text>
                    </Box>
                  ))
                ) : (
                  <Text>Nenhum cliente encontrado</Text>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default AtendimentoAvulso;
