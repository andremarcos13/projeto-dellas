import axios from "axios";

const fetchOperadores = async ({ empresa = "01", filial = "01", token }) => {
  const useRestTest = localStorage.getItem("useRestTest");

  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";

  try {
    const response = await axios.get(`${baseUrl}api/v1/operadores`, {
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
