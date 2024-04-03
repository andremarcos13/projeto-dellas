import React, { createContext, useContext, useState } from "react";

// Criando o contexto
const AppContext = createContext();

// Componente Provider que irá envolver os componentes que precisam acessar o contexto
const AppContextProvider = ({ children }) => {
  const [dateGlobal, setDateGlobal] = useState("");
  const [rowItem, setRowItem] = useState({});

  return (
    <AppContext.Provider
      value={{ dateGlobal, setDateGlobal, rowItem, setRowItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro do AppProvider");
  }
  return context;
}

export default AppContextProvider;