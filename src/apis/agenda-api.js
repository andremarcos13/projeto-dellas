import axios from "axios";

const fetchAgenda = async (appContext, token) => {
  const useRestTest = localStorage.getItem("useRestTest");

  const { dateGlobal } = appContext;
  const baseUrl =
    useRestTest === "2"
      ? "https://dellascomercio146177.protheus.cloudtotvs.com.br:1566/rest/"
      : "https://dellascomercio146176.protheus.cloudtotvs.com.br:4050/rest/";

  console.log("useRestTest:", useRestTest);
  console.log("Using URL:", `${baseUrl}agenda/operador`);

  try {
    const response = await axios.get(`${baseUrl}agenda/operador`, {
      params: {
        data_inicial: dateGlobal ? dateGlobal : "20230717",
        usuario: "000283",
        empresa: "01",
        filial: "01",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching agenda:", error);
    throw error;
  }
};

export default fetchAgenda;
