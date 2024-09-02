import { Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CookieToken from "../types/cookieToken";
import Requests from "../types/requestUser";
import DatosUsuario from "../types/datosUsuario";

dotenv.config();

const TOKEN_SECRET: string = `${ process.env.TOKEN_SECRET }`;

const authRequerida = (request: Requests, response: Response, next: NextFunction) => {
  const { token } = request.cookies as unknown as CookieToken;

  if (!token) {
    return response.status(401).json({ message: "No hay Token en la peticion" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    const datos = user as DatosUsuario;

    if (err) { return response.status(403).json({ message: "Token Invalido" }); }

    if (datos) { request.usuario = datos; }

    next();
    return;
  });
  return;
}

export default authRequerida;