import axios from "axios";

const fetchPrecoDeVenda = async ({
  cliente = "391158",
  produto,
  qtd,
  token,
  useRestTest,
}) => {
  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "1"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";

  // URL completa para a requisição
  const apiUrl = `${baseUrl}api/v1/tabela_preco`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        empresa: "01",
        filial: "01",
        loja: "00",
        cliente: cliente,
        produto: produto,
        quantidade: qtd,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar preço de venda:", error);
    throw error;
  }
};

export default fetchPrecoDeVenda;
