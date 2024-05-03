import axios from "axios";

const fetchTransportadoras = async (token) => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/v1/transporadoras",
      {
        params: {
          empresa: "01",
          filial: "01",
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

export default fetchTransportadoras;
