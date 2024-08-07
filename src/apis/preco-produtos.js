import axios from "axios";

const fetchTabPreco = async (codTabelaCliente, token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest_prd/";
  const apiUrl = `${baseUrl}TABPRECO`;

  console.log("fetchTabPreco useRestTest:", useRestTest);
  console.log("fetchTabPreco Using URL:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      params: {
        grupo_cli: codTabelaCliente,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tab preco:", error);
    throw error;
  }
};

export default fetchTabPreco;
