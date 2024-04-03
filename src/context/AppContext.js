import React, { createContext, useState } from "react";

// Criando o contexto
const AppContext = createContext();

// Componente Provider que irá envolver os componentes que precisam acessar o contexto
const AppContextProvider = ({ children }) => {
  const [dateGlobal, setDateGlobal] = useState("");

  return (
    <AppContext.Provider value={{ dateGlobal, setDateGlobal }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
