import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Debe usar este componente en un contexto AuthProvider");
  }
  return context;
};

export default useAuth;