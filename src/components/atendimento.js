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

const Atendimento = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedObservations, setEditedObservations] = useState({});
  const [date, setDate] = useState("");

  const closeModal = () => {
    setSelectedItem(null);
  };

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

  return (
    <Modal isOpen={!!selectedItem} onClose={closeModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedItem && (
            <>
              <Text size="4xl" mb="25px">
                {`Operador: ${selectedItem.nomeOperador} - ${selectedItem.codOperador} - Lista: ${selectedItem.codLista}`}
              </Text>
              <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                <GridItem colSpan={1}>
                  <Box
                    bg="#1A202C"
                    p="4"
                    borderRadius="10px"
                    maxW="350px"
                    minH="590px"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaUser} mr={2} /> Contato:
                    </Text>

                    <Text
                      ml="30px"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      {selectedItem.nomeContato}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={MdPhone} mr={2} /> Celular:
                    </Text>

                    <Text
                      ml="30px"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      {selectedItem.ddd > 0 && `(${selectedItem.ddd}) `}
                      {selectedItem.celular}
                    </Text>
                    {selectedItem.celular && (
                      <>
                        {(selectedItem.fone &&
                          selectedItem.fone !== selectedItem.celular) ||
                        (selectedItem.fone1 &&
                          selectedItem.fone1 !== selectedItem.celular) ||
                        (selectedItem.fone2 &&
                          selectedItem.fone2 !== selectedItem.celular) ||
                        (selectedItem.fax &&
                          selectedItem.fax !== selectedItem.celular) ? (
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
                            <Text ml="30px">
                              {selectedItem.fone &&
                                selectedItem.fone !== selectedItem.celular && (
                                  <>
                                    {selectedItem.fone}
                                    <br />
                                  </>
                                )}
                              {selectedItem.fone1 &&
                                selectedItem.fone1 !== selectedItem.celular &&
                                selectedItem.fone1 !== selectedItem.fone && (
                                  <>
                                    {selectedItem.fone1}
                                    <br />
                                  </>
                                )}
                              {selectedItem.fone2 &&
                                selectedItem.fone2 !== selectedItem.celular &&
                                selectedItem.fone2 !== selectedItem.fone &&
                                selectedItem.fone2 !== selectedItem.fone1 && (
                                  <>
                                    {selectedItem.fone2}
                                    <br />
                                  </>
                                )}
                              {selectedItem.fax &&
                                selectedItem.fax !== selectedItem.celular &&
                                selectedItem.fax !== selectedItem.fone &&
                                selectedItem.fax !== selectedItem.fone1 &&
                                selectedItem.fax !== selectedItem.fone2 && (
                                  <>{selectedItem.fax}</>
                                )}
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
                        >
                          <Icon as={FaUserTag} mr={2} /> Vendedor:
                        </Text>

                        <Text
                          ml="30px"
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg",
                          }}
                        >
                          {selectedItem.vendedor}
                        </Text>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="white"
                          mb={2}
                        >
                          <Icon as={MdSell} mr={2} /> Potencial Lub:
                        </Text>

                        <Text
                          ml="30px"
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg",
                          }}
                        >
                          {selectedItem.potencialLub}
                        </Text>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="white"
                          mb={2}
                        >
                          <Icon as={FaCalendarDays} mr={2} /> Última Compra:
                        </Text>

                        <Text
                          ml="30px"
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg",
                          }}
                        >
                          <Box
                            bg={
                              selectedItem.diasCompras <= 90
                                ? "green"
                                : selectedItem.diasCompras <= 180
                                ? "yellow"
                                : "red"
                            }
                            color={
                              selectedItem.diasCompras <= 90
                                ? "white"
                                : selectedItem.diasCompras <= 180
                                ? "black"
                                : "white"
                            }
                            w="79px"
                            borderRadius="10px"
                            justifyContent="center"
                            p={1}
                          >
                            {`${selectedItem.diasCompras} ${
                              selectedItem.diasCompras > 1 ? "dias" : "dia"
                            }`}
                          </Box>
                        </Text>
                      </>
                    )}
                  </Box>
                </GridItem>
                <GridItem colSpan={1}>
                  <Box
                    bg="#1A202C"
                    p="4"
                    borderRadius="10px"
                    maxW="350px"
                    minH="590px"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={IoStorefront} mr={2} /> Cliente:
                    </Text>

                    <Text
                      ml="30px"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      {selectedItem.nomeCliente}
                    </Text>
                    <Text
                      ml="30px"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      {selectedItem.nomeFantasia &&
                        selectedItem.nomeFantasia !==
                          selectedItem.nomeCliente && (
                          <Text>{selectedItem.nomeFantasia}</Text>
                        )}
                    </Text>
                    {selectedItem.emailCliente !== "" ? (
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
                          ml="30px"
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg",
                          }}
                        >
                          {selectedItem.emailCliente}
                        </Text>
                      </>
                    ) : (
                      ""
                    )}
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaBarcode} mr={2} /> Código Cliente:
                    </Text>

                    <Text
                      ml="30px"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      {selectedItem.codCliente}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaCalendarDays} mr={2} /> Data do Cadastro:
                    </Text>

                    <Text
                      ml="30px"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      {selectedItem.dataCadastro}
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={1}>
                  <Box
                    bg="#1A202C"
                    p="4"
                    borderRadius="10px"
                    maxW="350px"
                    minH="590px"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={IoEyeSharp} mr={2} /> Observação Cliente:
                    </Text>
                    <Textarea
                      placeholder="Observação relacionada ao cliente."
                      value={selectedItem.obsCliente}
                      bg="#1A202C"
                      color="white"
                      border="1px"
                      height="120px"
                      resize="none"
                      focusBorderColor="lime" // Definindo a cor da borda quando em foco como verde
                      _placeholder={{ color: "gray.400" }}
                      onChange={(e) => {
                        setSelectedItem({
                          ...selectedItem,
                          obsCliente: e.target.value,
                        });
                      }}
                    />
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={MdDesignServices} mr={2} /> Observação
                      Atendimento:
                    </Text>
                    <Textarea
                      placeholder="Observação durante o atendimento."
                      bg="#1A202C"
                      color="white"
                      height="120px"
                      border="1px"
                      resize="none"
                      focusBorderColor="lime" // Definindo a cor da borda quando em foco como verde
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={MdMessage} mr={2} /> Msg para Nota:
                    </Text>
                    <Textarea
                      placeholder="Mensagem para ser anexada na nota."
                      bg="#1A202C"
                      color="white"
                      height="120px"
                      border="1px"
                      resize="none"
                      focusBorderColor="lime" // Definindo a cor da borda quando em foco como verde
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaCalendarDays} mr={2} /> Data de Retorno:
                    </Text>
                    <Input
                      focusBorderColor="lime" // Definindo a cor da borda quando em foco como verde
                      type="text"
                      value={date}
                      placeholder="dd/mm/aaaa"
                      onChange={handleChangeInputDate}
                      borderColor="white"
                    />
                  </Box>
                </GridItem>
                <GridItem colSpan={1}>
                  <Box
                    bg="#1A202C"
                    p="4"
                    borderRadius="10px"
                    maxW="350px"
                    minH="590px"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaMoneyCheckDollar} mr={2} /> Operação:
                    </Text>
                    <Select variant="flushed">
                      {tipoOperacaoOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>

                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaRoad} mr={2} /> Tipo Frete:
                    </Text>
                    <Select
                      variant="flushed"
                      // placeholder="Selecione um frete"
                    >
                      {tipoFreteOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>

                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaTruck} mr={2} /> Transportadora:
                    </Text>
                    <Select
                      variant="flushed"
                      placeholder="Selecione uma transportadora."
                    />
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={FaDollarSign} mr={2} /> Condição Pagamento:
                    </Text>
                    <Select
                      variant="flushed"
                      placeholder="Selecione uma condição de pagamento."
                    />
                  </Box>
                </GridItem>
                <GridItem colSpan={1}>
                  <Box
                    bg="#1A202C"
                    p="4"
                    borderRadius="10px"
                    maxW="350px"
                    minH="590px"
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                      <Icon as={LuHistory} mr={2} /> Histórico de Compras:
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
              <Box mt="30px">
                {/* <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                    <Icon as={LuHistory} mr={2} /> Histórico de Compras:
                  </Text> */}
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Produto</Th>
                      <Th>Quantidade</Th>
                      <Th>Valor Unitário</Th>
                      <Th>Total</Th>
                      <Th>Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody></Tbody>
                </Table>
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={closeModal}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Atendimento;
