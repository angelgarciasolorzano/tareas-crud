import axios from "./axios";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/authSchema";

export const loginUsuario = (usuario: LoginTypeSchema) => { return axios.post("/login", usuario); }

export const registrarUsuario = (usuario: RegisterTypeSchema) => { return axios.post("/register", usuario); }

export const verificarToken = () => { return axios.get("/verificar") }