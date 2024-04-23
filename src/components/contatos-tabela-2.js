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
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { GrHide } from "react-icons/gr";

const ContatosTabela2 = ({ item, onBackButtonClick }) => {
  const [showNextContact, setShowNextContact] = useState(false);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { rowItem, setRowItem } = useAppContext();

  const navigate = useNavigate();

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
      setRowItem(item.lista_contatos[index]);
      console.log("rowItem", rowItem);
      console.log("selectedRowItem", selectedItem);
      setShowNextContact(true);
      navigate(`/atendimento/${[index]}`);
    }
  };

  return (
    <>
      <Table variant="simple" style={{ overflowX: "auto" }}>
        <Thead position="sticky" top="0" bg="black" fontWeight="bold">
          <Tr>
            <Th color="white">Nome Cliente</Th>
            <Th color="white">Nome Contato</Th>
            <Th color="white">Tel. Contato</Th>
            <Th color="white">Data Cadastro</Th>
            <Th color="white">Última Compra</Th>
            <Th color="white">Email Cliente</Th>
            <Th color="white">Município</Th>
            <Th color="white">Observação Cliente</Th>
            <Th color="white">Potencial Lub</Th>
            <Th color="white">Venda Total NFS</Th>
            <Th color="white">{""}</Th> {/* Coluna extra para o ícone de OK */}
          </Tr>
        </Thead>
        <Tbody>
          {item.lista_contatos.map(
            (contato, index) =>
              !isRowHidden(index) && ( // Verifica se a linha deve ser exibida
                <Tr
                  key={index}
                  _hover={{
                    bg: "gray.300",
                    transition: "opacity 0.1s",
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                    color: "black",
                  }}
                  onClick={(event) => handleRowClick(index, event)} // Adiciona o evento de clique na linha
                  cursor="pointer"
                >
                  <Td>{capitalizeFirstLetter(contato.nomeCliente)}</Td>
                  <Td>{capitalizeFirstLetter(contato.nomeContato)}</Td>

                  <Td>{contato.celular}</Td>
                  <Td>{contato.dataCadastro}</Td>
                  <Td>{`${contato.diasCompras} dias`}</Td>
                  <Td w={120}>{contato.emailCliente.toLowerCase()}</Td>
                  <Td w={200}>{capitalizeFirstLetter(contato.municipio)}</Td>
                  <Td>{capitalizeFirstLetter(contato.obsCliente)}</Td>
                  <Td>{contato.potencialLub}</Td>
                  <Td>{contato.venda_total_nfs}</Td>
                  <Td>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation(); // Impede a propagação do clique para a linha
                        hideRow(index);
                      }}
                      bg="black"
                      variant="outline"
                      // bg="#1A202C"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                        bg: "red",
                      }}
                    >
                      <Icon as={GrHide} boxSize={5} color="white" />
                    </Button>
                  </Td>
                </Tr>
              )
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default ContatosTabela2;
