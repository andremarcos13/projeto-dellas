import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState, useRef } from "react"; // Importa useRef
import fetchClientes from "../apis/clientes-api";
import {
  Box,
  Input,
  Text,
  Spinner,
  Button,
  HStack,
  Center,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
  const buttonRef = useRef(null); // Cria uma referência para o botão

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

  const handlePesquisar = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click(); // Simula o clique no botão ao pressionar Enter
    }
  };

  return (
    <>
      <Header />
      <Center>
        <Box mt={8} ml={5}>
          <form onSubmit={handlePesquisar}>
            {" "}
            {/* Formulário envolvendo o conteúdo */}
            <HStack spacing={4}>
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                w={350}
                mr={3}
                onKeyDown={handleEnterPress}
              />
              <Button
                ref={buttonRef}
                leftIcon={<FaSearch />}
                colorScheme="blue"
                variant="outline"
                bg="white"
                onClick={handlePesquisar}
              >
                Procurar Cliente
              </Button>{" "}
            </HStack>
          </form>
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
              <Box p={2}>
                <Table colorScheme="purple">
                  <Thead bg="#822AA2">
                    <Tr>
                      <Th color="white">Código</Th>
                      <Th color="white">Nome</Th>
                      <Th color="white">Nome Fantasia</Th>
                      <Th color="white">Estado</Th>
                      <Th color="white">Município</Th>
                      <Th color="white">Observação</Th>
                      <Th color="white">Código Transportadora</Th>
                      <Th color="white">Código Grupo Venda</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {clientes.length > 0 ? (
                      clientes.map((cliente, index) => (
                        <Tr
                          key={index}
                          // onClick={() => handleRowClick(pedido)}
                          style={{ cursor: "pointer" }}
                          _hover={{
                            boxShadow: "lg",
                            borderColor: "black",
                            bg: "#F0DFF7",
                            color: "black",
                            // transform: "scale(1.01)",
                            // fontWeight: "bold", // Adiciona o negrito ao passar o mouse
                          }}
                        >
                          <Td>{cliente.codigo}</Td>
                          <Td>{cliente.nome}</Td>
                          <Td>{cliente.nomefantasia}</Td>
                          <Td>{cliente.estado}</Td>
                          <Td>{cliente.municipio}</Td>
                          <Td>{cliente.observacao}</Td>
                          <Td>{cliente.codtransp}</Td>
                          <Td>{cliente.codgrupovenda}</Td>
                        </Tr>
                      ))
                    ) : (
                      <Text>Nenhum cliente encontrado</Text>
                    )}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default AtendimentoAvulso;
