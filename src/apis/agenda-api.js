// api.js
import axios from "axios";

const fetchAgenda = async () => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/agenda/operador",
      {
        params: {
          data_inicial: "20230717",
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
