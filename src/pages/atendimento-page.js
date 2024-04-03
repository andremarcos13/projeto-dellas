import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ptLocale from "date-fns/locale/pt-BR";
import { useEffect } from "react";
import fetchAgenda from "../apis/agenda-api";
import Atendimento from "../components/atendimento";

const AtendimentoPage = () => {
  return (
    <Box>
      <Atendimento />
    </Box>
  );
};

export default AtendimentoPage;
