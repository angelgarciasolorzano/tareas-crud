import axios from "axios";
import { Usuario } from "../types/usuario.types";

const API: string = "http://localhost:4000/api";

export const loginUsuario = (usuario: Usuario) => { return axios.post(`${ API }/login`, usuario); }