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
  Icon,
  Grid,
  Divider,
} from "@chakra-ui/react";
import CalendarioComponent from "../components/calendario";
import ContatosTable from "../components/contatos-tabela-2";
import BreadCrumbLinks from "../components/breadcumber";
import { FaClock } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { dateGlobal, setDateGlobal } = useAppContext();

  const formattedTime = currentTime.toLocaleTimeString();

  useEffect(() => {
    fetchData();
    console.log("agendaData", agendaData);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedDate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let formattedDateToUse = "";

      if (dateGlobal) {
        formattedDateToUse = format(dateGlobal, "yyyyMMdd");
      } else {
        formattedDateToUse = format(selectedDate, "yyyyMMdd");
      }

      console.log(formattedDateToUse);

      const response = await axios.get(
        `https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/agenda/operador`,
        {
          params: {
            data_inicial: formattedDateToUse,
            usuario: "000283",
            empresa: "01",
            filial: "01",
          },
          headers: {
            Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
          },
        }
      );
      setAgendaData(response.data);
      console.log("api", response.data);
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

  const dia = selectedDate.getDate();
  const mes = selectedDate.getMonth() + 1; // Os meses são indexados a partir de zero, então adicionamos 1
  const ano = selectedDate.getFullYear();

  const dataFormatada = `${dia < 10 ? "0" : ""}${dia}/${
    mes < 10 ? "0" : ""
  }${mes}/${ano}`;

  return (
    // bg="rgba(0,0,0,0.5)"
    <Box minHeight="100vh" p="6">
      <BreadCrumbLinks />
      <Grid templateColumns="1fr 2fr 2fr" gap="2" alignItems="center">
        <Box mt="20px" mb="20px">
          <CalendarioComponent onDateChange={handleDateChange} />
        </Box>
        <Box mb="100px" ml="15px" mt={30}>
          {/* <Icon as={FaList} boxSize={8} color="#1A202C" /> */}
          {agendaData.length > 0 ? (
            agendaData.map((data, index) => (
              <>
                <Box key={index} fontSize="lg" color="white.500" mb="2">
                  {`Código da Lista: ${data.codLista} - Código Operador: ${data.codOperad} - Ligar às: ${data.hora}`}
                </Box>
                <Divider mb={3} />
              </>
            ))
          ) : (
            <Text fontSize="2xl" color="white.500">
              Nenhum dado disponível.
            </Text>
          )}
        </Box>
      </Grid>
      {isLoading ? (
        <Flex align="center" justify="center" h="40vh">
          <Spinner size="xl" color="#1A202C" />
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
                    colorScheme="blackAlpha"
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
                      <Th>Código Lista</Th>
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
                          bg: "black",
                          transition: "opacity 0.1s",
                          color: "white",
                        }}
                        onClick={() => handleItemClick(item)}
                        cursor="pointer"
                      >
                        <Td>{item.codLista}</Td>

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
