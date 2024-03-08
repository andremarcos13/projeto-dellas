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
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md";

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
              <Box>
                <Text fontWeight="bold">Celular:</Text>
                <Text>{selectedItem.celular}</Text>
                <Text fontWeight="bold">Código Cliente:</Text>
                <Text>{selectedItem.codCliente}</Text>
                <Text fontWeight="bold">Código Grupo Venda:</Text>
                <Text>{selectedItem.codGrupoVenda}</Text>
                <Text fontWeight="bold">Código Lista:</Text>
                <Text>{selectedItem.codLista}</Text>
                <Text fontWeight="bold">Código Operador:</Text>
                <Text>{selectedItem.codOperador}</Text>
                <Text fontWeight="bold">Código Transportadora:</Text>
                <Text>{selectedItem.codTransp}</Text>
                <Text fontWeight="bold">Código Usuário:</Text>
                <Text>{selectedItem.codUsuario}</Text>
                <Text fontWeight="bold">Contato:</Text>
                <Text>{selectedItem.selectedItem}</Text>
                <Text fontWeight="bold">Data Cadastro:</Text>
                <Text>{selectedItem.dataCadastro}</Text>
                <Text fontWeight="bold">DDD:</Text>
                <Text>{selectedItem.ddd}</Text>
                <Text fontWeight="bold">Dias Compras:</Text>
                <Text>{selectedItem.diasCompras}</Text>
                <Text fontWeight="bold">Email Cliente:</Text>
                <Text>{selectedItem.emailCliente}</Text>
                <Text fontWeight="bold">Entidade:</Text>
                <Text>{selectedItem.entidade}</Text>
                <Text fontWeight="bold">Fax:</Text>
                <Text>{selectedItem.fax}</Text>
                <Text fontWeight="bold">Fone:</Text>
                <Text>{selectedItem.fone}</Text>
                <Text fontWeight="bold">Fone1:</Text>
                <Text>{selectedItem.fone1}</Text>
                <Text fontWeight="bold">Fone2:</Text>
                <Text>{selectedItem.fone2}</Text>
                <Text fontWeight="bold">Município:</Text>
                <Text>{selectedItem.municipio}</Text>
                <Text fontWeight="bold">Nome Cliente:</Text>
                <Text>{selectedItem.nomeCliente}</Text>
                <Text fontWeight="bold">Nome selectedItem:</Text>
                <Text>{selectedItem.nomeselectedItem}</Text>
                <Text fontWeight="bold">Nome Fantasia:</Text>
                <Text>{selectedItem.nomeFantasia}</Text>
                <Text fontWeight="bold">Nome Operador:</Text>
                <Text>{selectedItem.nomeOperador}</Text>
                <Text fontWeight="bold">Observação Cliente:</Text>
                <Text>{selectedItem.obsCliente}</Text>
                <Text fontWeight="bold">Potencial Lub:</Text>
                <Text>{selectedItem.potencialLub}</Text>
                <Text fontWeight="bold">Venda Qtd Notas Fisicas:</Text>
                <Text>{selectedItem.venda_qtd_notasFisicas}</Text>
                <Text fontWeight="bold">Venda Qtd Produtos:</Text>
                <Text>{selectedItem.venda_qtd_produtos}</Text>
                <Text fontWeight="bold">Venda Qtd Produtos Distintos:</Text>
                <Text>{selectedItem.venda_qtd_produtosDistintos}</Text>
                <Text fontWeight="bold">Venda Total NFS:</Text>
                <Text>{selectedItem.venda_total_nfs}</Text>
                <Text fontWeight="bold">Vendedor:</Text>
                <Text>{selectedItem.vendedor}</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContatosTabela2;
