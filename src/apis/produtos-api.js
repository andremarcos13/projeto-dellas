import axios from "axios";

const fetchProdutos = async ({
  search = "",
  page = 1,
  pageSize = 10,
  token,
  useRestTest,
}) => {
  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "1"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";

  // URL completa para a requisição
  const apiUrl = `${baseUrl}api/v1/cad_produtos`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        empresa: "01",
        filial: "01",
        search: search,
        page: page,
        pagesize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export default fetchProdutos;
