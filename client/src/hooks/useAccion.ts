import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/authSchema";
import { TareasTypeSchema } from "../schemas/tareaSchema";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { loginUsuario, registrarUsuario } from "../api/auth.api";
import { 
  getTareasRequest, 
  agregarTareaRequest, 
  actualizarTareaRequest, 
  eliminarTareaRequest 
} from "../api/tareas.api";

import Cookie from "js-cookie";
import useAuth from "../hooks/useAuth";
import useTareas from "../hooks/useTareas";
import RespuestaBackend from "../types/mensajes.types";

const useAccion = (estado: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(estado);
  const { setUsuario, setAutenticado, actualizarLoadingNav } = useAuth();
  const { tareas, setTareas } = useTareas();

  const navegar = useNavigate();

  const login = async (usuario: LoginTypeSchema): Promise<void> => {
    setLoading(true);
    try {
      const respuesta = await loginUsuario(usuario);

      localStorage.setItem('usuario', JSON.stringify(respuesta));
      const localUsuario = localStorage.getItem('usuario');

      if (localUsuario) { 
        setUsuario(JSON.parse(localUsuario)); 
        setAutenticado(true);
        actualizarLoadingNav(true);
      };

      navegar("/tareas"); 
      toast.success(`Bienvenido ${usuario?.correo_Usuario}`); 
    } catch (error) {
      const { response } = error as AxiosError<RespuestaBackend>;
      const mensaje = response?.data.message || 'Ocurrio un error';

      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  const registrar = async (usuario: RegisterTypeSchema): Promise<void> => {
    setLoading(true);
    try {
      const respuesta = await registrarUsuario(usuario);

      localStorage.setItem('usuario', JSON.stringify(respuesta));
      setUsuario(respuesta);
      setAutenticado(true);
      actualizarLoadingNav(true);

      navegar("/tareas"); 
      toast.success(`Bienvenido ${usuario?.correo_Usuario}`); 
    } catch (error) {
      const { response } = error as AxiosError<RespuestaBackend>;
      const mensaje = response?.data.message || 'Ocurrio un error';

      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = (): void => {
    Cookie.remove("token");
    localStorage.removeItem('usuario');
    setAutenticado(false);
    setUsuario(null);
    actualizarLoadingNav(false);
    toast.success("Sesion cerrada");
  };

  const getTareas = async (): Promise<void> => {
    try {
      const respuesta = await getTareasRequest();
      setTareas(respuesta);
    } catch (error) {
      toast.error("Hubo un error al obtener las tareas");
    } finally {
      setLoading(false);
    }
  };

  const agregarTarea = async (tarea: TareasTypeSchema): Promise<void> => {
    setLoading(true);
    try {
      await agregarTareaRequest(tarea);

      navegar("/tareas");
      toast.success("Tarea agregada con éxito");
    } catch (error) {
      toast.error("Hubo un error al agregar la tarea");
    } finally {
      setLoading(false);
    }
  };

  const editarTarea = async (id_Tarea: string, nuevaTarea: TareasTypeSchema): Promise<void> => {
    setLoading(true);
    try {
      const { message } = await actualizarTareaRequest(id_Tarea, nuevaTarea);
    
      navegar("/tareas");
      toast.success(message);
    } catch (error) {
      toast.error("Hubo un error al actualizar la tarea");
    } finally {
      setLoading(false);
    }
  };

  const borrarTareas = async (id_Tarea: number): Promise<void> => {
    try {
      const { message } = await eliminarTareaRequest(id_Tarea);

      setTareas(tareas.filter((tarea) => tarea.id_Tarea !== id_Tarea));

      toast.success(message);
    } catch (error) {
      toast.error("Hubo un error al borrar la tarea");
    }
  };

  return {
    loading,
    login,
    registrar,
    cerrarSesion,
    getTareas,
    agregarTarea,
    editarTarea,
    borrarTareas
  }
};

export default useAccion;