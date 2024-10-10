import axios from "./axios";
import Tarea from "../types/tareas.types";
import { TareasTypeSchema } from "../schemas/tareaSchema";
import RespuestaBackend from "../types/mensajes.types";

export const getTareasRequest = async (): Promise<Tarea[]> => { 
  const { data } = await axios.get<Tarea[]>("/tareas");
  return data;
};

export const getTareaRequest = async (id_Tarea: string): Promise<TareasTypeSchema> => { 
  const { data } = await axios.get<TareasTypeSchema>(`/tareas/${id_Tarea}`); 
  return data;
};

export const agregarTareaRequest = (tarea: TareasTypeSchema): Promise<void> => { 
  return axios.post("/tareas", tarea); 
};

export const actualizarTareaRequest = async (id_Tarea: string, tarea: TareasTypeSchema): Promise<RespuestaBackend> => { 
  const { data } = await axios.put<RespuestaBackend>(`/tareas/${id_Tarea}`, tarea);
  return data; 
};

export const eliminarTareaRequest = async (id_Tarea: number): Promise<RespuestaBackend> => { 
  const { data } = await axios.delete<RespuestaBackend>(`/tareas/${id_Tarea}`);
  return data; 
};