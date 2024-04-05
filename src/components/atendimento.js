import { Modal } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  GridItem,
  Grid,
  Divider,
  Heading,
  Textarea,
  Input,
  Select,
} from "@chakra-ui/react";
import { MdDone, MdPhone } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBarcode } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaRoad } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import fetchAgenda from "../apis/agenda-api";
import ProcurarProduto from "./procurar-produto";

const Atendimento = () => {
  // const [rowItem, setSelectedItem] = useState(null);
  const [editedObservations, setEditedObservations] = useState({});
  const [date, setDate] = useState("");
  const { rowItem, setRowItem } = useAppContext();
  const { dateGlobal, setDateGlobal } = useAppContext();

  const navigate = useNavigate();

  // const closeModal = () => {
  //   setSelectedItem(null);
  // };

  // Função para atualizar a observação do cliente
  const updateObservation = (id, observation) => {
    setEditedObservations({ ...editedObservations, [id]: observation });
  };

  const handleChangeInputDate = (e) => {
    let input = e.target.value;
    // Remove tudo que não for número
    input = input.replace(/\D/g, "");

    // Verifica se a data possui menos de 8 dígitos
    if (input.length <= 8) {
      // Adiciona as barras de acordo com o tamanho da string
      if (input.length > 2 && input.length <= 4) {
        input = input.replace(/(\d{2})(\d{2})/, "$1/$2");
      } else if (input.length > 4) {
        input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
      }
      // Atualiza o estado
      setDate(input);
    }
  };

  const tipoFreteOptions = [
    { value: "C", label: "CIF" },
    { value: "F", label: "FOB" },
    { value: "T", label: "Terceiros" },
    { value: "R", label: "Remetente" },
    { value: "D", label: "Destinatário" },
    { value: "S", label: "Sem cobrança de frete" },
  ];

  const tipoOperacaoOptions = [
    { value: "1", label: "Faturamento" },
    { value: "2", label: "Orçamento" },
    { value: "3", label: "Atendimento" },
  ];

  const customStyles = {
    control: {
      backgroundColor: "transparent",
      borderColor: "green.500", // Altera a cor da borda quando o controle está focado
    },
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "green.500" : "white", // Define a cor de fundo das opções selecionadas como verde e as não selecionadas como branca
      color: state.isSelected ? "white" : "black", // Define a cor do texto das opções selecionadas como branco e as não selecionadas como preto
      "&:hover": {
        backgroundColor: "lightgreen", // Define a cor de fundo ao passar o mouse sobre as opções
      },
    }),
  };

  const handleBackButtonClick = async () => {
    try {
      const agendaData = await fetchAgenda(dateGlobal); // Chame fetchAgenda com dateGlobal
      // Faça o que você precisa com os dados retornados, por exemplo, definir o estado ou realizar outras operações
      console.log(agendaData);
    } catch (error) {
      console.error("Erro ao buscar a agenda:", error);
    }
    navigate("/agenda"); // Limpar selectedItem ao clicar no botão Voltar
  };

  return (
    <Box
      // bg="rgba(0, 0, 0, 0.5)" // Cor de fundo cinza com opacidade
      py="10" // Adiciona um pouco de espaço acima e abaixo do texto
      px="8" // Adiciona um pouco de espaço à esquerda e à direita do texto
      borderRadius="md" // Borda arredondada
    >
      <Button
        onClick={handleBackButtonClick}
        mb="4"
        colorScheme="gray"
        variant="outline"
        ml={3}
        mt={3}
      >
        Voltar
      </Button>
      {rowItem && (
        <>
          <Text size="4xl" mb="25px" ml={3}>
            <strong>{`Operador: ${rowItem.nomeOperador} - ${rowItem.codOperador} - Lista: ${rowItem.codLista}`}</strong>
            <Divider w={520} mt={1} borderWidth={2} />
          </Text>
          <Grid templateColumns="repeat(5, 1fr)" gap={3}>
            <GridItem colSpan={1}>
              <Box
                bg="black"
                p="4"
                borderRadius="10px"
                maxW="350px"
                minH="590px"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaUser} mr={2} /> Contato:
                </Text>

                <Text
                  ml="30px"
                  color="white"
                  mb={2}
                  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                >
                  {rowItem.nomeContato}
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={MdPhone} mr={2} /> Celular:
                </Text>

                <Text
                  color="white"
                  ml="30px"
                  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                >
                  {rowItem.ddd > 0 && `(${rowItem.ddd}) `}
                  {rowItem.celular}
                </Text>
                {rowItem.celular && (
                  <>
                    {(rowItem.fone && rowItem.fone !== rowItem.celular) ||
                    (rowItem.fone1 && rowItem.fone1 !== rowItem.celular) ||
                    (rowItem.fone2 && rowItem.fone2 !== rowItem.celular) ||
                    (rowItem.fax && rowItem.fax !== rowItem.celular) ? (
                      <>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="white"
                          mt={2}
                          mb={2}
                        >
                          <Icon as={MdPhone} mr={2} /> Outros números:
                        </Text>
                        <Text ml="30px" color="white" mb={2}>
                          {rowItem.fone && rowItem.fone !== rowItem.celular && (
                            <>
                              {rowItem.fone}
                              <br />
                            </>
                          )}
                          {rowItem.fone1 &&
                            rowItem.fone1 !== rowItem.celular &&
                            rowItem.fone1 !== rowItem.fone && (
                              <>
                                {rowItem.fone1}
                                <br />
                              </>
                            )}
                          {rowItem.fone2 &&
                            rowItem.fone2 !== rowItem.celular &&
                            rowItem.fone2 !== rowItem.fone &&
                            rowItem.fone2 !== rowItem.fone1 && (
                              <>
                                {rowItem.fone2}
                                <br />
                              </>
                            )}
                          {rowItem.fax &&
                            rowItem.fax !== rowItem.celular &&
                            rowItem.fax !== rowItem.fone &&
                            rowItem.fax !== rowItem.fone1 &&
                            rowItem.fax !== rowItem.fone2 && <>{rowItem.fax}</>}
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      mb={2}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FaUserTag} mr={2} /> Vendedor:
                    </Text>

                    <Text
                      color="white"
                      ml="30px"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                    >
                      {rowItem.vendedor}
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      mb={2}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={MdSell} mr={2} /> Potencial Lub:
                    </Text>

                    <Text
                      mb={2}
                      color="white"
                      ml="30px"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                    >
                      {rowItem.potencialLub}
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      mb={2}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={FaCalendarDays} mr={2} /> Última Compra:
                    </Text>

                    <Text
                      color="white"
                      ml="30px"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                    >
                      <Box
                        bg={
                          rowItem.diasCompras <= 90
                            ? "green"
                            : rowItem.diasCompras <= 180
                            ? "yellow"
                            : "red"
                        }
                        color={
                          rowItem.diasCompras <= 90
                            ? "white"
                            : rowItem.diasCompras <= 180
                            ? "black"
                            : "white"
                        }
                        w="79px"
                        borderRadius="10px"
                        justifyContent="center"
                        p={1}
                      >
                        {`${rowItem.diasCompras} ${
                          rowItem.diasCompras > 1 ? "dias" : "dia"
                        }`}
                      </Box>
                    </Text>
                  </>
                )}
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box
                bg="black"
                p="4"
                borderRadius="10px"
                maxW="350px"
                minH="590px"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={IoStorefront} mr={2} /> Cliente:
                </Text>

                <Text
                  color="white"
                  ml="30px"
                  mb={2}
                  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                >
                  {rowItem.nomeCliente}
                </Text>
                <Text
                  color="white"
                  ml="30px"
                  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                >
                  {rowItem.nomeFantasia &&
                    rowItem.nomeFantasia !== rowItem.nomeCliente && (
                      <Text>{rowItem.nomeFantasia}</Text>
                    )}
                </Text>
                {rowItem.emailCliente !== "" ? (
                  <>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      mt={2}
                      mb={2}
                    >
                      <Icon as={MdEmail} mr={2} /> Email:
                    </Text>
                    <Text
                      mb={2}
                      color="white"
                      ml="30px"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                    >
                      {rowItem.emailCliente}
                    </Text>
                  </>
                ) : (
                  ""
                )}
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaBarcode} mr={2} /> Código Cliente:
                </Text>

                <Text
                  ml="30px"
                  color="white"
                  mb={2}
                  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                >
                  {rowItem.codCliente}
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaCalendarDays} mr={2} /> Data do Cadastro:
                </Text>

                {rowItem.dataCadastro === "  /  /  " ? (
                  <Text color="white" ml="30px" mb={2}>
                    Nenhuma data cadastrada
                  </Text>
                ) : (
                  <Text
                    color="white"
                    ml="30px"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                  >
                    {rowItem.dataCadastro}
                  </Text>
                )}
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box
                bg="black"
                p="4"
                borderRadius="10px"
                maxW="350px"
                minH="590px"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={IoEyeSharp} mr={2} /> Observação Cliente:
                </Text>
                <Textarea
                  placeholder="Observação relacionada ao cliente."
                  value={rowItem.obsCliente}
                  bg="white"
                  color="black"
                  border="1px"
                  height="120px"
                  resize="none"
                  focusBorderColor="blue.700" // Definindo a cor da borda quando em foco como verde
                  _placeholder={{ color: "gray.400" }}
                  onChange={(e) => {
                    setRowItem({
                      ...rowItem,
                      obsCliente: e.target.value,
                    });
                  }}
                />
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={MdDesignServices} mr={2} /> Observação Atendimento:
                </Text>
                <Textarea
                  placeholder="Observação durante o atendimento."
                  bg="white"
                  color="black"
                  height="120px"
                  border="1px"
                  resize="none"
                  focusBorderColor="blue.700" // Definindo a cor da borda quando em foco como verde
                  _placeholder={{ color: "gray.400" }}
                />
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={MdMessage} mr={2} /> Msg para Nota:
                </Text>
                <Textarea
                  placeholder="Mensagem para ser anexada na nota."
                  bg="white"
                  color="black"
                  height="120px"
                  border="1px"
                  resize="none"
                  focusBorderColor="blue.700" // Definindo a cor da borda quando em foco como verde
                  _placeholder={{ color: "gray.400" }}
                />
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaCalendarDays} mr={2} /> Data de Retorno:
                </Text>
                <Input
                  focusBorderColor="blue.700" // Definindo a cor da borda quando em foco como verde
                  type="text"
                  bg="white"
                  color="black"
                  value={date}
                  placeholder="Apenas números - ddmmaaaa"
                  onChange={handleChangeInputDate}
                  borderColor="white"
                />
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box
                bg="black"
                p="4"
                borderRadius="10px"
                maxW="350px"
                minH="590px"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaMoneyCheckDollar} mr={2} /> Operação:
                </Text>
                <Select variant="flushed" bg="black" color="white">
                  {tipoOperacaoOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      style={{ color: "black" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>

                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaRoad} mr={2} /> Tipo Frete:
                </Text>
                <Select
                  variant="flushed"
                  bg="black"
                  color="white" // placeholder="Selecione um frete"
                >
                  {tipoFreteOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      style={{ color: "black" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>

                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaTruck} mr={2} /> Transportadora:
                </Text>
                <Select bg="black" color="white" variant="flushed">
                  <option style={{ color: "black" }}> 1</option>
                  <option style={{ color: "black" }}> 2</option>
                  <option style={{ color: "black" }}> 3</option>
                  <option style={{ color: "black" }}> 4</option>
                </Select>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={FaDollarSign} mr={2} /> Condição Pagamento:
                </Text>
                <Select
                  bg="black"
                  color="white"
                  variant="flushed"
                  placeholder="Selecione uma condição de pagamento."
                />
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box
                bg="black"
                p="4"
                borderRadius="10px"
                maxW="350px"
                minH="590px"
              >
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  mb={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={LuHistory} mr={2} /> Histórico de Compras:
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box mt={30}>
            <ProcurarProduto />
          </Box>

          <Box mt="30px">
            {/* <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                    <Icon as={LuHistory} mr={2} /> Histórico de Compras:
                  </Text> */}
            <Table variant="striped">
              <Thead
                Thead
                position="sticky"
                top="0"
                bg="black"
                fontWeight="bold"
              >
                <Tr>
                  <Th color="white">Produto</Th>
                  <Th color="white">Quantidade</Th>
                  <Th color="white">Valor Unitário</Th>
                  <Th color="white">Total</Th>
                  <Th color="white">Data</Th>
                </Tr>
              </Thead>
              <Tbody></Tbody>
            </Table>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Atendimento;
