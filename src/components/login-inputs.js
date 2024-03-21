import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ptLocale from "date-fns/locale/pt-BR";

const LoginInputs = () => {
  return (
    <>
      <Box>
        <DatePicker locale={ptLocale} />
        <TextField id="fullWidth" label="Email" variant="outlined" />
      </Box>
    </>
  );
};

export default LoginInputs;
