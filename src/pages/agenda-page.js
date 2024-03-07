import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
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
  Text,
  Button,
} from "@chakra-ui/react";
import CalendarioComponent from "../components/calendario";
import ContatosTable from "../components/contatos-tabela-2";

const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const formattedDate = format(selectedDate, "yyyyMMdd");
      const response = await axios.get(
        `https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/agenda/operador?data_inicial=${formattedDate}&usuario=000283`,
        {
          headers: {
            Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
          },
        }
      );
      setAgendaData(response.data);
      console.log("date", agendaData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(
        "Erro ao buscar dados da API. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedItem(null); // Limpar selectedItem ao alterar a data
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null); // Limpar selectedItem ao clicar no botão Voltar
  };

  const calcularPotencialLubTotal = (listaContatos) => {
    return listaContatos.reduce(
      (total, contato) => total + contato.potencialLub,
      0
    );
  };

  return (
    <Box bg="rgba(0,0,0,0.5)" minHeight="100vh" p="6">
      {" "}
      {/* Define o plano de fundo e o padding */}
      <Box mt="20px" mb="20px">
        <CalendarioComponent onDateChange={handleDateChange} />
      </Box>
      {isLoading ? (
        <Flex align="center" justify="center" h="40vh">
          <Spinner size="xl" color="green.500" />
        </Flex>
      ) : (
        <>
          {error && (
            <Box mt="20px" mb="20px">
              <Text color="red.500">{error}</Text>
            </Box>
          )}
          {agendaData.length === 0 ? (
            <Box mt="20px" mb="20px">
              <Text>Não há informações disponíveis para esta data.</Text>
            </Box>
          ) : (
            <>
              {selectedItem ? (
                <Box>
                  <Button
                    onClick={handleBackButtonClick}
                    mb="4"
                    colorScheme="green"
                    color="white"
                  >
                    Voltar
                  </Button>
                  <ContatosTable item={selectedItem} />
                </Box>
              ) : (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Descrição Lista</Th>
                      <Th>Data</Th>
                      <Th>Quantidade de Contatos</Th>
                      <Th>Potencial Lub Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {agendaData.map((item, index) => (
                      <Tr
                        key={index}
                        _hover={{
                          bg: "gray.600",
                          transition: "opacity 0.1s",
                        }}
                        onClick={() => handleItemClick(item)}
                        cursor="pointer"
                      >
                        <Td>{item.descLista}</Td>
                        <Td>{item.data}</Td>
                        <Td>{item.lista_contatos.length}</Td>
                        <Td>
                          {calcularPotencialLubTotal(item.lista_contatos)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default AgendaPage;
