import Tarea from "../models/tarea.models";
import { Response } from "express";
import { TareaTypeSchema } from "../schemas/tarea.shemas";

import Requests from "../types/requestUser";

export const getTareas = async (request: Requests, response: Response): Promise<Response> => {
  const Datos = request as Requests;

  try {
    const tareas = await Tarea.findAll({ where: { id_Usuario_FK: Datos.usuario?.id_Usuario }});

    return response.json(tareas);
  } catch (error) {
    console.log(error);
    return response.status(404).json({ message: "Las tareas no se pudieron obtener" });
  }
};

export const agregarTarea = async (request: Requests, response: Response): Promise<Response> => {
  const tareas: TareaTypeSchema = request.body;
  const { descripcion_Tarea, titulo_Tarea } = tareas;

  try {
    const nuevaTarea = await Tarea.create({
      titulo_Tarea,
      descripcion_Tarea,
      id_Usuario_FK: request.usuario?.id_Usuario,
    });

    return response.json(nuevaTarea);
  } catch (error) {
    console.log(error);
    return response.status(404).json({ message: "La tarea no se pudo agregar" });
  }
};

export const getTarea = async (request: Requests, response: Response): Promise<Response> => {
  const { id } = request.params;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return response.status(404).json({ message: "La tarea no se pudo encontrar" });
    }

    return response.json(tarea);
  } catch (error) {
    return response.status(404).json({ message: "La tarea no se pudo obtener" });
  }
};

export const actualizarTarea = async (request: Requests, response: Response): Promise<Response> => {
  const tareas: TareaTypeSchema = request.body;
  const { id } = request.params;
  const { descripcion_Tarea, titulo_Tarea } = tareas;

  try {
    const tarea = await Tarea.update({
      titulo_Tarea,
      descripcion_Tarea,
    }, {
      where: { id_Tarea: id },
    });
  
    if (tarea[0] === 0) {
      return response.status(404).json({ message: "La tarea no se pudo encontrar" });
    }
  
    return response.json({ message: "La tarea se actualizó correctamente" });
  } catch (error) {
    return response.status(404).json({ message: "La tarea no se pudo actualizar" });
  }
};

export const eliminarTarea = async (request: Requests, response: Response): Promise<Response> => {
  const { id } = request.params;

  try {
    const tarea = await Tarea.destroy({ where: { id_Tarea: id } });

    if (!tarea) {
      return response.status(404).json({ message: "La tarea no se pudo encontrar" });
    }

    return response.json({ message: "La tarea se eliminó correctamente" });
  } catch (error) {
    return response.status(404).json({ message: "La tarea no se pudo eliminar" });
  }
};