import axios from "./axios";

export const getTareasRequest = () => { return axios.get("/tareas"); }

export const getTareaRequest = (id_Tarea: number) => { return axios.get(`/tareas/${id_Tarea}`); }

export const agregarTareaRequest = (tarea: any) => { return axios.post("/tareas", tarea); }

export const actualizarTareaRequest = (id_Tarea: number, tarea: any) => { return axios.put(`/tareas/${id_Tarea}`, tarea); }

export const eliminarTareaRequest = (id_Tarea: number) => { return axios.delete(`/tareas/${id_Tarea}`); }