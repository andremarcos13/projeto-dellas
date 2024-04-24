import axios from "axios";

const fetchCodUser = async (token) => {
  try {
    const response = await axios.get(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/framework/v1/genericList",
      {
        params: {
          alias: "SU7",
          fields: "U7_NOME,U7_CODUSU",
          Page: 1,
          PageSize: 550,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchCodUser;
