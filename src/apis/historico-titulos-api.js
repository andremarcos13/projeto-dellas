import axios from "axios";

// Configuração do cabeçalho
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
  },
};

// Dados para a requisição
const data = {
  emissao_inicial: "01/06/2023",
  emissao_final: "31/12/2023",
  vencimento_inicial: "01/01/2021",
  vencimento_final: "31/12/2025",
  pagamento_inicial: "",
  pagamento_final: "",
  situacao: "A",
};

// Função para fazer a requisição
const historicoTitulos = async () => {
  try {
    const response = await axios.post(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/historico_titulos",
      data,
      config
    );
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
  }
};

export default historicoTitulos;
