import Usuarios from "../models/usuario.models";
import usuarioModels from "../models/usuario.models";

export const verificarEmail = async (correo: string): Promise<Usuarios | null | boolean> => {
  try {
    const buscarUsuario = await usuarioModels.findOne({ where: { correo_Usuario: correo } });
    return buscarUsuario;
  } catch (error) {
    return false;
  }
};