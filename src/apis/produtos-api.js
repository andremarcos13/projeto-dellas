import axios from "axios";

const fetchProdutos = async ({ search = "", page = 1, pageSize = 10 }) => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/v1/cad_produtos",
      {
        params: {
          empresa: "01",
          filial: "01",
          search: search,
          page: page,
          pagesize: pageSize,
        },
        headers: {
          Authorization: "Basic bmV4dXMuZGV2OmRlbGxhc0BuZXh1cw==",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchProdutos;
