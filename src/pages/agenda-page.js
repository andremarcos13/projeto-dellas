import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; // Importar a função format do date-fns
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
  Text, // Importar o componente Text do Chakra UI para exibir mensagens de erro
} from "@chakra-ui/react";
import CalendarioComponent from "../components/calendario";

const AgendaPage = () => {
  const [agendaData, setAgendaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para armazenar a data selecionada
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Executa apenas quando selectedDate é alterado

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const formattedDate = format(selectedDate, "yyyyMMdd"); // Formatar a data
      console.log("data formatada", formattedDate);
      const response = await axios.get(
        `https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/agenda/operador?data_inicial=${formattedDate}&usuario=000283`,
        {
          headers: {
            Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
          },
        }
      );
      console.log("Response from API:", response.data);
      setAgendaData(response.data);
      setError(null); // Limpar mensagens de erro se a solicitação for bem-sucedida
    } catch (error) {
      console.error(error);
      setError(
        "Erro ao buscar dados da API. Por favor, tente novamente mais tarde."
      ); // Configurar mensagem de erro
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

  // Função para receber a data selecionada do componente CalendarioComponent
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Faça o que quiser com a data selecionada
    console.log("Data selecionada:", date);
  };

  return (
    <>
      <Box mt="20px" mb="20px">
        {/* Passando a função de retorno de chamada handleDateChange para CalendarioComponent */}
        <CalendarioComponent onDateChange={handleDateChange} />
      </Box>
      {isLoading ? (
        <Flex align="center" justify="center" h="100vh">
          <Spinner size="xl" color="green.500" />
        </Flex>
      ) : (
        <>
          {error && (
            <Box mt="20px" mb="20px">
              <Text color="red.500">{error}</Text>
            </Box>
          )}
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
