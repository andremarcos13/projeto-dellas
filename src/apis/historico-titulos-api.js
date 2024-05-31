import axios from "axios";

const historicoTitulos = async (
  token,
  codigoCliente,
  loja,
  emissaoInicial,
  emissaoFinal,
  vencimentoInicial,
  vencimentoFinal,
  situacao
) => {
  // Configuração do cabeçalho com o token passado como argumento
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Dados para a requisição
  const data = {
    codigo: codigoCliente,
    loja: loja,
    emissao_inicial: emissaoInicial,
    emissao_final: emissaoFinal,
    vencimento_inicial: vencimentoInicial,
    vencimento_final: vencimentoFinal,
    pagamento_inicial: "",
    pagamento_final: "",
    situacao: situacao,
  };

  // Tentativa de fazer a requisição
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
