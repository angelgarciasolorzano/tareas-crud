import axios from "./axios";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/authSchema";
import Usuario from "../types/usuario.types";

export const loginUsuario = async (usuario: LoginTypeSchema): Promise<Usuario> => { 
  const { data } = await axios.post<Usuario>("/login", usuario); 
  return data;
};

export const registrarUsuario = async (usuario: RegisterTypeSchema): Promise<Usuario> => { 
  const { data } = await axios.post("/register", usuario); 
  return data;
};

export const verificarToken = async (): Promise<Usuario> => { 
  const { data } = await axios.get<Usuario>("/verificar");
  return data; 
};