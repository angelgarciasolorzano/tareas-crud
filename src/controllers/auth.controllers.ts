import usuarioModels from "../models/usuario.models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import DatosUsuario from "../types/datosUsuario";

import { Request, Response } from "express";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/auth.schemas";
import { crearAccesoToken } from "../lib/jwt.lib";

dotenv.config();

export const loginUsuario = async (request: Request, response: Response ) => {
  const usuarioDatos: LoginTypeSchema = request.body;
  const { correo_Usuario, contra_Usuario } = usuarioDatos;

  try {
    const usuario = await usuarioModels.findOne({ where: { correo_Usuario } });

    if (!usuario) {
      return response.status(404).json({ message: "El Usuario No Existe" });
    }

    const password = await bcrypt.compare(contra_Usuario, usuario.dataValues.contra_Usuario);

    if (!password) {
      return response.status(401).json({ message: "Contraseña Incorrecta" });
    }

    const token = await crearAccesoToken({ id_Usuario: usuario.dataValues.id_Usuario });
    response.cookie("token", token);
    
    return response.json(usuario);
  } catch (error) {
    return response.status(404).json({ message: "Error al Iniciar Sesion" });
  }
};

export const registrarUsuario = async (request: Request, response: Response ) => {
  const usuariosDatos: RegisterTypeSchema = request.body;
  const { nombre_Usuario, correo_Usuario, contra_Usuario } = usuariosDatos;

  try {
    const buscarUsuario = await usuarioModels.findOne({ where: { correo_Usuario } });

    if (buscarUsuario) {
      return response.status(409).json({ message: "El usuario ya Existe" });
    }

    const password = await bcrypt.hash(contra_Usuario, 10);

    const usuarios = await usuarioModels.create({
      nombre_Usuario,
      correo_Usuario,
      contra_Usuario: password
    });

    const token = await crearAccesoToken({ id_Usuario: usuarios.dataValues.id_Usuario });
    response.cookie("token", token);

    return response.json(usuarios);
  } catch (errro) {
    return response.status(404).json({ message: "El Usuario no se pudo Crear" });
  }
};

export const cerrarSesion = (_request: Request, response: Response ) => {
  response.clearCookie("token");
  return response.json({ message: "Sesion Cerrada Correctamente" });
};

export const verificarToken = async (request: Request, response: Response) => {
  const token: string = request.cookies["token"];
  const TOKEN_SECRET: string = `${ process.env.TOKEN_SECRET }`;

  if (!token) {
    return response.status(401).json({ message: "No hay Token en la peticion" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    const user = decoded as DatosUsuario;

    if (err) {
      return response.status(403).json({ message: "Token Invalido" });
    }

    const usuario = await usuarioModels.findByPk(user.id_Usuario);

    if (!usuario) {
      return response.status(404).json({ message: "Usuario no Encontrado" });
    }

    return response.json({ 
      id_Usuario: usuario.dataValues.id_Usuario,
      nombre_Usuario: usuario.dataValues.nombre_Usuario,
      correo_Usuario: usuario.dataValues.correo_Usuario,
    });
  });

  return;
}