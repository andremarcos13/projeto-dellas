import axios from "axios";

const fetchTransportadoras = async (token) => {
  // Obtém o valor de useRestTest do localStorage
  const useRestTest = localStorage.getItem("useRestTest");

  // Determina a URL base com base no valor de useRestTest
  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest_prd/";

  try {
    const response = await axios.get(`${baseUrl}api/v1/transporadoras`, {
      params: {
        empresa: "01",
        filial: "01",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchTransportadoras;
