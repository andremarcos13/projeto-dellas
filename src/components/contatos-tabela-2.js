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
  Modal,
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
} from "@chakra-ui/react";
import { MdDone, MdPhone } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBarcode } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";

const ContatosTabela2 = ({ item, onBackButtonClick }) => {
  const [showNextContact, setShowNextContact] = useState(false);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const capitalizeFirstLetter = (str) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
      return match.toUpperCase();
    });
  };

  const hideRow = (index) => {
    setHiddenRows([...hiddenRows, index]);
  };

  const isRowHidden = (index) => {
    return hiddenRows.includes(index);
  };

  const handleRowClick = (index, event) => {
    // Verifica se o ícone de OK foi clicado, se sim, não faz nada
    if (event.target.tagName !== "BUTTON") {
      // Se o clique não foi no botão, abre o modal
      setSelectedItem(item.lista_contatos[index]);
      setShowNextContact(true);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Table variant="simple" style={{ overflowX: "auto" }}>
        <Thead>
          <Tr>
            <Th>Nome Cliente</Th>
            <Th>Nome Contato</Th>
            <Th>Tel. Contato</Th>
            <Th>Data Cadastro</Th>
            <Th>Última Compra</Th>
            <Th>Email Cliente</Th>
            <Th>Município</Th>
            <Th>Observação Cliente</Th>
            <Th>Potencial Lub</Th>
            <Th>Venda Total NFS</Th>
            <Th></Th> {/* Coluna extra para o ícone de OK */}
          </Tr>
        </Thead>
        <Tbody>
          {item.lista_contatos.map(
            (contato, index) =>
              !isRowHidden(index) && ( // Verifica se a linha deve ser exibida
                <Tr
                  key={index}
                  _hover={{
                    bg: "gray.600",
                    transition: "opacity 0.1s",
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                  }}
                  onClick={(event) => handleRowClick(index, event)} // Adiciona o evento de clique na linha
                  cursor="pointer"
                >
                  <Td>{capitalizeFirstLetter(contato.nomeCliente)}</Td>
                  <Td>{capitalizeFirstLetter(contato.nomeContato)}</Td>

                  <Td>{contato.celular}</Td>
                  <Td>{contato.dataCadastro}</Td>
                  <Td>{`${contato.diasCompras} dias`}</Td>
                  <Td>{contato.emailCliente.toLowerCase()}</Td>
                  <Td>{capitalizeFirstLetter(contato.municipio)}</Td>
                  <Td>{capitalizeFirstLetter(contato.obsCliente)}</Td>
                  <Td>{contato.potencialLub}</Td>
                  <Td>{contato.venda_total_nfs}</Td>
                  <Td>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation(); // Impede a propagação do clique para a linha
                        hideRow(index);
                      }}
                      variant="unstyled"
                      bg="#1A202C"
                      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    >
                      <Icon as={MdDone} boxSize={5} color="green.500" />
                    </Button>
                  </Td>
                </Tr>
              )
          )}
        </Tbody>
      </Table>

      {/* Modal */}
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
                    <Box bg="#1A202C" p="4" borderRadius="10px" maxW="350px">
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        mb={2}
                      >
                        <Icon as={FaUser} mr={2} /> Contato:
                      </Text>

                      <Text
                        ml="30px"
                        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                      >
                        {selectedItem.nomeContato}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        mb={2}
                      >
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
                                  selectedItem.fone !==
                                    selectedItem.celular && (
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
                        </>
                      )}
                    </Box>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Box bg="#1A202C" p="4" borderRadius="10px" maxW="350px">
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        mb={2}
                      >
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
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        mb={2}
                      >
                        <Icon as={FaBarcode} mr={2} /> Código Cliente:
                      </Text>

                      <Text
                        ml="30px"
                        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                      >
                        {selectedItem.codCliente}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        mb={2}
                      >
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
                    <Box bg="#1A202C" p="4" borderRadius="10px" maxW="350px">
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
                        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
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
                        _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
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
                          w="70px"
                          borderRadius="10px"
                          justifyContent="center"
                          p={1}
                        >
                          {`${selectedItem.diasCompras} ${
                            selectedItem.diasCompras > 1 ? "dias" : "dia"
                          }`}
                        </Box>
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>
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
    </>
  );
};

export default ContatosTabela2;
