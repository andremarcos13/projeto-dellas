import { useEffect } from "react";
import LoginPage from "./pages/login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe BrowserRouter e Routes
import HomePage from "./pages/home-page";
import AgendaPage from "./pages/agenda-page";
import AtendimentoPage from "./pages/atendimento-page";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []); // O array vazio assegura que o efeito só será executado uma vez, equivalente ao componentDidMount()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/atendimento/:index" element={<AtendimentoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
