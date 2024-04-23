import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Text,
  CardHeader,
  VStack,
  Stack,
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
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa"; // Importando ícones da react-icons
import fetchProdutos from "../apis/produtos-api";
import fetchPrecoDeVenda from "../apis/preco-venda-api";
import { MdCalculate } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import DrawerCarrinho from "./drawer-carrinho";
import { MdAttachMoney } from "react-icons/md";
import { PiCoinsFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";

const ProcurarProduto = ({ onFinalizarAddProdutos, onRemoveItem }) => {
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
  const [valoresSelecionados, setValoresSelecionados] = useState([]);
  const [calculado, setCalculado] = useState(false);
  const [controlaAbrir, setControlaAbrir] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [hasNextPage, setHasNextPage] = useState(false); // Indica se há mais

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
        setHasNextPage(data.hasNext); // Definindo se há mais páginas disponíveis
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreResults = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const data = await fetchProdutos({ search: searchTerm, page: nextPage });
      if (data && data.items) {
        setSearchResults([...searchResults, ...data.items]); // Adicionando os novos resultados à lista existente
        setHasNextPage(data.hasNext); // Definindo se há mais páginas disponíveis
        setCurrentPage(nextPage); // Atualizando o número da página atual
      }
    } catch (error) {
      console.error("Erro ao carregar mais produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    const upperCaseValue = event.target.value.toUpperCase(); // Converte o valor para letras maiúsculas
    setSearchTerm(upperCaseValue);
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
    setCalculado(false); // Redefine o estado para indicar que o cálculo não foi feito
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
        setCalculado(true); // Atualiza o estado para indicar que o cálculo foi feito
        setControlaAbrir(true);
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

  const handleSalvar = () => {
    if (selectedItem && precoTotal !== null && precoUnitario !== null) {
      const newItem = {
        descricao: selectedItem.descricao,
        codigo: selectedItem.codigo,
        tipo: selectedItem.tipo,
        um: selectedItem.um,
        quantidade: quantidade,
        precoTotal: precoTotal,
        precoUnitario: precoUnitario,
      };
      setValoresSelecionados((prevValoresSelecionados) => {
        // Criamos uma nova cópia do array anterior e adicionamos o novo item
        return [...prevValoresSelecionados, newItem];
      });
    }
  };

  const handleFinalizar = () => {
    // Chama a função de retorno de chamada e passa os valores selecionados como argumento
    onFinalizarAddProdutos(valoresSelecionados);
    closeModal();
  };

  useEffect(() => {
    setValoresSelecionados(valoresSelecionados);
  }, [valoresSelecionados]);

  console.log("valoresSelecionados filho", valoresSelecionados);

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
                onKeyPress={handleKeyPress}
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
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        mb={2}
                        bg="gray.900"
                        color="white"
                        borderRadius="10px"
                        p={3}
                      >
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
                        <Text as="u" p={1} borderRadius="10px" mb={1}>
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
                                      item.descricao.split(searchTerm).length -
                                        1 && (
                                      <span style={{ color: "red" }}>
                                        <strong>{searchTerm}</strong>
                                      </span>
                                    )}
                                  </span>
                                ))}
                            </>
                          ) : (
                            item.codigo
                          )}
                        </Text>
                      </Flex>
                      <Flex alignItems="center">
                        <Text as="u" p={1} borderRadius="10px" mb={1}>
                          Tipo:
                        </Text>
                        <Text ml={1}>{item.tipo}</Text>
                      </Flex>
                      <Flex alignItems="center">
                        <Text as="u" p={1} borderRadius="10px" mb={1}>
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
            <Button
              onClick={loadMoreResults}
              isDisabled={!hasNextPage || isLoading}
            >
              {hasNextPage
                ? "Carregar mais resultados"
                : "Não há mais produtos com o código selecionado"}
            </Button>
            <Flex justify="space-between">
              <Box flexBasis="45%">
                {selectedItem && (
                  <>
                    <Box
                      mt={4}
                      bg="gray.200"
                      p={2}
                      mb={5}
                      border="2px"
                      borderRadius={5}
                      shadow="sm"
                    >
                      <Text fontWeight="bold" mb={2} as="u">
                        Detalhes do Item Selecionado:
                      </Text>
                      <Text mb={1}>
                        Descrição: <strong>{selectedItem.descricao}</strong>
                      </Text>
                      <Text mb={1}>
                        Código: <strong>{selectedItem.codigo}</strong>
                      </Text>
                      <Text mb={1}>
                        Tipo: <strong>{selectedItem.tipo}</strong>
                      </Text>
                      <Text mb={1}>
                        Unidade de Medida: <strong>{selectedItem.um}</strong>
                      </Text>
                    </Box>
                    <Flex alignItems="center">
                      <Text mr={2}>Quantidade:</Text>
                      <Box>
                        <NumberInput
                          defaultValue={1}
                          min={0}
                          w={100}
                          value={quantidade}
                          onChange={(valueString) =>
                            setQuantidade(parseInt(valueString))
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
                        onClick={handleCalculatePrice}
                        colorScheme="gray"
                        loadingText="Calculando..."
                        variant="outline"
                        leftIcon={<MdCalculate />}
                        disabled={isCalculating}
                      >
                        Calcular
                      </Button>
                      <Button
                        colorScheme="whatsapp"
                        variant="outline"
                        ml={3}
                        onClick={handleSalvar} // Chama a função para salvar os valores selecionados
                        leftIcon={<FaPlus />} // Usando o ícone de fechar da react-icons
                        isDisabled={precoUnitario === 0 || precoTotal === 0}
                      >
                        Adicionar
                      </Button>
                    </Flex>
                    {isLoading2 ? (
                      <Center mt={3}>
                        <Spinner size="sm" />
                      </Center>
                    ) : (
                      <>
                        <Card
                          mt={3}
                          p={1}
                          w={250}
                          h={120}
                          shadow="lg"
                          size="md"
                        >
                          {/* <CardHeader mt={0} p={0} ml={0} mr={0} mb={0}>
                            <MdAttachMoney />
                          </CardHeader> */}
                          <CardBody p={2}>
                            {calculado && precoUnitario !== null ? (
                              precoUnitario !== 0 ? (
                                <Flex alignItems="center">
                                  <Text
                                    mt={4}
                                    color="black"
                                    borderRadius="10px"
                                    mb={1}
                                    mr={2}
                                    fontWeight="bold"
                                  >
                                    Preço Unitário: R$
                                  </Text>
                                  <Text
                                    mt={4}
                                    color="black"
                                    borderRadius="10px"
                                    mb={1}
                                    _hover={{
                                      transform: "scale(1.25)",
                                    }}
                                  >
                                    {precoUnitario.toFixed(2)}
                                  </Text>
                                </Flex>
                              ) : (
                                <Text
                                  mt={4}
                                  color="black"
                                  p={3}
                                  borderRadius="10px"
                                  mb={3}
                                  fontWeight="bold"
                                >
                                  Preço unitário cadastrado com valor zero.
                                </Text>
                              )
                            ) : null}
                            {precoTotal !== null && precoTotal !== 0 && (
                              <Flex alignItems="center">
                                <Text
                                  mt={4}
                                  color="black"
                                  borderRadius="10px"
                                  mb={1}
                                  mr={2}
                                  fontWeight="bold"
                                >
                                  Preço total: R$
                                </Text>
                                <Text
                                  mt={4}
                                  color="black"
                                  borderRadius="10px"
                                  mb={1}
                                  _hover={{
                                    transform: "scale(1.25)",
                                  }}
                                >
                                  {precoTotal.toFixed(2)}
                                </Text>
                              </Flex>
                            )}
                          </CardBody>
                        </Card>
                      </>
                    )}
                  </>
                )}
              </Box>

              <Box flexBasis="45%" borderLeft="1px solid #E2E8F0" pl={4}>
                <Box mt={4}>
                  <Text fontWeight="bold" fontSize="xl">
                    Itens Adicionados:
                  </Text>
                  {valoresSelecionados.map((item, index) => (
                    <Box
                      key={index}
                      mt={4}
                      p={4}
                      borderRadius="md"
                      boxShadow="md"
                      bg="gray.100"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                    >
                      <Text fontWeight="semibold">Nome do Produto:</Text>
                      <Text>{item.descricao}</Text>
                      <Text fontWeight="semibold" mt={2}>
                        Quantidade:
                      </Text>
                      <Text>{item.quantidade}</Text>
                      <Text fontWeight="semibold" mt={2}>
                        Preço:
                      </Text>
                      <Text>R${item.precoTotal.toFixed(2)}</Text>
                      <IconButton
                        aria-label="Remover produto"
                        icon={<MdDelete />}
                        _hover={{ color: "red" }}
                        onClick={() => {
                          // Remover o item localmente no filho
                          const novosValoresSelecionados = [
                            ...valoresSelecionados,
                          ];
                          novosValoresSelecionados.splice(index, 1);
                          setValoresSelecionados(novosValoresSelecionados);

                          // Chamar a função para remover o item no pai
                          onRemoveItem(item); // ou onRemoveItem(index) se preferir passar o índice
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={closeModal}
              leftIcon={<FaTimes />} // Usando o ícone de fechar da react-icons
            >
              Fechar
            </Button>
            <Button
              colorScheme="whatsapp"
              variant="outline"
              onClick={handleFinalizar} // Chama a função para salvar os valores selecionados
              leftIcon={<FaCheck />} // Usando o ícone de fechar da react-icons
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProcurarProduto;
