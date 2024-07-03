import axios from "axios";

const fetchOperadores = async ({ empresa = "01", filial = "01", token }) => {
  const apiUrl =
    "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/v1/operadores";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        empresa,
        filial,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar operadores:", error);
    throw error;
  }
};

export default fetchOperadores;
