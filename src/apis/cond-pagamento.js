import axios from "axios";

const fetchCondPagamentos = async (token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest_prd/";
  const apiUrl = `${baseUrl}api/v1/condicao_pagamento`;

  console.log("useRestTest:", useRestTest);
  console.log("Using URL:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
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
    console.error("Error fetching payment conditions:", error);
    throw error;
  }
};

export default fetchCondPagamentos;
