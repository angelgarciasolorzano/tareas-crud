import { Request } from "express";
import DatosUsuario from "./datosUsuario";

interface Requests extends Request  {
  usuario?: DatosUsuario;
};

export default Requests;