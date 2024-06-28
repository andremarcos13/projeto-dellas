import LoginPage from "./pages/login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe BrowserRouter e Routes
import HomePage from "./pages/home-page";
import AgendaPage from "./pages/agenda-page";
import AtendimentoPage from "./pages/atendimento-page";
import Map from "./components/map";
import ErrorPage from "./pages/error-page";
import AdminPage from "./pages/admin-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/atendimento/:index" element={<AtendimentoPage />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/atendimento" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
