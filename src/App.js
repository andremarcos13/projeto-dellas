import { useEffect } from "react";
import LoginPage from "./pages/login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe BrowserRouter e Routes
import HomePage from "./pages/home-page";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []); // O array vazio assegura que o efeito só será executado uma vez, equivalente ao componentDidMount()

  return (
    <Router>
      <Routes>
        {" "}
        {/* Use Routes para definir as rotas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* Defina a rota para a LoginPage */}
        {/* Adicione outras rotas aqui conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
