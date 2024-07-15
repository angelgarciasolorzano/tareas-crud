import { createContext, useState, ReactNode, FC, useContext, useEffect } from "react";
import { loginUsuario } from "../api/usuarios.api";
import { Usuario } from "../types/usuario.types";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthContextProps {
  login: (usuario: Usuario) => Promise<void>;
  usuario: Usuario | null;
  isAutenticado: boolean;
  mensajesBackend: string | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Debe usar este componente en un contexto AuthProvider");
  }
  return context;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false);
  const [mensajesBackend, setMensajesBackend] = useState<string | null>(null);

  const login = async (usuario: Usuario) => {
    try {
      const res = await loginUsuario(usuario);

      setUsuario(res.data);
      setIsAutenticado(true);
      setMensajesBackend(null);
    } catch (error: any) {
      console.log(error.response.data);
      setMensajesBackend(error.response.data.message || "");
    }
  };

  useEffect(() => {
    if (mensajesBackend) {
      const timer = setTimeout(() => {
        setMensajesBackend(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [mensajesBackend]);

  return (
    <AuthContext.Provider 
      value={{ 
        usuario, 
        mensajesBackend,
        login,
        isAutenticado
      }}>
      {children}
    </AuthContext.Provider>
  );
};