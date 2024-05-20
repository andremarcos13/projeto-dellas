import axios from "axios";
import { format, subDays } from "date-fns";

const fetchHistoricoProdutos = async (clienteHistPedidos, token) => {
  // Formata a data de hoje no formato dd/MM/yyyy
  const today = format(new Date(), "dd/MM/yyyy");

  // Calcula a data de 90 dias atrás e formata no formato dd/MM/yyyy
  const ninetyDaysAgo = format(subDays(new Date(), 90), "dd/MM/yyyy");

  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/HISTORICO_PEDIDOS",
      {
        params: {
          loja: "01",
          dt_inicial: ninetyDaysAgo,
          dt_final: today,
          cliente: clienteHistPedidos,
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
