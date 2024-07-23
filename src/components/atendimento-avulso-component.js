import {
  Alert,
  AlertIcon,
  Badge,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Modal,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  Icon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tfoot,
  Box,
  Text,
  GridItem,
  Grid,
  Divider,
  Heading,
  Textarea,
  Input,
  Select,
} from "@chakra-ui/react";
import { MdDone, MdPhone } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBarcode } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdDesignServices } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaRoad } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import fetchAgenda from "../apis/agenda-api";
import ProcurarProduto from "./procurar-produto";
import fetchCondPagamentos from "../apis/cond-pagamento";
import fetchTransportadoras from "../apis/transportadoras-api";
import enviarRequisicao from "../apis/finaliza-atendimento-api";
import { BeatLoader } from "react-spinners";
import { MdContactPhone } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
import { FcFinePrint } from "react-icons/fc";
import { VscTools } from "react-icons/vsc";
import { FaBalanceScale } from "react-icons/fa";
import fetchHistoricoProdutos from "../apis/historico-pedidos-api";
import { format, subDays } from "date-fns";
import { BiShow } from "react-icons/bi";
import { FcDataConfiguration } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";

import { fetchToken } from "../apis/token-api";
import historicoTitulos from "../apis/historico-titulos-api";
import fetchContatos from "../apis/contatos-api";
import fetchOperadores from "../apis/operadores-api";

const Atendimento1 = () => {
  // const [rowItem, setSelectedItem] = useState(null);
  const [editedObservations, setEditedObservations] = useState({});
  const [date, setDate] = useState("");
  const [valoresSelecionados, setValoresSelecionados] = useState([]);
  const [descontoTotal, setDescontoTotal] = useState(0);
  const [transportadoras, setTransportadoras] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [condPagamentos, setCondPagamentos] = useState([]);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [dadosAtendimento, setDadosAtendimento] = useState([]);
  const [condPagamentoSelecionado, setCondPagamentoSelecionado] = useState("1");
  const [operacaoSelecionada, setOperacaoSelecionada] = useState("1");
  const [msgNotaSelecionada, setMsgNotaSelecionada] = useState("");
  const [obsAtendimentoSelecionada, setObsAtendimentoSelecionada] =
    useState("");
  const [tipoFreteSelecionado, setTipoFreteSelecionado] = useState("C");
  const [isLoading2, setIsLoading2] = useState(false); // Alterado para false inicialmente

  const { rowItem, setRowItem } = useAppContext();
  const [transportadoraSelecionado, setTransportadoraSelecionada] = useState(
    rowItem.codtransp
  );
  const [obsClienteSelecionada, setObsSelecionada] = useState(
    rowItem.observacao
  );
  const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar a mensagem de erro
  const [responseData, setResponseData] = useState([]);

  const { globalToken, setGlobalToken } = useAppContext();

  const { dateGlobal, setDateGlobal } = useAppContext();
  const { username, setUsername } = useAppContext();
  const { password, setPassword } = useAppContext();
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const [dataInicial2, setDataInicial2] = useState("");
  const [dataFinal2, setDataFinal2] = useState("");

  const [historicoProdutos, setHistoricoProdutos] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const [contatos, setContatos] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [selectedOperador, setSelectedOperador] = useState("");

  const navigate = useNavigate();

  const storedTransportadoras = sessionStorage.getItem("transportadoras");
  const storedCondPagamentos = sessionStorage.getItem("condPagamentos");
  const storedOperadores = sessionStorage.getItem("operadores");

  console.log("jc socorro", storedOperadores);

  const parsedTransportadoras = JSON.parse(storedTransportadoras);
  const parsedCondPagamentos = JSON.parse(storedCondPagamentos);
  const parsedOperadores = JSON.parse(storedOperadores);

  console.log("username", username);

  const checkUser = () => {
    if (username === "" || password === "") {
      navigate("/error"); // Limpar selectedItem ao clicar no botão Voltar
    }
  };

  checkUser();

  console.log("globalToken atendimento", globalToken.access_token);

  // const closeModal = () => {
  //   setSelectedItem(null);
  // };

  // Função para atualizar a observação do cliente
  const updateObservation = (id, observation) => {
    setEditedObservations({ ...editedObservations, [id]: observation });
  };

  const handleChangeInputDate = (e) => {
    let input = e.target.value;
    // Remove tudo que não for número
    input = input.replace(/\D/g, "");

    // Verifica se a data possui menos de 8 dígitos
    if (input.length <= 8) {
      // Adiciona as barras de acordo com o tamanho da string
      if (input.length > 2 && input.length <= 4) {
        input = input.replace(/(\d{2})(\d{2})/, "$1/$2");
      } else if (input.length > 4) {
        input = input.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
      }
      // Atualiza o estado
      setDate(input);
    }
  };
  const dataAtual = new Date();

  // Obtém as horas, minutos e segundos
  const horas = dataAtual.getHours();
  const minutos = dataAtual.getMinutes();
  const segundos = dataAtual.getSeconds();

  // Formata a hora para exibição com dois dígitos (por exemplo, '09' em vez de '9')
  const horasFormatadas = horas < 10 ? "0" + horas : horas;
  const minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
  const segundosFormatados = segundos < 10 ? "0" + segundos : segundos;

  const horarioAtual = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;

  const tipoFreteOptions = [
    { value: "C", label: "CIF" },
    { value: "F", label: "FOB" },
    { value: "T", label: "Terceiros" },
    { value: "R", label: "Remetente" },
    { value: "D", label: "Destinatário" },
    { value: "S", label: "Sem cobrança de frete" },
  ];

  const tipoOperacaoOptions = [
    { value: "1", label: "Faturamento" },
    { value: "2", label: "Orçamento" },
    { value: "3", label: "Atendimento" },
  ];

  const customStyles = {
    control: {
      backgroundColor: "transparent",
      borderColor: "green.500", // Altera a cor da borda quando o controle está focado
    },
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "green.500" : "white", // Define a cor de fundo das opções selecionadas como verde e as não selecionadas como branca
      color: state.isSelected ? "white" : "black", // Define a cor do texto das opções selecionadas como branco e as não selecionadas como preto
      "&:hover": {
        backgroundColor: "lightgreen", // Define a cor de fundo ao passar o mouse sobre as opções
      },
    }),
  };

  const handleBackButtonClick = async () => {
    //   try {
    //     const agendaData = await fetchAgenda(
    //       dateGlobal,
    //       globalToken.access_token
    //     ); // Chame fetchAgenda com dateGlobal
    //     // Faça o que você precisa com os dados retornados, por exemplo, definir o estado ou realizar outras operações
    //     console.log(agendaData);
    //   } catch (error) {
    //     console.error("Erro ao buscar a agenda:", error);
    //     // Verificar se o erro é de autorização (401 Unauthorized)
    //     if (error.response && error.response.status === 401) {
    //       // Solicitar um novo token de acesso
    //       try {
    //         const newToken = await fetchToken(username, password);
    //         // Refazer a chamada à função fetchAgenda com o novo token de acesso
    //         const agendaData = await fetchAgenda(
    //           dateGlobal,
    //           newToken.access_token
    //         );
    //         // Faça o que você precisa com os dados retornados
    //         console.log(agendaData);
    //       } catch (error) {
    //         console.error("Erro ao obter novo token de acesso:", error);
    //         // Lidar com o erro ao obter o novo token de acesso
    //       }
    //     } else {
    //       // Lidar com outros tipos de erro
    //     }
    //   }
    navigate("/atendimento"); // Limpar selectedItem ao clicar no botão Voltar
  };

  const handleFinalizarAddProdutos = (valores) => {
    console.log("Finalizado no papito:", valores);
    // Faça o que quiser com os valores selecionados, como armazená-los no estado do componente pai
    setValoresSelecionados(valores);
  };

  const obterDataAtual = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`; // Formato do input type "date" é yyyy-mm-dd
  };

  // Função para calcular o total da quantidade
  const calcularTotalQuantidade = () => {
    return valoresSelecionados.reduce(
      (total, produto) => total + produto.quantidade,
      0
    );
  };

  // Função para calcular o total do valor total
  const calcularTotalValorTotal = () => {
    return valoresSelecionados.reduce(
      (total, produto) => total + produto.precoTotal,
      0
    );
  };

  const handleDescontoChange = (index, desconto) => {
    setValoresSelecionados((prevState) =>
      prevState.map((produto, i) =>
        i === index ? { ...produto, desconto: desconto } : produto
      )
    );
  };

  const handleDescontoTotalChange = (e) => {
    setDescontoTotal(e.target.value);
  };

  const calcularPrecoTotalComDesconto = (precoTotal, desconto) => {
    const valorDesconto = (precoTotal * desconto) / 100;
    return precoTotal - valorDesconto;
  };

  const calcularPrecoTotal = (quantidade, precoUnitario, desconto) => {
    // Verifica se o desconto é um número válido, se não for, define como zero
    if (isNaN(desconto)) {
      desconto = 0;
    }

    const precoTotal = quantidade * precoUnitario;
    return calcularPrecoTotalComDesconto(precoTotal, desconto);
  };

  const calcularPrecoTotalGeral = () => {
    let precoTotalGeral = 0;
    valoresSelecionados.forEach((produto) => {
      precoTotalGeral +=
        calcularPrecoTotal(
          produto.quantidade,
          produto.precoUnitario,
          produto.desconto
        ) || 0;
    });
    const descontoTotalDecimal = descontoTotal / 100;
    precoTotalGeral *= 1 - descontoTotalDecimal;
    return precoTotalGeral;
  };

  const getCondPagamentos = async () => {
    setIsLoading(true);

    try {
      const response = await fetchCondPagamentos(globalToken.access_token);
      setCondPagamentos(response.items); // Supondo que o array de objetos esteja em response.items
      console.log("condPagamentos", condPagamentos);
    } catch (error) {
      console.error(error);

      console.log("COND PAGAMENTOS NO ATENDIMENTO, ===>", error);
      // Verificar se o erro é de autorização (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        // Solicitar um novo token de acesso
        try {
          console.log("entrou no try do cond pagamentos, ===>");
          const newToken = await fetchToken(username, password);
          console.log(
            "NEW TOKEN NO COND PAGAMENTOS, ===>",
            newToken.access_token
          );
          // Refazer a chamada à função fetchCondPagamentos com o novo token de acesso
          const response = await fetchCondPagamentos(newToken.access_token);
          setCondPagamentos(response.items); // Supondo que o array de objetos esteja em response.items
          console.log("condPagamentos", condPagamentos);
        } catch (error) {
          console.error("Erro ao obter novo token de acesso:", error);
          // Lidar com o erro ao obter o novo token de acesso
        }
      } else {
        // Lidar com outros tipos de erro
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTransportadoras = async () => {
    setIsLoading(true);

    try {
      const response = await fetchTransportadoras(globalToken.access_token);
      setTransportadoras(response.items); // Supondo que o array de objetos esteja em response.items
      console.log("getTransportadoras", transportadoras);
    } catch (error) {
      console.error(error);
      // Verificar se o erro é de autorização (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        // Solicitar um novo token de acesso
        try {
          const newToken = await fetchToken(username, password);
          // Refazer a chamada à função fetchTransportadoras com o novo token de acesso
          const response = await fetchTransportadoras(newToken.access_token);
          setTransportadoras(response.items); // Supondo que o array de objetos esteja em response.items
          console.log("getTransportadoras", transportadoras);
        } catch (error) {
          console.error("Erro ao obter novo token de acesso:", error);
          // Lidar com o erro ao obter o novo token de acesso
        }
      } else {
        // Lidar com outros tipos de erro
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getHistoricoProdutos = async (
    clienteHistPedidos = rowItem.codigo,
    dataInicial,
    dataFinal,
    token = globalToken.access_token
  ) => {
    setIsLoading(true);

    try {
      const response = await fetchHistoricoProdutos(
        (clienteHistPedidos = rowItem.codigo),
        dataInicial,
        dataFinal,
        (token = globalToken.access_token)
      );
      setHistoricoProdutos(response);
      console.log("historico", historicoProdutos);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await fetchToken(username, password);
          const response = await fetchHistoricoProdutos(
            (clienteHistPedidos = rowItem.codigo),
            dataInicial,
            dataFinal,
            newToken.access_token
          );
          setHistoricoProdutos(response);
        } catch (error) {
          console.error("Erro ao obter novo token de acesso:", error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getContatos = async () => {
    try {
      const data = await fetchContatos({
        empresa: "01",
        filial: "01",
        page: 1,
        pageSize: 10000,
        cliente: rowItem.codigo,
        loja: "01",
        token: globalToken.access_token,
      });

      setContatos(data.items);
      console.log("contatos ->", contatos);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOperadores = async () => {
    try {
      const data = await fetchOperadores({
        empresa: "01",
        filial: "01",
        token: globalToken.access_token,
      });

      setOperadores(data.items);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("inicia 1o use effect loadin2");
    setIsLoading2(true);
    console.log("loadin2", isLoading2);

    const fetchApis = async () => {
      const today = format(new Date(), "dd/MM/yyyy");
      const ninetyDaysAgo = format(subDays(new Date(), 90), "dd/MM/yyyy");
      setDataFinal(today);
      setDataInicial(ninetyDaysAgo);

      setDataFinal2(today);
      setDataInicial2(ninetyDaysAgo);

      try {
        // await getCondPagamentos(globalToken.access_token);
        // await getTransportadoras(globalToken.access_token);
        // await getHistoricoProdutos(globalToken.access_token);
        await getContatos({
          empresa: "01",
          filial: "01",
          page: 1,
          pageSize: 10000,
          cliente: rowItem.codigo,
          loja: "01",
          token: globalToken.access_token,
        });
        // await getOperadores({
        //   empresa: "01",
        //   filial: "01",
        //   token: globalToken.access_token,
        // });
      } catch (error) {
        // Lidar com erros, se necessário
        console.error("Erro ao buscar APIs:", error);
        // Verificar se o erro é de autorização (401 Unauthorized)
        if (error.response && error.response.status === 401) {
          // Solicitar um novo token de acesso
          try {
            const newToken = await fetchToken(username, password);
            // Refazer as chamadas às funções getCondPagamentos e getTransportadoras com o novo token de acesso
            // await getCondPagamentos(newToken.access_token);
            // await getTransportadoras(newToken.access_token);
            // await getHistoricoProdutos(newToken.access_token);
            // await historicoTitulos(newToken.access_token);
            await getContatos({
              empresa: "01",
              filial: "01",
              page: 1,
              pageSize: 10000,
              cliente: rowItem.codigo,
              loja: "01",
              token: newToken.access_token,
            });
            // await getOperadores({
            //   empresa: "01",
            //   filial: "01",
            //   token: newToken.access_token,
            // });
          } catch (error) {
            console.error("Erro ao obter novo token de acesso:", error);
            // Lidar com o erro ao obter o novo token de acesso
          }
        }
      } finally {
        setIsLoading2(false);
      }
    };

    fetchApis();
  }, []);

  useEffect(() => {
    const precoTotalGeral = calcularPrecoTotalGeral();
    console.log("Preço total geral recalculado:", precoTotalGeral);
    // Faça o que for necessário com o preço total geral recalculado, como atualizar o estado ou enviar para a API
  }, [valoresSelecionados, descontoTotal]);

  const handleCondPagamentoChange = (event) => {
    const selectedOption = event.target.value;
    setShowAdditionalInputs(selectedOption === "999");
    setCondPagamentoSelecionado(event.target.value);
  };

  const handleTransportadora = (event) => {
    setTransportadoraSelecionada(event.target.value);
  };

  const handleOperacao = (event) => {
    setOperacaoSelecionada(event.target.value);
  };

  const handleMsgNota = (event) => {
    // Obtém o valor do campo de texto e atualiza o estado
    setMsgNotaSelecionada(event.target.value);
  };

  const handleObsCliente = (event) => {
    // Obtém o valor do campo de texto e atualiza o estado
    setObsSelecionada(event.target.value);
  };

  const handleObsAtendimento = (event) => {
    // Obtém o valor do campo de texto e atualiza o estado
    setObsAtendimentoSelecionada(event.target.value);
  };

  const handleTipoFrete = (event) => {
    // Obtém o valor do campo de texto e atualiza o estado
    setTipoFreteSelecionado(event.target.value);
  };

  const handleRemoveItem = (itemToRemove) => {
    // Filtra os valores selecionados, removendo o item a ser removido
    const novosValoresSelecionados = valoresSelecionados.filter(
      (item) => item !== itemToRemove
    );
    setValoresSelecionados(novosValoresSelecionados);
  };

  console.log("contato ->>", contatos.nome);

  const isButtonDisabled = () => {
    // Verifica se algum estado necessário está vazio ou indefinido
    if (
      !rowItem.codigo ||
      // !contatos[0].codigo ||
      // !rowItem.codOperador ||
      !condPagamentoSelecionado ||
      !operacaoSelecionada ||
      // !msgNotaSelecionada ||
      // !obsClienteSelecionada ||
      !obsAtendimentoSelecionada ||
      !transportadoraSelecionado ||
      !tipoFreteSelecionado
    ) {
      // Verifica qual estado específico está vazio ou indefinido e imprime no console
      if (!rowItem.codCliente)
        console.log("rowItem.codCliente está vazio ou indefinido");
      if (!rowItem.contato)
        console.log("rowItem.contato está vazio ou indefinido");
      if (!rowItem.vendedor)
        console.log("rowItem.vendedor está vazio ou indefinido");
      if (!rowItem.codOperador)
        console.log("rowItem.codOperador está vazio ou indefinido");
      if (!condPagamentoSelecionado)
        console.log("condPagamentoSelecionado está vazio ou indefinido");
      if (!operacaoSelecionada)
        console.log("operacaoSelecionada está vazio ou indefinido");
      if (!msgNotaSelecionada)
        console.log("msgNotaSelecionada está vazio ou indefinido");
      if (!obsClienteSelecionada)
        console.log("obsClienteSelecionada está vazio ou indefinido");
      if (!obsAtendimentoSelecionada)
        console.log("obsAtendimentoSelecionada está vazio ou indefinido");
      if (!transportadoraSelecionado)
        console.log("transportadoraSelecioando está vazio ou indefinido");
      if (!tipoFreteSelecionado)
        console.log("tipoFreteSelecionado está vazio ou indefinido");
      if (valoresSelecionados.length === 0)
        console.log("valoresSelecionados está vazio");

      return true; // Se algum estado estiver vazio ou indefinido, o botão deve ser desabilitado
    }
    return false; // Caso contrário, o botão deve ser habilitado
  };

  const codigoDoContato = contatos.length > 0 ? contatos[0].codigo : "";

  console.log("codigoDoContato", codigoDoContato);

  const bodyApi = {
    cliente: rowItem.codigo,
    loja: rowItem.loja || "01",
    contato: codigoDoContato,
    // vendedor: "" || selectedOperador.codusuario,
    operador: selectedOperador,
    condpag: condPagamentoSelecionado,
    tabela: "L02",
    operacao: operacaoSelecionada,
    msgNota: msgNotaSelecionada,
    obsCliente: obsClienteSelecionada,
    dataLigacao: obterDataAtual(),
    horaLigacao: horarioAtual,
    obsAtendimento: obsAtendimentoSelecionada,
    transportadora: transportadoraSelecionado,
    tipoFrete: tipoFreteSelecionado,
    tipoCliente: "F",
    produtos: valoresSelecionados.map((produto) => {
      const precoUnitarioComDesconto =
        calcularPrecoTotal(
          produto.quantidade,
          produto.precoUnitario,
          produto.desconto
        ) / produto.quantidade; // Calcula o preço unitário com desconto
      return {
        produto: produto.codigo,
        quant: produto.quantidade,
        valorUnit: precoUnitarioComDesconto,
      };
    }),
  };

  console.log("bodyApibodyApi", bodyApi);

  const handleClickFinalizaAtendimento = async () => {
    setIsLoading(true); // Alterado para true ao iniciar o login
    setErrorMessage("");

    try {
      // Chama a função enviarRequisicao com o requestBody necessário
      const resposta = await enviarRequisicao(
        bodyApi,
        globalToken.access_token
      );
      console.log("Resposta da requisição:", resposta);
      setIsLoading(false); // Alterado para false quando houver um erro

      // Faça o que for necessário com a resposta da requisição...
    } catch (error) {
      // Verifique se a resposta contém a mensagem de erro
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Define a mensagem de erro recebida da API
        setIsLoading(false); // Alterado para false quando houver um erro
      } else {
        setErrorMessage(
          "Ocorreu um erro ao finalizar o atendimento. Por favor, tente novamente mais tarde."
        );
        setIsLoading(false); // Alterado para false quando houver um erro
      }
      console.error("Erro ao finalizar atendimento:", error);
      setIsLoading(false); // Alterado para false quando houver um erro
    }
  };
  const [dataError, setDataError] = useState("");
  const [dataAtualEstad, setDataAtualEstad] = useState(obterDataAtual());

  const handleDataAtualChange = (e) => {
    const newData = e.target.value;
    console.log("newData", newData);
    setDataAtualEstad(newData);
    if (!validarFormatoData(newData)) {
      setDataError("Formato de data inválido. Use dd/mm/aaaa");
    } else {
      setDataError("");
    }
  };

  const validarFormatoData = (data) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(data);
  };

  console.log("bodyApi", bodyApi);

  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    getHistoricoProdutos(
      rowItem.codigo,
      dataInicial,
      dataFinal,
      globalToken.access_token
    );
  };

  const handleSubmit2 = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    console.log("submit2", dataFinal2, dataInicial2);
  };

  const [showTipo, setShowTipo] = useState("NF");

  const pedidosFiltrados = historicoProdutos.filter((pedido) =>
    showTipo === "NF" ? pedido.tipo === "NF" : pedido.tipo !== "NF"
  );

  const [selectedPedido, setSelectedPedido] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen2, onOpen2, onClose2 } = useDisclosure();
  const [isLoading3, setIsLoading3] = useState(false); // Alterado para false inicialmente

  const handleRowClick = (pedido) => {
    setSelectedPedido(pedido);
    onOpen();
  };

  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const handleSubmit3 = async (situacao, title) => {
    const emissaoInicial = dataInicial2;
    const emissaoFinal = dataFinal2;
    const vencimentoInicial = "";
    const vencimentoFinal = "";
    const codigoCliente = rowItem.codigo;
    const loja = "01";
    const token = globalToken.access_token;

    setIsLoading3(true);

    try {
      const responseApi = await historicoTitulos(
        token,
        codigoCliente,
        loja,
        emissaoInicial,
        emissaoFinal,
        vencimentoInicial,
        vencimentoFinal,
        situacao
      );

      console.log("Resposta da API:", responseApi);
      setModalTitle(title); // Define o título do modal com base no botão clicado
      setResponseData(responseApi);
      setIsResponseModalOpen(true); // Abrir o modal após receber a resposta

      setIsLoading3(false);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      if (error.response && error.response.status === 401) {
        console.log("Recebido status 401, tentando obter um novo token...");
        setIsLoading3(true);

        try {
          const newToken = await fetchToken(username, password);
          console.log("Novo token obtido com sucesso:", newToken);
          console.log("Refazendo a requisição com o novo token...");
          const newResponseApi = await historicoTitulos(
            newToken.access_token,
            codigoCliente,
            loja,
            emissaoInicial,
            emissaoFinal,
            vencimentoInicial,
            vencimentoFinal,
            situacao
          );
          console.log("Resposta da nova requisição:", newResponseApi);
          setModalTitle(title); // Define o título do modal com base no botão clicado
          setResponseData(newResponseApi);
          setIsResponseModalOpen(true);
          setIsLoading3(false);
        } catch (error) {
          console.error("Erro ao obter novo token de acesso:", error);
          setResponseData({ error: error.message });
          setIsResponseModalOpen(true);
          setIsLoading3(false);
        }
      } else {
        setResponseData({ error: error.message });
        setIsResponseModalOpen(true);
        setIsLoading3(false);
      }
    }
    setIsLoading3(false);
  };

  const handleSelectChange = (event) => {
    const selectedCodigo = event.target.value;
    setSelectedOperador(selectedCodigo);
  };

  console.log("setSelectedOperador", selectedOperador);

  console.log("contatos ->>>", contatos);
  console.log("row item cliente contatos ->", rowItem);
  console.log("operadores", operadores);

  console.log("bodyApi", bodyApi);

  return (
    <Box
      bg="rgba(0, 0, 0, 0.1)" // Cor de fundo cinza com opacidade
      py="10" // Adiciona um pouco de espaço acima e abaixo do texto
      px="8" // Adiciona um pouco de espaço à esquerda e à direita do texto
      borderRadius="md" // Borda arredondada
    >
      <>
        <Button
          onClick={handleBackButtonClick}
          mb="4"
          colorScheme="red"
          bg="white"
          variant="outline"
          ml={3}
          mt={3}
        >
          Voltar
        </Button>
        <Box
          bg="#2C0E37"
          color="white"
          mb={3}
          p={1}
          borderRadius={5}
          shadow="lg"
        >
          <HStack>
            <FormControl>
              <FormLabel mt={1} ml={3} htmlFor="operadores">
                Operador:
              </FormLabel>
              <Select
                ml={3}
                color="black"
                id="operadores"
                bg="white"
                w="330px"
                focusBorderColor="#822AA2"
                onChange={handleSelectChange}
                placeholder="Selecione um operador"
                mb={1}
              >
                {parsedOperadores.map((operador) => (
                  <option key={operador.codigo} value={operador.codigo}>
                    {operador.nome}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
          <Divider w={520} mt={1} borderWidth={2} />
        </Box>

        <Tabs colorScheme="purple" size="md" isFitted variant="soft-rounded">
          <TabList mb="1px" w="250px">
            <Tab bg="white">
              <Box mr="5px">
                <MdContactPhone />
              </Box>
              <strong>Atendimento</strong>
            </Tab>
            <Tab bg="white">
              <Box mr="5px">
                <GiMoneyStack />
              </Box>
              <strong>Financeiro</strong>
            </Tab>
            <Tab bg="white">
              <Box mr="5px">
                <VscTools />
              </Box>
              <strong>Ferramentas</strong>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {rowItem && (
                <>
                  {/* <Box
                bg="#2C0E37"
                color="white"
                mb={3}
                p={1}
                borderRadius={5}
                shadow="lg"
              >
                <Text size="4xl" mb="25px" ml={3}>
                  <strong>{`Operador: ${rowItem.nomeOperador} - ${rowItem.codOperador} - Lista: ${rowItem.codLista}`}</strong>
                  <Divider w={520} mt={1} borderWidth={2} />
                </Text>
              </Box> */}
                  <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                    <GridItem colSpan={1}>
                      {isLoading2 ? (
                        <Center mt="65%">
                          <Spinner size="xl" color="#1A202C" />
                        </Center>
                      ) : (
                        <Box
                          bg="white"
                          p="4"
                          borderRadius="10px"
                          maxW="350px"
                          minH="605px"
                          shadow="lg"
                          _hover={{
                            transform: "scale(1.01)",
                            boxShadow: "lg",
                            borderColor: "black",
                            // border: "1px",
                          }}
                        >
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={FaUser} mr={2} /> Contato:
                          </Text>

                          <Text
                            color="black"
                            mb={2}
                            _hover={{
                              transform: "scale(1.05)",
                              boxShadow: "lg",
                            }}
                          >
                            {contatos.length > 0 ? (
                              contatos.map((contato, index) => (
                                <Text
                                  color="black"
                                  mb={2}
                                  _hover={{
                                    transform: "scale(1.05)",
                                    boxShadow: "lg",
                                  }}
                                >
                                  {contato.nome}
                                </Text>
                              ))
                            ) : (
                              <Text color="black" mb={2}>
                                Nenhum contato encontrado.
                              </Text>
                            )}
                          </Text>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={MdPhone} mr={2} /> Celular:
                          </Text>
                          {contatos.length > 0 ? (
                            contatos.map((contato, index) => (
                              <Text
                                color="black"
                                mb={2}
                                _hover={{
                                  transform: "scale(1.05)",
                                  boxShadow: "lg",
                                }}
                              >
                                {contato.fone}
                              </Text>
                            ))
                          ) : (
                            <Text color="black" mb={2}>
                              Nenhum telefone encontrado.
                            </Text>
                          )}
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={MdPhone} mr={2} /> Celular II:
                          </Text>
                          {contatos.length > 0 ? (
                            contatos.map((contato, index) => (
                              <Text
                                color="black"
                                mb={2}
                                _hover={{
                                  transform: "scale(1.05)",
                                  boxShadow: "lg",
                                }}
                              >
                                {contato.celular}
                              </Text>
                            ))
                          ) : (
                            <Text color="black" mb={2}>
                              Nenhum telefone encontrado.
                            </Text>
                          )}
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={IoStorefront} mr={2} /> Cliente:
                          </Text>
                          {contatos.length > 0 ? (
                            contatos.map((contato, index) => (
                              <Text
                                color="black"
                                mb={2}
                                _hover={{
                                  transform: "scale(1.05)",
                                  boxShadow: "lg",
                                }}
                              >
                                {rowItem.nome}
                              </Text>
                            ))
                          ) : (
                            <Text color="black" mb={2}>
                              Nenhum email encontrado.
                            </Text>
                          )}
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={MdEmail} mr={2} /> Email:
                          </Text>
                          {contatos.length > 0 ? (
                            contatos.map((contato, index) => (
                              <Text
                                color="black"
                                mb={2}
                                _hover={{
                                  transform: "scale(1.05)",
                                  boxShadow: "lg",
                                }}
                              >
                                {contato.email}
                              </Text>
                            ))
                          ) : (
                            <Text color="black" mb={2}>
                              Nenhum email encontrado.
                            </Text>
                          )}
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={FaBarcode} mr={2} /> Código Cliente:
                          </Text>
                          {contatos.length > 0 ? (
                            contatos.map((contato, index) => (
                              <Text
                                color="black"
                                mb={2}
                                _hover={{
                                  transform: "scale(1.05)",
                                  boxShadow: "lg",
                                }}
                              >
                                {contato.codigo}
                              </Text>
                            ))
                          ) : (
                            <Text color="black" mb={2}>
                              Nenhum codigo do cliente encontrado.
                            </Text>
                          )}
                        </Box>
                      )}
                    </GridItem>

                    <GridItem colSpan={1}>
                      <Box
                        bg="white"
                        _hover={{
                          boxShadow: "lg",
                          borderColor: "black",
                          transform: "scale(1.01)",
                        }} // border="1px"
                        p="4"
                        borderRadius="10px"
                        maxW="350px"
                        minH="605px"
                        shadow="lg"
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={IoEyeSharp} mr={2} /> Observação Cliente:
                        </Text>
                        <Textarea
                          placeholder="Observação relacionada ao cliente."
                          value={rowItem.observacao}
                          bg="white"
                          color="black"
                          // border="1px"
                          height="120px"
                          resize="none"
                          focusBorderColor="purple.700"
                          _placeholder={{ color: "gray.400" }}
                          onChange={(e) => {
                            handleObsCliente(e); // Chama a função e passa o evento como argumento
                            setRowItem({
                              ...rowItem,
                              observacao: e.target.value,
                            });
                          }}
                        />

                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={MdDesignServices} mr={2} /> Observação
                          Atendimento:
                        </Text>
                        <Textarea
                          onChange={(e) => handleObsAtendimento(e)}
                          placeholder="Observação durante o atendimento."
                          bg="white"
                          color="black"
                          height="120px"
                          // border="1px"
                          resize="none"
                          focusBorderColor="purple.700"
                          _placeholder={{ color: "gray.400" }}
                        />
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={MdMessage} mr={2} /> Msg para Nota:
                        </Text>
                        <Textarea
                          onChange={handleMsgNota}
                          placeholder="Mensagem para ser anexada na nota."
                          bg="white"
                          color="black"
                          height="120px"
                          // border="1px"
                          resize="none"
                          focusBorderColor="purple.700"
                          _placeholder={{ color: "gray.400" }}
                        />
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={FaCalendarDays} mr={2} /> Data de Retorno:
                        </Text>
                        <Input
                          focusBorderColor="purple.700"
                          type="date"
                          bg="white"
                          color="black"
                          // value={date}
                          placeholder="Apenas números - ddmmaaaa"
                          // onChange={handleChangeInputDate}
                          // borderColor="black"
                        />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={1}>
                      {isLoading2 ? (
                        <Center mt="65%">
                          <Spinner size="xl" color="#1A202C" />
                        </Center>
                      ) : (
                        <>
                          <Box
                            bg="white"
                            _hover={{
                              boxShadow: "lg",
                              borderColor: "black",
                              transform: "scale(1.01)",
                            }} // border="1px"
                            p="4"
                            borderRadius="10px"
                            maxW="350px"
                            minH="605px"
                            shadow="lg"
                          >
                            <Text
                              fontSize="lg"
                              fontWeight="bold"
                              color="black"
                              mb={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Icon as={FaMoneyCheckDollar} mr={2} /> Operação:
                            </Text>
                            <Select
                              onChange={handleOperacao}
                              variant="flushed"
                              bg="white"
                              color="black"
                              fontSize="sm"
                            >
                              {tipoOperacaoOptions.map((option, index) => (
                                <option
                                  key={index}
                                  value={option.value}
                                  style={{ color: "black" }}
                                >
                                  {option.label}
                                </option>
                              ))}
                            </Select>

                            <Text
                              fontSize="lg"
                              fontWeight="bold"
                              color="black"
                              mb={2}
                              display="flex"
                              mt={2}
                              alignItems="center"
                            >
                              <Icon as={FaRoad} mr={2} /> Tipo Frete:
                            </Text>
                            <Select
                              onChange={handleTipoFrete}
                              fontSize="sm"
                              variant="flushed"
                              bg="white"
                              color="black" // placeholder="Selecione um frete"
                            >
                              {tipoFreteOptions.map((option, index) => (
                                <option
                                  key={index}
                                  value={option.value}
                                  style={{ color: "black" }}
                                >
                                  {option.label}
                                </option>
                              ))}
                            </Select>

                            <Text
                              fontSize="lg"
                              fontWeight="bold"
                              color="black"
                              mb={2}
                              mt={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Icon as={FaTruck} mr={2} /> Transportadora:
                            </Text>
                            <Select
                              bg="white"
                              color="black"
                              variant="flushed"
                              placeholder="Selecione uma transportadora."
                              isSearchable
                              fontSize="sm"
                              onChange={handleTransportadora}
                              value={transportadoraSelecionado}
                            >
                              {parsedTransportadoras.map((option) => (
                                <option
                                  key={option.codigo}
                                  value={option.codigo}
                                >
                                  {`${option.nome} - ${option.codigo}`}
                                </option>
                              ))}
                            </Select>
                            <Text
                              fontSize="lg"
                              fontWeight="bold"
                              mt={2}
                              color="black"
                              mb={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Icon as={FaDollarSign} mr={2} /> Condição
                              Pagamento:
                            </Text>

                            <Select
                              variant="flushed"
                              bg="white"
                              color="black"
                              fontSize="sm"
                              onChange={handleCondPagamentoChange}
                              mb={5}
                              placeholder="Selecione a condição de pagamento."
                            >
                              {parsedCondPagamentos.map((option, index) => (
                                <option key={index} value={option.codigo}>
                                  {option.descricao}
                                </option>
                              ))}
                            </Select>

                            {/* Inputs adicionais */}
                            {showAdditionalInputs && (
                              <>
                                {[1, 2, 3, 4].map((parcela) => (
                                  <Flex
                                    key={parcela}
                                    alignItems="center"
                                    mb={2}
                                  >
                                    <Text fontSize="sm" color="black" mr={2}>
                                      {`${parcela}ª parcela`}
                                    </Text>
                                    <Input
                                      type="number"
                                      bg="white"
                                      color="black"
                                      w={150}
                                    />
                                    <Text
                                      fontSize="sm"
                                      color="black"
                                      ml={2}
                                      mr={2}
                                    >
                                      Data:
                                    </Text>
                                    <Input
                                      type="date"
                                      bg="white"
                                      color="black"
                                      fontSize="sm"
                                    />
                                  </Flex>
                                ))}
                              </>
                            )}
                          </Box>
                        </>
                      )}
                    </GridItem>
                    <GridItem colSpan={1}>
                      {isLoading2 ? (
                        <Center mt="65%">
                          <Spinner size="xl" color="#1A202C" />
                        </Center>
                      ) : (
                        <Box
                          bg="white"
                          _hover={{
                            boxShadow: "lg",
                            borderColor: "black",
                            transform: "scale(1.01)",
                          }}
                          p="4"
                          borderRadius="10px"
                          maxW="700px"
                          minW="700px"
                          minH="605px"
                          shadow="lg"
                        >
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={LuHistory} mr={2} /> Histórico de Compras:
                          </Text>
                          <Box p={2}>
                            <HStack spacing={2} align="center">
                              <FormControl>
                                <FormLabel>Data Inicial</FormLabel>
                                <Input
                                  focusBorderColor="purple.700"
                                  fontSize="sm"
                                  maxW="104px"
                                  type="text"
                                  value={dataInicial}
                                  onChange={(e) =>
                                    setDataInicial(e.target.value)
                                  }
                                  placeholder="dd/mm/aaaa"
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Data Final</FormLabel>
                                <Input
                                  focusBorderColor="purple.700"
                                  fontSize="sm"
                                  maxW="104px"
                                  type="text"
                                  value={dataFinal}
                                  onChange={(e) => setDataFinal(e.target.value)}
                                  placeholder="dd/mm/aaaa"
                                />
                              </FormControl>
                              <Button
                                minW="80px"
                                alignSelf="flex-end"
                                colorScheme="blue"
                                variant="outline"
                                isLoading={isLoading}
                                onClick={handleSubmit}
                              >
                                Buscar
                              </Button>
                            </HStack>
                            <Button
                              mt={5}
                              cursor="pointer"
                              minW="80px"
                              alignSelf="flex-end"
                              onClick={() =>
                                setShowTipo(
                                  showTipo === "NF" ? "Pedidos" : "NF"
                                )
                              }
                              mb={4}
                              colorScheme="purple"
                              variant="outline"
                              leftIcon={<BiShow />}
                            >
                              Mostrar {showTipo === "NF" ? "Pedidos" : "NF"}
                            </Button>
                          </Box>
                          <Box
                            p={2}
                            overflowY="auto"
                            maxHeight="450px"
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
                            <Table variant="striped" colorScheme="purple">
                              <Thead>
                                <Tr>
                                  <Th>Tipo</Th>
                                  <Th>Código</Th>
                                  <Th>Emissão</Th>
                                  <Th>Status</Th>
                                  <Th>Valor</Th>
                                  <Th>Volume</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {pedidosFiltrados.length > 0 ? (
                                  pedidosFiltrados.map((pedido, index) => (
                                    <Tr
                                      key={index}
                                      onClick={() => handleRowClick(pedido)}
                                      style={{ cursor: "pointer" }}
                                      _hover={{
                                        boxShadow: "lg",
                                        borderColor: "black",
                                        transform: "scale(1.05)",
                                        fontWeight: "bold", // Adiciona o negrito ao passar o mouse
                                      }}
                                    >
                                      <Td>{pedido.tipo}</Td>
                                      <Td>{pedido.numero}</Td>
                                      <Td>{pedido.emissao}</Td>
                                      <Td>{pedido.status}</Td>
                                      <Td>{pedido.valor}</Td>
                                      <Td>{pedido.volume}</Td>
                                    </Tr>
                                  ))
                                ) : (
                                  <Tr>
                                    <Td colSpan={6} textAlign="center">
                                      <strong>
                                        Não foi encontrado nenhum registro na
                                        data informada
                                      </strong>
                                    </Td>
                                  </Tr>
                                )}
                              </Tbody>
                            </Table>
                          </Box>
                        </Box>
                      )}
                      <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        size="6xl"
                        isCentered
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader bg="#2C0E37" color="white">
                            <Flex align="center">
                              <FcDocument />
                              Detalhes - {showTipo === "NF" ? "NF" : "Pedido"}
                            </Flex>
                          </ModalHeader>

                          <ModalCloseButton color="white" />
                          <ModalBody overflowY="auto">
                            {selectedPedido && (
                              <>
                                {selectedPedido.itens.length > 0 ? (
                                  <Table variant="striped" colorScheme="gray">
                                    <Thead>
                                      <Tr>
                                        <Th>Descrição</Th>
                                        <Th>Código Produto</Th>
                                        <Th>Valor Unitário</Th>
                                        <Th>Quantidade</Th>
                                        <Th>Volume</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {selectedPedido.itens.map(
                                        (item, index) => (
                                          <Tr key={index}>
                                            <Td>{item.descricao_produto}</Td>
                                            <Td>{item.cod_produto}</Td>
                                            <Td>
                                              {item.preco_unitario.toFixed(2)}
                                            </Td>
                                            <Td>{item.qtde_produto}</Td>
                                            <Td>{item.volume_produto}</Td>
                                          </Tr>
                                        )
                                      )}
                                    </Tbody>
                                  </Table>
                                ) : (
                                  <p>
                                    Não foi encontrado nenhum registro na data
                                    informada
                                  </p>
                                )}
                              </>
                            )}
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              colorScheme="red"
                              variant="outline"
                              mr={3}
                              onClick={onClose}
                            >
                              Fechar
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </GridItem>
                    {/* <GridItem colSpan={1}>
                        <Box
                          bg="white"
                          _hover={{
                            boxShadow: "lg",
                            borderColor: "black",
                            transform: "scale(1.01)",
                          }} // border="1px"
                          p="4"
                          borderRadius="10px"
                          minW="350px"
                          minH="605px"
                          shadow="lg"
                        >
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color="black"
                            mb={2}
                            display="flex"
                            alignItems="center"
                          >
                            <Icon as={LuHistory} mr={2} /> Histórico de Compras:
                          </Text>
                        </Box>
                      </GridItem> */}
                  </Grid>
                </>
              )}
            </TabPanel>
            {/* ITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROSITENS FINANCEIROS */}
            <TabPanel>
              {rowItem && (
                <>
                  <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                    <GridItem colSpan={1}>
                      <Box
                        bg="white"
                        p="4"
                        borderRadius="10px"
                        minW="350px"
                        minH="605px"
                        shadow="lg"
                        _hover={{
                          transform: "scale(1.01)",
                          boxShadow: "lg",
                          borderColor: "black",
                          // border: "1px",
                        }}
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={FcMoneyTransfer} mr={2} /> Observação do
                          Financeiro:
                        </Text>

                        <Textarea
                          h={200}
                          mb={2}
                          placeholder="Aqui irá conter informações financeiras sobre o cliente."
                        />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Box
                        bg="white"
                        p="4"
                        borderRadius="10px"
                        maxW="350px"
                        minH="605px"
                        shadow="lg"
                        _hover={{
                          transform: "scale(1.01)",
                          boxShadow: "lg",
                          borderColor: "black",
                          // border: "1px",
                        }}
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={FcDataConfiguration} mr={2} /> Títulos:
                        </Text>

                        <HStack spacing={2} align="center">
                          <FormControl>
                            <FormLabel>Data Inicial</FormLabel>
                            <Input
                              focusBorderColor="purple.700"
                              fontSize="sm"
                              maxW="104px"
                              type="text"
                              value={dataInicial2}
                              onChange={(e) => setDataInicial2(e.target.value)}
                              placeholder="dd/mm/aaaa"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Data Final</FormLabel>
                            <Input
                              focusBorderColor="purple.700"
                              fontSize="sm"
                              maxW="104px"
                              type="text"
                              value={dataFinal2}
                              onChange={(e) => setDataFinal2(e.target.value)}
                              placeholder="dd/mm/aaaa"
                            />
                          </FormControl>
                          {/* <Button
                              minW="80px"
                              alignSelf="flex-end"
                              colorScheme="blue"
                              variant="outline"
                              isLoading={isLoading}
                              onClick={() => handleSubmit3("A")}
                            >
                              Buscar
                            </Button> */}
                        </HStack>
                        <Button
                          isLoading={isLoading3}
                          mt="20px"
                          fontSize="lg"
                          fontWeight="bold"
                          bg="#822AA2"
                          color="white"
                          mb={2}
                          display="flex"
                          alignItems="center"
                          w="320px"
                          _hover={{
                            transform: "scale(1.01)",
                            boxShadow: "lg",
                            borderColor: "black",
                          }}
                          onClick={() => handleSubmit3("A", "Títulos Abertos")}
                        >
                          <Icon as={FcDocument} mr={2} /> Títulos Abertos
                        </Button>
                        <Button
                          isLoading={isLoading3}
                          fontSize="lg"
                          fontWeight="bold"
                          bg="#822AA2"
                          color="white"
                          mb={2}
                          display="flex"
                          alignItems="center"
                          w="320px"
                          _hover={{
                            transform: "scale(1.01)",
                            boxShadow: "lg",
                            borderColor: "black",
                          }}
                          onClick={() => handleSubmit3("", "Títulos Baixados")}
                        >
                          <Icon as={FcFinePrint} mr={2} /> Títulos Baixados
                        </Button>
                        <Button
                          isLoading={isLoading3}
                          fontSize="lg"
                          fontWeight="bold"
                          bg="#822AA2"
                          color="white"
                          mb={2}
                          display="flex"
                          alignItems="center"
                          w="320px"
                          _hover={{
                            transform: "scale(1.01)",
                            boxShadow: "lg",
                            borderColor: "black",
                          }}
                          onClick={() =>
                            handleSubmit3("F", "Títulos Faturados")
                          }
                        >
                          <Icon as={FcDocument} mr={2} /> Títulos Faturados
                        </Button>

                        <Modal
                          size="7xl"
                          isOpen={isResponseModalOpen}
                          onClose={() => setIsResponseModalOpen(false)}
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
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "transparent",
                            },
                            "&::-webkit-scrollbar-corner": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader bg="#2C0E37" color="white">
                              <Flex align="center">
                                <FcComboChart />
                                <Text ml="15px">{modalTitle}</Text>
                              </Flex>
                            </ModalHeader>
                            <ModalCloseButton color="white" />
                            <ModalBody>
                              {responseData ? (
                                Array.isArray(responseData) &&
                                responseData.length > 0 ? (
                                  <Box overflow="auto">
                                    <Table variant="striped" colorScheme="gray">
                                      <Thead>
                                        <Tr>
                                          <Th>Código</Th>
                                          <Th>Loja</Th>
                                          <Th>Vendedor</Th>
                                          <Th>Razão Social</Th>
                                          <Th>CNPJ</Th>
                                          <Th>Título</Th>
                                          <Th>Prefixo</Th>
                                          <Th>Parcela</Th>
                                          <Th>Tipo</Th>
                                          <Th>Emissão</Th>
                                          <Th>Vencimento</Th>
                                          <Th>Data Baixa</Th>
                                          <Th>Valor Original</Th>
                                          <Th>Valor Pago</Th>
                                          <Th>Valor Saldo</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        {responseData.map((item, index) => (
                                          <Tr key={index}>
                                            <Td>{item.codigo}</Td>
                                            <Td>{item.loja}</Td>
                                            <Td>{item.vendedor}</Td>
                                            <Td>{item.razao_social}</Td>
                                            <Td>{item.cnpj}</Td>
                                            <Td>{item.titulo}</Td>
                                            <Td>{item.prefixo}</Td>
                                            <Td>{item.parcela}</Td>
                                            <Td>{item.tipo}</Td>
                                            <Td>{item.emissao}</Td>
                                            <Td>{item.vencimento}</Td>
                                            <Td>{item.dt_baixa}</Td>
                                            <Td>{item.valor_original}</Td>
                                            <Td>{item.valor_pago}</Td>
                                            <Td>{item.valor_saldo}</Td>
                                          </Tr>
                                        ))}
                                      </Tbody>
                                    </Table>
                                  </Box>
                                ) : (
                                  <p>
                                    {responseData.errorMessage ||
                                      responseData.message ||
                                      "Não foram encontrados registros"}
                                  </p>
                                )
                              ) : (
                                <p>Carregando...</p>
                              )}
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </Box>
                    </GridItem>
                  </Grid>
                </>
              )}
            </TabPanel>
            {/* ITENS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FERRAMENTAS FINANCEIROS */}

            <TabPanel>
              {rowItem && (
                <>
                  <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                    <GridItem colSpan={1}>
                      <Box
                        bg="white"
                        p="4"
                        borderRadius="10px"
                        maxW="350px"
                        minH="605px"
                        shadow="lg"
                        _hover={{
                          transform: "scale(1.01)",
                          boxShadow: "lg",
                          borderColor: "black",
                          // border: "1px",
                        }}
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="black"
                          mb={2}
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={FaBalanceScale} mr={2} /> Tabela de
                          Conversão:
                        </Text>
                      </Box>
                    </GridItem>
                  </Grid>
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box mt={15} mb={15} ml={5}>
          <ProcurarProduto
            onFinalizarAddProdutos={handleFinalizarAddProdutos}
            onRemoveItem={handleRemoveItem}
            valoresSelecionados={valoresSelecionados}
          />
        </Box>

        <Table variant="simple" bg="white">
          <Thead
            Thead
            // position="sticky"
            top="0"
            bg="#822AA2"
            fontWeight="bold"
          >
            <Tr>
              <Th color="white" fontSize="sm">
                Produto
              </Th>
              <Th color="white" fontSize="sm">
                Quantidade
              </Th>
              <Th color="white" fontSize="sm">
                Desconto (%)
              </Th>
              <Th color="white" fontSize="sm">
                Valor Unitário
              </Th>
              <Th color="white" fontSize="sm">
                Total
              </Th>
              <Th color="white" fontSize="sm">
                Unidade de Medida
              </Th>{" "}
              {/* Nova coluna para UM */}
              <Th color="white" fontSize="sm">
                Data Faturamento
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {valoresSelecionados.map((produto, index) => (
              <Tr key={index}>
                <Td w={250}>{produto.descricao}</Td>
                <Td w={100}>{produto.quantidade}</Td>
                <Td w={150}>
                  <Input
                    focusBorderColor="purple.700"
                    border="1px"
                    borderColor="gray.300"
                    type="number"
                    mt={2}
                    w="75px"
                    p={6}
                    value={produto.qtd}
                    onChange={(e) =>
                      handleDescontoChange(index, e.target.value)
                    }
                  />
                </Td>
                <Td w={200}>{produto.precoUnitario.toFixed(2)}</Td>{" "}
                {/* Usando precoUnitario */}
                <Td w={150}>
                  {calcularPrecoTotal(
                    produto.quantidade,
                    produto.precoUnitario,
                    produto.desconto
                  ).toFixed(2)}
                </Td>{" "}
                {/* Usando precoTotal */}
                <Td w={150}>{produto.um}</Td>
                <Td w={150}>
                  <Input
                    type="date"
                    borderRadius="10px"
                    focusBorderColor="purple.700"
                    border="1px"
                    borderColor="gray.300"
                    mt={2}
                    w="155px"
                    p={6}
                    value={dataAtualEstad}
                    onChange={handleDataAtualChange}
                    size="sm"
                  />
                </Td>{" "}
                {/* Preenchendo com a data atual */}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr bg="white">
              <Td fontWeight="bold">TOTAL</Td>
              <Td fontWeight="bold">{calcularTotalQuantidade()}</Td>
              <Td></Td>
              {/* <Td>
                      <Input
                        focusBorderColor="green.500" // Definindo a cor da borda quando em foco como verde
                        border="1px"
                        borderColor="gray.300"
                        type="number"
                        mt={2}
                        w="75px"
                        p={6}
                        value={descontoTotal}
                        onChange={handleDescontoTotalChange}
                      />
                    </Td> */}
              <Td></Td>
              <Td fontWeight="bold">{calcularPrecoTotalGeral().toFixed(2)}</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tfoot>
        </Table>

        <Button
          w="100%"
          mt={5}
          mb={2}
          colorScheme="green"
          isDisabled={isButtonDisabled()}
          onClick={handleClickFinalizaAtendimento} // Chama a função no onClick
          isLoading={isLoading} // Alterado para isLoading
          spinner={<BeatLoader size={8} color="white" />}
          // variant="outline"
          // color="white"
          _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
        >
          Finaliza Atendimento
        </Button>
        {errorMessage && (
          <Box mt={4}>
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <strong>Código:</strong> {errorMessage.code} <br />
                <strong>Mensagem:</strong> {errorMessage.message}
              </Box>
            </Alert>
          </Box>
        )}
      </>
    </Box>
  );
};

export default Atendimento1;
