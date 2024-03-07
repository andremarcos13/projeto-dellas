import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

const ContatosTabela2 = ({ item, onBackButtonClick }) => {
  const [showNextContact, setShowNextContact] = useState(false);

  const capitalizeFirstLetter = (str) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
      return match.toUpperCase();
    });
  };
  return (
    <>
      <Table variant="simple" style={{ overflowX: "auto" }}>
        <Thead>
          <Tr>
            <Th>Tel. Contato</Th>
            <Th>Data Cadastro</Th>
            <Th>Dias Compras</Th>
            <Th>Email Cliente</Th>
            <Th>Município</Th>
            <Th>Nome Cliente</Th>
            <Th>Nome Contato</Th>
            <Th>Nome Fantasia</Th>
            <Th>Observação Cliente</Th>
            <Th>Potencial Lub</Th>

            <Th>Venda Total NFS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {item.lista_contatos.map((contato, index) => (
            <Tr
              key={index}
              _hover={{
                bg: "gray.600",
                transition: "opacity 0.1s",
              }}
            >
              <Td>{contato.celular}</Td>
              <Td>{contato.dataCadastro}</Td>
              <Td>{contato.diasCompras}</Td>
              <Td>{contato.emailCliente.toLowerCase()}</Td>
              <Td>{capitalizeFirstLetter(contato.municipio)}</Td>
              <Td>{capitalizeFirstLetter(contato.nomeCliente)}</Td>
              <Td>{capitalizeFirstLetter(contato.nomeContato)}</Td>
              <Td>{capitalizeFirstLetter(contato.nomeFantasia)}</Td>
              <Td>{capitalizeFirstLetter(contato.obsCliente)}</Td>
              <Td>{contato.potencialLub}</Td>

              <Td>{contato.venda_total_nfs}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ContatosTabela2;
