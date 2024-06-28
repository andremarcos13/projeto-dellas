import axios from "axios";

const fetchCodUser = async (token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";
  const apiUrl = `${baseUrl}api/framework/v1/genericList`;

  console.log("fetchCodUser useRestTest:", useRestTest);
  console.log("fetchCodUser Using URL:", apiUrl);

  try {
    const response = await axios.get(apiUrl, {
      params: {
        alias: "SU7",
        fields: "U7_NOME,U7_CODUSU",
        Page: 1,
        PageSize: 550,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cod user:", error);
    throw error;
  }
};

export default fetchCodUser;
