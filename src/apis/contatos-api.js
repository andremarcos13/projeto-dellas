import axios from "axios";

const fetchContatos = async ({
  empresa = "01",
  filial = "01",
  page = 1,
  pageSize = 10000,
  cliente,
  loja = "01",
  token,
}) => {
  const useRestTest = localStorage.getItem("useRestTest");

  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";

  try {
    const response = await axios.get(`${baseUrl}api/v1/contatos`, {
      params: {
        empresa,
        filial,
        Page: page,
        PageSize: pageSize,
        cliente,
        loja,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    throw error;
  }
};

export default fetchContatos;
