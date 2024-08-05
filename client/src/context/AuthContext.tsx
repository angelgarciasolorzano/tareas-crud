import { createContext, useState, FC, useContext } from "react";
import { loginUsuario, registrarUsuario } from "../api/auth.api";
import { Usuario } from "../types/usuario.types";
import { ProviderProps } from "../types/props.types"; 
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/authSchema";
import { AxiosError } from "axios";
import { RespuestaBackend } from "../types/mensajes.types";

interface AuthContextProps {
  login: (usuario: LoginTypeSchema) => Promise<void>;
  registrar: (usuario: RegisterTypeSchema) => Promise<void>;
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

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false);
  const [mensajesBackend, setMensajesBackend] = useState<string | null>(null);

  const login = async (usuario: LoginTypeSchema): Promise<void> => {
    try {
      const res = await loginUsuario(usuario);

      setUsuario(res.data);
      setIsAutenticado(true);
      
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
      setIsAutenticado(true);
      
      setMensajesBackend(null);
    } catch (error) {
      const respuesta = error as AxiosError<RespuestaBackend>;
      const mensaje = respuesta.response?.data.message || 'Ocurrio un error';

      setMensajesBackend(mensaje);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        usuario, 
        mensajesBackend,
        login,
        registrar,
        isAutenticado
      }}>
      {children}
    </AuthContext.Provider>
  );
};