import { TareasContext } from "../context/TareasContext";
import { useContext } from "react";

const useTareas = () => {
  const context = useContext(TareasContext);

  if (!context) {
    throw new Error("Debe usar este componente en un contexto TareasProvider");
  }
  return context;
};

export default useTareas;