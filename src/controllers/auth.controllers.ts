import usuarioModels from "../models/usuario.models";

import { Request, Response } from "express";
import { LoginTypeSchema, RegisterTypeSchema } from "../schemas/auth.schemas";
import { crearAccesoToken } from "../lib/jwt.lib";

export const loginUsuario = async (request: Request, response: Response ) => {
  const usuarioDatos: LoginTypeSchema = request.body;
  const { correo_Usuario } = usuarioDatos;

  try {
    const usuario = await usuarioModels.findOne({ where: { correo_Usuario } });

    if (!usuario) {
      return response.status(404).json({ message: "El Usuario No Existe" });
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

    const usuarios = await usuarioModels.create({
      nombre_Usuario,
      correo_Usuario,
      contra_Usuario
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