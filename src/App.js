import LoginPage from "./pages/login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe BrowserRouter e Routes
import HomePage from "./pages/home-page";
import AgendaPage from "./pages/agenda-page";
import AtendimentoPage from "./pages/atendimento-page";
import Map from "./components/map";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/atendimento/:index" element={<AtendimentoPage />} />
        <Route path="/maps" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
