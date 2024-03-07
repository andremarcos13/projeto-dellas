import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@chakra-ui/react";

const AgendaPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleDrawer}>Toggle Menu</Button>
      <Drawer isOpen={isOpen} placement="left" onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            {/* Aqui você pode adicionar o conteúdo do menu lateral */}
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Horário</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>10/03/2024</Td>
            <Td>09:00</Td>
            <Td>Reunião de equipe</Td>
          </Tr>
          <Tr>
            <Td>10/03/2024</Td>
            <Td>11:00</Td>
            <Td>Ligação com cliente</Td>
          </Tr>
          {/* Adicione mais linhas conforme necessário */}
        </Tbody>
      </Table>
    </>
  );
};

export default AgendaPage;
