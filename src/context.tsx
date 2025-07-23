import { createContext } from "react";

const Context = createContext({});

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default Provider;
