import axios from "axios";

const fetchAgenda = async (appContext) => {
  const { dateGlobal } = appContext;
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/agenda/operador",
      {
        params: {
          data_inicial: dateGlobal ? dateGlobal : "20230717",
          usuario: "000283",
          empresa: "01",
          filial: "01",
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

export default fetchAgenda;
