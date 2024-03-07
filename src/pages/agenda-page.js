import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Flex,
  Box,
} from "@chakra-ui/react";
import CalendarioComponent from "../components/calendario";

const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/agenda/operador?data_inicial=20230717&usuario=000283",
        {
          headers: {
            Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
          },
        }
      );
      console.log("Response from API:", response.data);
      setAgendaData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para calcular a soma do potencial lub de todos os contatos
  const calcularPotencialLubTotal = (listaContatos) => {
    return listaContatos.reduce(
      (total, contato) => total + contato.potencialLub,
      0
    );
  };

  return (
    <>
      {isLoading ? (
        <Flex align="center" justify="center" h="100vh">
          <Spinner size="xl" color="green.500" />
        </Flex>
      ) : (
        <>
          <Box mt="20px" mb="20px">
            <CalendarioComponent />
          </Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Código Lista</Th>
                <Th>Descrição Lista</Th>
                <Th>Código Operador</Th>
                <Th>Data</Th>
                <Th>Quantidade de Contatos</Th>
                <Th>Potencial Lub Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {agendaData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.codLista}</Td>
                  <Td>{item.descLista}</Td>
                  <Td>{item.codOperad}</Td>
                  <Td>{item.data}</Td>
                  <Td>{item.lista_contatos.length}</Td>{" "}
                  {/* Quantidade de contatos */}
                  <Td>{calcularPotencialLubTotal(item.lista_contatos)}</Td>{" "}
                  {/* Potencial Lub Total */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AgendaPage;
