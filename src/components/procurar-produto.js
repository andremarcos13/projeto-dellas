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
  Grid,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Importando ícones da react-icons
import fetchProdutos from "../apis/produtos-api";

const ProcurarProduto = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
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
            <Flex align="center" justify="center">
              <Input
                flex="1"
                mt="10px"
                placeholder="Digite o nome do produto"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button
                ml={4}
                mt="10px"
                onClick={handleSearch}
                colorScheme="gray"
                variant="outline"
                leftIcon={<FaSearch />} // Usando o ícone de busca da react-icons
              >
                Buscar
              </Button>
            </Flex>
            {isLoading ? (
              <Center mt="25%">
                <Spinner mt={4} />
              </Center>
            ) : searchResults.length > 0 ? (
              <Grid
                mt={4}
                templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                gap={4}
              >
                {searchResults.map((item, index) => (
                  <Box
                    key={index}
                    border="1px"
                    p={2}
                    borderColor="gray.200"
                    borderRadius="10px"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                    mb={4} // Espaçamento mínimo entre os itens
                    onClick={() => handleItemClick(item)} // Adiciona o manipulador de clique
                    cursor="pointer" // Altera o cursor ao passar por cima
                  >
                    <Flex
                      direction="column"
                      height="100%" // Garante que o conteúdo do Flex ocupe toda a altura
                    >
                      <Text fontWeight="bold" fontSize="md" mb={2}>
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
                      <Flex alignItems="center">
                        <Text
                          bg="black"
                          color="white"
                          p={1}
                          borderRadius="10px"
                          mb={1}
                        >
                          Código:
                        </Text>
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
                      <Flex alignItems="center">
                        <Text
                          bg="black"
                          color="white"
                          p={1}
                          borderRadius="10px"
                          mb={1}
                        >
                          Tipo:
                        </Text>
                        <Text ml={1}>{item.tipo}</Text>
                      </Flex>
                      <Flex alignItems="center">
                        <Text
                          bg="black"
                          color="white"
                          p={1}
                          borderRadius="10px"
                          mb={1}
                        >
                          Unidade de Medida:
                        </Text>
                        <Text ml={1}>{item.um}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
              </Grid>
            ) : (
              <Text mt={4}>Nenhum resultado encontrado.</Text>
            )}
            {selectedItem && ( // Renderiza os detalhes do item selecionado
              <Box mt={4}>
                <Text fontWeight="bold">Detalhes do Item Selecionado:</Text>
                <Text>Descrição: {selectedItem.descricao}</Text>
                <Text>Código: {selectedItem.codigo}</Text>
                <Text>Tipo: {selectedItem.tipo}</Text>
                <Text>Unidade de Medida: {selectedItem.um}</Text>
              </Box>
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
