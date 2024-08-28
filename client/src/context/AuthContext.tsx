import { createContext, useState, FC, useEffect, useCallback } from "react";
import { loginUsuario, registrarUsuario, verificarToken } from "../api/auth.api";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/authSchema";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import Cookie from "js-cookie";
import CookieToken from "../types/cookie.types";
import ProviderProps from "../types/props.types";
import Usuario from "../types/usuario.types";
import RespuestaBackend from "../types/mensajes.types";

export interface AuthContextProps {
  login: (usuario: LoginTypeSchema) => Promise<void>;
  registrar: (usuario: RegisterTypeSchema) => Promise<void>;
  cerrarSesion: () => void;
  usuario: Usuario | null;
  autenticado: boolean;
  mensajesBackend: string | null;
  setMensajesBackend: (mensajes: string | null) => void;
  loading: boolean;
  loadingNav: boolean;
  actualizarLoadingNav: (loading: boolean) => void;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [mensajesBackend, setMensajesBackend] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingNav, setLoadingNav] = useState<boolean>(false);

  const login = async (usuario: LoginTypeSchema): Promise<void> => {
    try {
      const res = await loginUsuario(usuario);

      setUsuario(res.data);
      setAutenticado(true);
      
      setMensajesBackend(null);
    } catch (error) {
      const respuesta = error as AxiosError<RespuestaBackend>;
      const mensaje = respuesta.response?.data.message || 'Ocurrio un error';

      setMensajesBackend(mensaje);
    }
  };

  const registrar = async (usuario: RegisterTypeSchema): Promise<void> => {
    try {
      const res = await registrarUsuario(usuario);

      setUsuario(res.data);
      setAutenticado(true);
      
      setMensajesBackend(null);
    } catch (error) {
      const respuesta = error as AxiosError<RespuestaBackend>;
      const mensaje = respuesta.response?.data.message || 'Ocurrio un error';

      setMensajesBackend(mensaje);
    }
  };

  const actualizarLoadingNav = useCallback((loading: boolean) => {
    setLoadingNav(loading);
  }, []);

  const cerrarSesion = () => {
    Cookie.remove("token");
    setAutenticado(false);
    setUsuario(null);
    actualizarLoadingNav(false);
    toast.success("Sesion cerrada");
  };

  useEffect(() => {
    async function checkLogin() {
      const cookie = Cookie.get() as unknown as CookieToken;

      if (!cookie.token) {
        setAutenticado(false);
        setLoading(false);
        actualizarLoadingNav(false);
        return setUsuario(null);
      }

      try {
        const respuesta = await verificarToken();

        if (!respuesta.data) {
          setAutenticado(false);
          setLoading(false);
          actualizarLoadingNav(false);
          return;
        }

        setUsuario(respuesta.data);
        setAutenticado(true);
        setLoading(false);
        actualizarLoadingNav(true);
      } catch (error) {
        setAutenticado(false);
        setUsuario(null);
        setLoading(false);
        actualizarLoadingNav(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        usuario, 
        mensajesBackend,
        setMensajesBackend,
        login,
        registrar,
        cerrarSesion,
        autenticado,
        loading,
        loadingNav,
        actualizarLoadingNav
      }}>
      {children}
    </AuthContext.Provider>
  );
};