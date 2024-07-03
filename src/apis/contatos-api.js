import axios from "axios";

const fetchContatos = async ({
  empresa = "01",
  filial = "01",
  page = 1,
  pageSize = 10000,
  cliente,
  loja = "01",
  token,
}) => {
  const apiUrl =
    "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/v1/contatos";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        empresa,
        filial,
        Page: page,
        PageSize: pageSize,
        cliente,
        loja,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    throw error;
  }
};

export default fetchContatos;
