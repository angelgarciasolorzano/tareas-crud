import { createContext, FC, useState } from "react";

import ProviderProps from "../types/props.types";
import Tarea from "../types/tareas.types";

export interface TareasContextProps {
  tareas: Tarea[];
  setTareas: (tareas: Tarea[]) => void;
};

export const TareasContext = createContext<TareasContextProps | null>(null);

export const TareasProvider: FC<ProviderProps> = ({ children }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  return (
    <TareasContext.Provider value={{
      tareas,
      setTareas,
    }}>
      {children}
    </TareasContext.Provider>
  );
};