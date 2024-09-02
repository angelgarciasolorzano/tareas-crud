import { createContext, FC, useState } from "react";
import { TareasTypeSchema } from "../schemas/tareaSchema";
import { AxiosResponse } from "axios";
import { 
  getTareasRequest, getTareaRequest, agregarTareaRequest, 
  actualizarTareaRequest, eliminarTareaRequest
} from "../api/tareas.api";

import ProviderProps from "../types/props.types";
import Tarea from "../types/tareas.types";
import RespuestaBackend from "../types/mensajes.types";

export interface TareasContextProps {
  tareas: Tarea[];
  setTareas: (tareas: Tarea[]) => void;
  getTareas: () => Promise<void>;
  agregarTarea: (tarea: TareasTypeSchema) => Promise<void>;
  editarTarea: (id_Tarea: string, nuevaTarea: TareasTypeSchema) => Promise<void>;
  borrarTareas: (id_Tarea: number) => Promise<void>;
  getTarea: (id_Tarea: string) => Promise<void>;
  mensajeBackend: string | null;
  setMensajeBackend: (mensaje: string | null) => void;
  mensajeSuccess: string | null;
  setMensajeSuccess: (mensaje: string | null) => void;
};

export const TareasContext = createContext<TareasContextProps | null>(null);

export const TareasProvider: FC<ProviderProps> = ({ children }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [mensajeBackend, setMensajeBackend] = useState<string | null>(null);
  const [mensajeSuccess, setMensajeSuccess] = useState<string | null>(null);

  const getTareas = async (): Promise<void> => {
    try {
      const res = await getTareasRequest();
      setTareas(res.data);
    } catch (error) {
      setMensajeBackend("Hubo un error al obtener las tareas");
    }
  };

  const getTarea = async (id_Tarea: string) => {
    const id = parseInt(id_Tarea);

    try {
      const respuesta = await getTareaRequest(id);
      return respuesta.data;
    } catch (error) {
      setMensajeBackend("Hubo un error al obtener la tarea");
    }
  };

  const agregarTarea = async (tarea: TareasTypeSchema): Promise<void> => {
    try {
      await agregarTareaRequest(tarea);

      setMensajeSuccess("Tarea agregada con éxito");
      setMensajeBackend(null);
    } catch (error) {
      setMensajeBackend("Hubo un error al agregar la tarea");
    }
  };

  const editarTarea = async (id_Tarea: string, nuevaTarea: TareasTypeSchema): Promise<void> => {
    try {
      const id = parseInt(id_Tarea);
      const respuesta = await actualizarTareaRequest(id, nuevaTarea);
      const mensaje = respuesta as AxiosResponse<RespuestaBackend>;

      setMensajeSuccess(mensaje.data.message);
      setMensajeBackend(null);
    } catch (error) {
      setMensajeBackend("Hubo un error al editar la tarea");
    }
  };

  const borrarTareas = async (id_Tarea: number): Promise<void> => {
    try {
      const respuesta = await eliminarTareaRequest(id_Tarea);
      const mensaje = respuesta as AxiosResponse<RespuestaBackend>;

      setTareas(tareas.filter((tarea) => tarea.id_Tarea !== id_Tarea));

      setMensajeSuccess(mensaje.data.message);
      setMensajeBackend(null);
    } catch (error) {
      setMensajeBackend("Hubo un error al borrar la tarea");
    }
  };

  return (
    <TareasContext.Provider value={{
      tareas,
      setTareas,
      getTareas,
      agregarTarea,
      editarTarea,
      borrarTareas,
      getTarea,
      mensajeBackend,
      setMensajeBackend,
      mensajeSuccess,
      setMensajeSuccess
    }}>
      {children}
    </TareasContext.Provider>
  );
};