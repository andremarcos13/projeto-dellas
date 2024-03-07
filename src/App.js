import { useEffect } from "react";
import LoginPage from "./pages/login-page";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []); // O array vazio assegura que o efeito só será executado uma vez, equivalente ao componentDidMount()

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
