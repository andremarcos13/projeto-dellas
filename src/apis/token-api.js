import axios from "axios";

const getToken = async (username, password) => {
  try {
    const response = await axios.post(
      "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/api/oauth2/v1/token",
      {
        username: username,
        password: password,
        grant_type: "password",
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getToken;
