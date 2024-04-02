import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ptLocale from "date-fns/locale/pt-BR";
import { useEffect } from "react";
import fetchAgenda from "../apis/agenda-api";

const AtendimentoPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAgenda();
      console.log("data =>", data);
    };

    fetchData();
  }, []);

  return <Box></Box>;
};

export default AtendimentoPage;
