import axios from "axios";

const enviarRequisicao = async (requestBody) => {
  try {
    const response = await axios.post(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/atendimento?empresa=01&filial=01",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
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
