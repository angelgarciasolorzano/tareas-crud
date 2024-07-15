import { Request, Response, NextFunction } from "express"
import { ZodSchema, ZodError } from "zod";

export const validarDatos = (schema: ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
  try {
    schema.parse(request.body);
    next();
  } catch (error) {
    const respuesta = error as ZodError;
    console.log(respuesta.errors.map(error => error.message));

    response.status(400).json(respuesta.errors.map(error => error.message));
  }
};