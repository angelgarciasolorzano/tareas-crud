import { createContext, useState, FC, useEffect, useCallback } from "react";
import { verificarToken } from "../api/auth.api";

import Cookie from "js-cookie";
import ProviderProps from "../types/props.types";
import Usuario from "../types/usuario.types";

export interface AuthContextProps {
  usuario: Usuario | null;
  autenticado: boolean;
  loading: boolean;
  loadingNav: boolean;
  setUsuario: (usuario: Usuario | null) => void;
  setAutenticado: (autenticado: boolean) => void;
  setLoading: (loading: boolean) => void;
  actualizarLoadingNav: (loading: boolean) => void;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingNav, setLoadingNav] = useState<boolean>(false);

  const actualizarLoadingNav = useCallback((loading: boolean) => {
    setLoadingNav(loading);
  }, []);

  const checkLogin = async () => {
    const token = Cookie.get('token');
    const localUsuario = localStorage.getItem('usuario');

    if (localUsuario && token) {
      setUsuario(JSON.parse(localUsuario));
      setAutenticado(true);
      setLoading(false);
      actualizarLoadingNav(true);
      return;
    }

    if (!token) {
      setAutenticado(false);
      setLoading(false);
      actualizarLoadingNav(false);
      return setUsuario(null);
    }

    try {
      const respuesta = await verificarToken();

      if (!respuesta) {
        setAutenticado(false);
        setLoading(false);
        actualizarLoadingNav(false);
        return;
      }

      localStorage.setItem('usuario', JSON.stringify(respuesta));
      setUsuario(respuesta);
      setAutenticado(true);
      setLoading(false);
      actualizarLoadingNav(true);
    } catch (error) {
      setAutenticado(false);
      setUsuario(null);
      setLoading(false);
      actualizarLoadingNav(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        usuario, 
        autenticado,
        loading,
        loadingNav,
        setUsuario,
        setAutenticado,
        setLoading,
        actualizarLoadingNav
      }}>
      {children}
    </AuthContext.Provider>
  );
};