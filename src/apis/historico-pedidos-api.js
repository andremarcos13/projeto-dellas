import axios from "axios";

const fetchHistoricoProdutos = async ({ token }) => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/HISTORICO_PEDIDOS",
      {
        params: {
          empresa: "01",
          filial: "01",
          loja: "00",
          dt_inicial: "",
          dt_final: "",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchHistoricoProdutos;
