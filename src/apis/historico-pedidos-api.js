import axios from "axios";
import { format, subDays } from "date-fns";

const today = format(new Date(), "dd/MM/yyyy");
const ninetyDaysAgo = format(subDays(new Date(), 90), "dd/MM/yyyy");

const fetchHistoricoProdutos = async (
  clienteHistPedidos,
  dataInicial = ninetyDaysAgo,
  dataFinal = today,
  token
) => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/HISTORICO_PEDIDOS",
      {
        params: {
          loja: "01",
          dt_inicial: dataInicial,
          dt_final: dataFinal,
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
