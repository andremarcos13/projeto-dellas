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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Importando ícones da react-icons
import fetchProdutos from "../apis/produtos-api";
import fetchPrecoDeVenda from "../apis/preco-venda-api";
import { MdCalculate } from "react-icons/md";

const ProcurarProduto = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantidade, setQuantidade] = useState(1); // Estado para a quantidade
  const [isCalculating, setIsCalculating] = useState(false); // Estado para controlar se o cálculo está em andamento
  const [precoTotal, setPrecoTotal] = useState(null); // Estado para armazenar o preço total
  const [precoUnitario, setPrecoUnitario] = useState(null); // Estado para armazenar o preço unitário

  const handleSearch = async () => {
    setSelectedItem("");
    setPrecoTotal(0);
    setPrecoUnitario(0);
    setQuantidade(1);
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
    setSelectedItem("");
    setPrecoTotal(0);
    setPrecoUnitario(0);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setPrecoTotal(0);
    setPrecoUnitario(0);
    setQuantidade(1);
  };

  const handleCalculatePrice = async () => {
    setIsCalculating(true);
    setIsLoading2(true);
    try {
      const produto = selectedItem.codigo;
      const qtd = quantidade;
      const response = await fetchPrecoDeVenda({ produto, qtd });

      if (response && response.preco >= 0 && response.quantidade) {
        const precoTotal = response.preco * response.quantidade;
        const precoUnit = response.preco;
        setPrecoTotal(precoTotal);
        setPrecoUnitario(precoUnit);
      } else {
        console.error("Resposta da API inválida:", response);
        // Se o preço retornado for zero ou negativo, definimos o preço unitário e total como zero
        setPrecoTotal(0);
        setPrecoUnitario(0);
      }
    } catch (error) {
      console.error("Erro ao calcular o preço de venda:", error);
    } finally {
      setIsCalculating(false);
      setIsLoading2(false);
    }
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
              <Center mt="5%">
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
                    borderColor={selectedItem === item ? "black" : "gray.200"} // Altera a cor da borda com base no item selecionado
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
                                      1 && (
                                    <span style={{ color: "red" }}>
                                      {searchTerm}
                                    </span>
                                  )}
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
              <>
                <Box mt={4}>
                  <Text fontWeight="bold">Detalhes do Item Selecionado:</Text>
                  <Text mb={1}>Descrição: {selectedItem.descricao}</Text>
                  <Text mb={1}>Código: {selectedItem.codigo}</Text>
                  <Text mb={1}>Tipo: {selectedItem.tipo}</Text>
                  <Text mb={1}>Unidade de Medida: {selectedItem.um}</Text>
                </Box>
                <Flex alignItems="center">
                  <Text mr={2}>Quantidade:</Text>
                  <Box>
                    <NumberInput
                      defaultValue={1}
                      min={0}
                      w={100}
                      value={quantidade} // Define o valor do NumberInput como a quantidade
                      onChange={
                        (valueString) => setQuantidade(parseInt(valueString)) // Atualiza o estado da quantidade ao alterar o valor do NumberInput
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Button
                    ml={3}
                    onClick={handleCalculatePrice} // Chama a função para calcular o preço de venda
                    colorScheme="gray"
                    loadingText="Calculando..."
                    variant="outline"
                    leftIcon={<MdCalculate />} // Usando o ícone de busca da react-icons
                    disabled={isCalculating} // Desabilita o botão enquanto o cálculo está em andamento
                  >
                    {/* {isCalculating ? <Spinner size="sm" /> : "Calcular"} */}
                    Calcular
                  </Button>
                </Flex>
                {isLoading2 ? (
                  <Center>
                    <Spinner size="sm" />
                  </Center>
                ) : (
                  <>
                    {precoUnitario !== null && (
                      <Text
                        mt={4}
                        bg="gray"
                        color="white"
                        w={200}
                        p={3}
                        borderRadius="10px"
                        mb={1}
                      >
                        Preço Unitário: R${precoUnitario.toFixed(2)}
                      </Text>
                    )}
                    {precoTotal !== null && (
                      <Text
                        mt={4}
                        bg="gray"
                        color="white"
                        p={3}
                        w={200}
                        borderRadius="10px"
                        mb={1}
                      >
                        Preço total: R${precoTotal.toFixed(2)}
                      </Text>
                    )}
                  </>
                )}
              </>
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
