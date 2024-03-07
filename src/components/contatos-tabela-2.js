import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

const ContatosTabela2 = ({ item, onBackButtonClick }) => {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Celular</Th>
            <Th>Código Cliente</Th>
            <Th>Data Cadastro</Th>
            <Th>DDD</Th>
            <Th>Dias Compras</Th>
            <Th>Email Cliente</Th>
            <Th>Fax</Th>
            <Th>Fone</Th>
            <Th>Fone1</Th>
            <Th>Fone2</Th>
            <Th>Município</Th>
            <Th>Nome Cliente</Th>
            <Th>Nome Contato</Th>
            <Th>Nome Fantasia</Th>
            <Th>Observação Cliente</Th>
            <Th>Potencial Lub</Th>
            <Th>Venda Qtd Notas Fisicas</Th>
            <Th>Venda Qtd Produtos</Th>
            <Th>Venda Qtd Produtos Distintos</Th>
            <Th>Venda Total NFS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {item.lista_contatos.map((contato, index) => (
            <Tr key={index}>
              <Td>{contato.celular}</Td>
              <Td>{contato.codCliente}</Td>
              <Td>{contato.dataCadastro}</Td>
              <Td>{contato.ddd}</Td>
              <Td>{contato.diasCompras}</Td>
              <Td>{contato.emailCliente}</Td>
              <Td>{contato.fax}</Td>
              <Td>{contato.fone}</Td>
              <Td>{contato.fone1}</Td>
              <Td>{contato.fone2}</Td>
              <Td>{contato.municipio}</Td>
              <Td>{contato.nomeCliente}</Td>
              <Td>{contato.nomeContato}</Td>
              <Td>{contato.nomeFantasia}</Td>
              <Td>{contato.obsCliente}</Td>
              <Td>{contato.potencialLub}</Td>
              <Td>{contato.venda_qtd_notasFisicas}</Td>
              <Td>{contato.venda_qtd_produtos}</Td>
              <Td>{contato.venda_qtd_produtosDistintos}</Td>
              <Td>{contato.venda_total_nfs}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ContatosTabela2;
