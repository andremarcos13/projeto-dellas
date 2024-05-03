import axios from "axios";

const fetchPrecoDeVenda = async ({
  cliente = "391158",
  produto,
  qtd,
  token,
}) => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/v1/tabela_preco",
      {
        params: {
          empresa: "01",
          filial: "01",
          loja: "00",
          cliente: cliente,
          produto: produto,
          quantidade: qtd,
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

export default fetchPrecoDeVenda;
