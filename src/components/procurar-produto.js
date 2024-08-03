import React, { useState, useEffect } from "react";
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
  Td,
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
  Tbody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Toast,
  useToast,
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
import { MdPersonSearch } from "react-icons/md";
import { FaSearchPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { fetchToken } from "../apis/token-api";
import { MdSearch, MdThumbUp } from "react-icons/md";
import { format, subDays, subYears } from "date-fns";
import fetchHistoricoProdutos from "../apis/historico-pedidos-api";
import fetchTabPreco from "../apis/preco-produtos";

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
  const { globalToken, setGlobalToken } = useAppContext();
  const { username, setUsername } = useAppContext();
  const { password, setPassword } = useAppContext();
  const { clienteCodigo } = useAppContext();

  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { rowItem, setRowItem } = useAppContext();

  console.log(
    "rowItem no pegando historico de produtos no procurar produto",
    rowItem["loja  "]
  );

  const oneYearAgo = format(subYears(new Date(), 1), "dd/MM/yyyy");
  const thirtyDaysAgo = format(subDays(new Date(), 30), "dd/MM/yyyy");

  const toast = useToast();
  const toastIdRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        "pegando historico de produtos no procurar produto",
        rowItem.codCliente
      );
      try {
        setIsLoading(true);
        const data = await fetchTabPreco("LUB3E5", globalToken.access_token);

        setSearchResults(data);

        console.log("datadata", data);

        const result = await fetchHistoricoProdutos(
          rowItem.codigo,
          oneYearAgo,
          thirtyDaysAgo,
          globalToken.access_token
        );
        console.log(" pegando historico,", result);
        setData(result);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    setIsLoading(false);
  }, []);

  // const filteredResults = searchResults.filter(
  //   (item) =>
  //     item.descricao.toLowerCase().includes(descriptionFilter.toLowerCase()) &&
  //     item.codigo.toLowerCase().includes(codeFilter.toLowerCase())
  // );

  const handleSearch = (event) => {
    setSelectedItem("");
    setPrecoTotal(0);
    setPrecoUnitario(0);
    setQuantidade(1);

    setSearchTerm(event.target.value.toUpperCase());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
    setCodeFilter("");
    setDescriptionFilter("");
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

  const handleCalculatePrice = () => {
    setIsCalculating(true);

    console.log("skol - item clicado", selectedItem);

    const pegaritem = searchResults.find(
      (item) => selectedItem.desc_pro === item.desc_pro
    );
    console.log("skol - item achado", pegaritem);

    if (pegaritem) {
      // Filtra os itens pelo mesmo produto
      const filteredItems = searchResults.filter(
        (item) => item.desc_pro === pegaritem.desc_pro
      );

      // Ordena os itens pelas faixas de forma crescente
      const sortedItems = filteredItems.sort((a, b) => a.faixa - b.faixa);
      console.log(`skol - item sort`, sortedItems);

      // Encontra a faixa mais próxima superior ou igual
      // const item = sortedItems

      let item = "JC";

      for (let index = 0; index < sortedItems.length; index++) {
        if (index + 1 <= sortedItems.length - 1) {
          let current = sortedItems[index];
          console.log("skol - current", current);

          let next = sortedItems[index + 1];
          console.log("skol - next", next);

          // 3 - 4 = 2
          // 2 > 2 ? NAO
          if (quantidade > current.faixa) {
            item = next;
            console.log("skol - item recebendo next", item);
          } else {
            if (quantidade === current.faixa) {
              item = current;
              console.log("skol - item recebendo current", item);
              break;
            }
          }
        }
      }

      console.log("skol - item fora do laco", item);

      if (item.faixa === undefined) {
        console.log("skol - entrou no if");

        item = sortedItems[sortedItems.length - 1];
      }

      // [2, 4, 8, 12, 9999, 999999.999] --- 6

      console.log("skol - pega preco", item);
      console.log(`skol - faixa atual ${item.faixa} e qtd atual ${quantidade}`);

      if (item) {
        setPrecoUnitario(item.preco);
        setPrecoTotal(item.preco * quantidade);
      } else {
        setPrecoUnitario(0);
        setPrecoTotal(0);
      }
    } else {
      setPrecoUnitario(0);
      setPrecoTotal(0);
    }

    setIsCalculating(false);
  };

  // const handleCalculatePrice = async () => {
  //   setIsCalculating(true);
  //   setIsLoading2(true);

  //   // try {
  //   //   const produto = selectedItem.codigo;
  //   //   const qtd = quantidade;
  //   //   const cliente = rowItem.codCliente || clienteCodigo;
  //   //   const loja = rowItem.lojaCliente || rowItem["loja  "];
  //   //   console.log("loja", rowItem.codlojaCliente);
  //   //   const response = await fetchPrecoDeVenda({
  //   //     loja,
  //   //     cliente,
  //   //     produto,
  //   //     qtd,
  //   //     token: globalToken.access_token,
  //   //   });

  //   //   if (response && response.preco >= 0 && response.quantidade) {
  //   //     const precoTotal = response.preco * response.quantidade;
  //   //     const precoUnit = response.preco;
  //   //     setPrecoTotal(precoTotal);
  //   //     setPrecoUnitario(precoUnit);
  //   //     setCalculado(true); // Atualiza o estado para indicar que o cálculo foi feito
  //   //     setControlaAbrir(true);
  //   //   } else {
  //   //     console.error("Resposta da API inválida:", response);
  //   //     // Se o preço retornado for zero ou negativo, definimos o preço unitário e total como zero
  //   //     setPrecoTotal(0);
  //   //     setPrecoUnitario(0);
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Erro ao calcular o preço de venda:", error);
  //   //   // Verificar se o erro é de autorização (401 Unauthorized)
  //   //   if (error.response && error.response.status === 401) {
  //   //     // Solicitar um novo token de acesso
  //   //     try {
  //   //       const newToken = await fetchToken(username, password);
  //   //       // Refazer a chamada à função fetchPrecoDeVenda com o novo token de acesso
  //   //       const produto = selectedItem.codigo;
  //   //       const qtd = quantidade;
  //   //       const newResponse = await fetchPrecoDeVenda({
  //   //         produto,
  //   //         qtd,
  //   //         token: newToken.access_token,
  //   //       });
  //   //       if (newResponse && newResponse.preco >= 0 && newResponse.quantidade) {
  //   //         const precoTotal = newResponse.preco * newResponse.quantidade;
  //   //         const precoUnit = newResponse.preco;
  //   //         setPrecoTotal(precoTotal);
  //   //         setPrecoUnitario(precoUnit);
  //   //         setCalculado(true); // Atualiza o estado para indicar que o cálculo foi feito
  //   //         setControlaAbrir(true);
  //   //       } else {
  //   //         console.error("Resposta da API inválida:", newResponse);
  //   //         // Se o preço retornado for zero ou negativo, definimos o preço unitário e total como zero
  //   //         setPrecoTotal(0);
  //   //         setPrecoUnitario(0);
  //   //       }
  //   //     } catch (error) {
  //   //       console.error("Erro ao obter novo token de acesso:", error);
  //   //       // Lidar com o erro ao obter o novo token de acesso
  //   //     }
  //   //   }
  //   // } finally {
  //     // }
  //     setIsCalculating(false);
  //     setIsLoading2(false);
  // };

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

  const nfItems = (data || []).filter((item) => item.tipo === "NF");
  console.log("nfItems ---------->", nfItems);

  const groupedByFornecedor = nfItems.reduce((acc, item) => {
    item.itens.forEach((produto) => {
      const fornecedor = produto.nome_fornecedor || "Fornecedor Desconhecido";
      if (!acc[fornecedor]) {
        acc[fornecedor] = [];
      }
      acc[fornecedor].push({
        ...item,
        produtos: item.itens.filter((p) => p.nome_fornecedor === fornecedor),
      });
    });
    return acc;
  }, {});

  console.log("data procurar produtos nfitems", nfItems);
  console.log(
    "data procurar produtos nfitems2",
    Object.keys(groupedByFornecedor).length
  );
  // console.log("data procurar produtos", groupedByFornecedor);

  const copyCodeToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado!",
      description: `${code}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDescriptionInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    setDescriptionFilter(value);
  };

  const handleCodeInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    setCodeFilter(value);
  };

  const filteredResults = searchResults.filter(
    (item) =>
      item.desc_pro.toLowerCase().includes(descriptionFilter.toLowerCase()) &&
      item.codigo_pro.toLowerCase().includes(codeFilter.toLowerCase()) &&
      (item.desc_pro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo_pro.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ color: "red", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        leftIcon={<FaSearch />} // Usando o ícone de busca da react-icons
        colorScheme="blue"
        variant="outline"
        bg="white"
      >
        Procurar Produto
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent bg="gray.100">
          <ModalHeader bg="#2C0E37" color="white">
            <Flex align="center">
              <MdPersonSearch />
              <Text ml="15px">Buscar Produto</Text>
            </Flex>
          </ModalHeader>
          <Center>
            <Divider borderWidth={1} maxW="95%" />
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Tabs
              variant="soft-rounded"
              colorScheme="purple"
              bg="gray.200"
              borderRadius="10px"
              borderColor="gray"
              p={3}
            >
              <TabList>
                <Tab>
                  <MdThumbUp style={{ marginRight: "8px" }} />
                  Produtos Sugeridos
                </Tab>
                <Tab>
                  <MdSearch style={{ marginRight: "8px" }} />
                  Pesquisar Produtos
                </Tab>
              </TabList>
              <TabPanels>
                {/* AQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUIAQUI */}
                <TabPanel>
                  <Tabs align="center" colorScheme="purple">
                    <TabList>
                      {Object.keys(groupedByFornecedor).map((fornecedor) => (
                        <Tab key={fornecedor}>{fornecedor}</Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {Object.keys(groupedByFornecedor).length > 0 ? (
                        Object.keys(groupedByFornecedor).map(
                          (fornecedor, index) => (
                            <TabPanel key={fornecedor}>
                              <Table
                                bg="white"
                                variant="striped"
                                colorScheme="gray"
                              >
                                <Thead bg="#6b3181">
                                  <Tr key={index}>
                                    <Th color="white" fontWeight="semibold">
                                      Código Produto
                                    </Th>
                                    <Th color="white" fontWeight="semibold">
                                      Descrição Produto
                                    </Th>
                                    <Th color="white" fontWeight="semibold">
                                      Tipo Produto
                                    </Th>
                                    <Th color="white" fontWeight="semibold">
                                      Valor Produto
                                    </Th>
                                    <Th color="white" fontWeight="semibold">
                                      Quantidade Produto
                                    </Th>
                                    <Th color="white" fontWeight="semibold">
                                      Volume Produto
                                    </Th>
                                    <Th color="white" fontWeight="semibold">
                                      Desconto Produto
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {groupedByFornecedor[fornecedor].map(
                                    (item, idx) =>
                                      item.produtos.map((produto, pIdx) => (
                                        <Tr
                                          style={{ cursor: "pointer" }}
                                          _hover={{
                                            boxShadow: "lg",
                                            borderColor: "black",
                                            transform: "scale(1.02)",
                                          }}
                                          key={`${idx}-${pIdx}`}
                                          onClick={() =>
                                            copyCodeToClipboard(
                                              produto.cod_produto
                                            )
                                          }
                                        >
                                          <Td>{produto.cod_produto}</Td>
                                          <Td>{produto.descricao_produto}</Td>
                                          <Td>{produto.tipo_produto}</Td>
                                          <Td>R$ {produto.valor_produto}</Td>
                                          <Td>{produto.qtde_produto}</Td>
                                          <Td>{produto.volume_produto}</Td>
                                          <Td>{produto.desconto_produto}</Td>
                                        </Tr>
                                      ))
                                  )}
                                </Tbody>
                              </Table>
                            </TabPanel>
                          )
                        )
                      ) : (
                        <TabPanel>
                          <div
                            style={{ textAlign: "center", marginTop: "20px" }}
                          >
                            <strong>
                              Não foi possível sugerir produtos ao cliente.
                            </strong>
                          </div>
                        </TabPanel>
                      )}
                    </TabPanels>
                  </Tabs>
                </TabPanel>

                <TabPanel>
                  <Flex align="center" justify="center">
                    <Input
                      flex="1"
                      mt="10px"
                      placeholder="Digite o nome do produto"
                      value={searchTerm}
                      bg="white"
                      onChange={handleSearch}
                      onKeyPress={handleKeyPress}
                      focusBorderColor="purple.700"
                      mb={2}
                    />
                    <Button
                      mb={2}
                      ml={4}
                      mt="10px"
                      onClick={handleSearch}
                      colorScheme="blue"
                      bg="white"
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
                    <TableContainer
                      maxH="400px"
                      overflowY="auto"
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: "8px",
                          height: "8px",
                          backgroundColor: "white",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#888",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "#555",
                        },
                      }}
                    >
                      <Table bg="white" variant="striped" colorScheme="gray">
                        <Thead bg="#6b3181">
                          <Tr>
                            <Th color="white" fontWeight="semibold" width="40%">
                              <Flex direction="column">
                                <span>Descrição</span>
                              </Flex>
                            </Th>
                            <Th color="white" fontWeight="semibold" width="20%">
                              <Flex direction="column">
                                <span>Código</span>
                              </Flex>
                            </Th>
                            <Th color="white" fontWeight="semibold" width="20%">
                              Tipo
                            </Th>
                            <Th color="white" fontWeight="semibold" width="20%">
                              Unidade de Medida
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {filteredResults.length > 0 ? (
                            filteredResults.slice(0, 100).map((item, index) => (
                              <Tr
                                key={index}
                                border="2px"
                                borderColor={
                                  selectedItem === item ? "#6b3181" : "gray.200"
                                }
                                onClick={() => handleItemClick(item)}
                                cursor="pointer"
                                _hover={{
                                  transform: "scale(1.01)",
                                  boxShadow: "lg",
                                }}
                              >
                                <Td width="40%">
                                  <Text
                                    fontSize="md"
                                    color="black"
                                    borderRadius="10px"
                                    p={1}
                                  >
                                    {highlightText(item.desc_pro, searchTerm)}
                                  </Text>
                                </Td>
                                <Td width="20%">
                                  {highlightText(item.codigo_pro, searchTerm)}
                                </Td>
                                <Td width="20%">{item.tipo_pro}</Td>
                                <Td width="20%">{item.um_pro}</Td>
                              </Tr>
                            ))
                          ) : (
                            <Tr>
                              <Td colSpan={4} textAlign="center">
                                <strong>Nenhum resultado encontrado.</strong>
                              </Td>
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text mt={4}>Nenhum resultado encontrado.</Text>
                  )}{" "}
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Flex justify="space-between">
              <Box flexBasis="45%">
                {selectedItem && (
                  <>
                    <Box
                      mt={4}
                      bg="white"
                      p={4}
                      color="#822AA2"
                      mb={5}
                      border="2px"
                      borderRadius={10}
                      shadow="sm"
                    >
                      <Text fontWeight="bold" mb={2} as="u">
                        Detalhes do Item Selecionado:
                      </Text>
                      <Text mb={1}>
                        Descrição: <strong>{selectedItem.desc_pro}</strong>
                      </Text>
                      <Text mb={1}>
                        Código: <strong>{selectedItem.codigo_pro}</strong>
                      </Text>
                      <Text mb={1}>
                        Tipo: <strong>{selectedItem.tipo_pro}</strong>
                      </Text>
                      <Text mb={1}>
                        Unidade de Medida:{" "}
                        <strong>{selectedItem.um_pro}</strong>
                      </Text>
                    </Box>
                    <Flex alignItems="center">
                      <Text fontWeight="bold" mr={2}>
                        Quantidade:
                      </Text>
                      <Box>
                        <NumberInput
                          focusBorderColor="purple.700"
                          bg="white"
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
                        colorScheme="purple"
                        loadingText="Calculando..."
                        variant="outline"
                        leftIcon={<MdCalculate />}
                        disabled={isCalculating}
                        bg="white"
                        _hover={{ bg: "purple.100" }}
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
                        bg="white"
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
                          <CardBody p={2}>
                            {precoUnitario !== null ? (
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
                                    {precoUnitario}
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
                  <Flex align="center">
                    <FaShoppingCart color="#822AA2" />
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      ml="15px"
                      color="#822AA2"
                    >
                      Itens Adicionados
                    </Text>
                  </Flex>
                  {valoresSelecionados.map((item, index) => (
                    <Box
                      key={index}
                      mt={4}
                      p={4}
                      borderRadius="md"
                      boxShadow="md"
                      bg="white"
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                    >
                      <Text color="#822AA2" fontWeight="semibold">
                        Nome do Produto:
                      </Text>
                      <Text>{item.descricao}</Text>
                      <Text color="#822AA2" fontWeight="semibold" mt={2}>
                        Quantidade:
                      </Text>
                      <Text>{item.quantidade}</Text>
                      <Text color="#822AA2" fontWeight="semibold" mt={2}>
                        Preço:
                      </Text>
                      <Text>R${item.precoTotal.toFixed(2)}</Text>
                      <IconButton
                        mt="1px"
                        ml="0px"
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
              bg="white"
              onClick={closeModal}
              leftIcon={<FaTimes />} // Usando o ícone de fechar da react-icons
            >
              Fechar
            </Button>
            <Button
              bg="white"
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
