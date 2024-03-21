import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe BrowserRouter e Routes
import LoginPage from "./pages/login-page";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ptBR } from "date-fns/locale/pt-BR";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
