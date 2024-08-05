import axios from "axios";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/authSchema";

const API: string = "http://localhost:4000/api";

export const loginUsuario = (usuario: LoginTypeSchema) => { return axios.post(`${ API }/login`, usuario); }

export const registrarUsuario = (usuario: RegisterTypeSchema) => { return axios.post(`${ API }/register`, usuario); }