import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { formatoError } from "../lib/formatoError.lib";
import { SchemaType } from "../schemas/auth.schemas";

export const validarDatos = <T extends object>(schema: SchemaType<T>) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validate(request.body, { abortEarly: false });
    next();
  } catch (error) {
    const errores = error as ValidationError;
    const formato = formatoError(errores);

    response.status(400).json({ errors: formato });
  }
};