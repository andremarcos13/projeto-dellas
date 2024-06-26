import axios from "axios";

const enviarRequisicao = async (requestBody, token, useRestTest) => {
  const baseUrl =
    useRestTest === "1"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";

  try {
    const response = await axios.post(
      `${baseUrl}atendimento?empresa=01&filial=01`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar requisição:", error);
    throw error;
  }
};

export default enviarRequisicao;
