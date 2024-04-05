import { useState } from "react";
import {
  Input,
  Text,
  VStack,
  ListItem,
  UnorderedList,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Divider,
  Center,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Importando ícones da react-icons
import fetchProdutos from "../apis/produtos-api";

const ProcurarProduto = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProdutos({ search: searchTerm });
      if (data && data.items) {
        setSearchResults(data.items);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const closeModal = () => {
    setSearchResults([]);
    setSearchTerm("");
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        leftIcon={<FaSearch />} // Usando o ícone de busca da react-icons
        colorScheme="gray"
        variant="outline"
      >
        Procurar Produto
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent maxW="60%">
          <ModalHeader>Buscar Produto</ModalHeader>
          <Center>
            <Divider borderWidth={1} maxW="95%" />
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center">
              <Input
                flex="1"
                mt="10px"
                placeholder="Digite o nome do produto"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button
                ml={4}
                onClick={handleSearch}
                colorScheme="gray"
                variant="outline"
                leftIcon={<FaSearch />} // Usando o ícone de busca da react-icons
              >
                Buscar
              </Button>
            </Flex>
            {isLoading ? (
              <Spinner mt={4} />
            ) : searchResults.length > 0 ? (
              <UnorderedList mt={4}>
                {searchResults.map((item, index) => (
                  <ListItem key={index}>
                    <VStack align="flex-start" spacing={2}>
                      <Text fontSize="lg">
                        {item.descricao.includes(searchTerm) ? (
                          <>
                            {item.descricao
                              .split(searchTerm)
                              .map((part, index) => (
                                <span key={index}>
                                  {part}
                                  {index !==
                                    item.descricao.split(searchTerm).length -
                                      1 && <strong>{searchTerm}</strong>}
                                </span>
                              ))}
                          </>
                        ) : (
                          item.descricao
                        )}
                      </Text>
                      <Flex>
                        <Text fontWeight="bold">Filial:</Text>
                        <Text ml={1}>{item.filial}</Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight="bold">Código:</Text>
                        <Text ml={1}>
                          {item.codigo.includes(searchTerm) ? (
                            <>
                              {item.codigo
                                .split(searchTerm)
                                .map((part, index) => (
                                  <span key={index}>
                                    {part}
                                    {index !==
                                      item.codigo.split(searchTerm).length -
                                        1 && <strong>{searchTerm}</strong>}
                                  </span>
                                ))}
                            </>
                          ) : (
                            item.codigo
                          )}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight="bold">Tipo:</Text>
                        <Text ml={1}>{item.tipo}</Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight="bold">Unidade de Medida:</Text>
                        <Text ml={1}>{item.um}</Text>
                      </Flex>
                    </VStack>
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text mt={4}>Nenhum resultado encontrado.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={closeModal}
              leftIcon={<FaTimes />} // Usando o ícone de fechar da react-icons
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProcurarProduto;
