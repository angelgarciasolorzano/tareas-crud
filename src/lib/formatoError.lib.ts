import { ValidationError } from "yup";

export const formatoError = (errores: ValidationError) => {
  const errorMap: { [path: string]: string } = {};

  errores.inner.forEach(err => {
    if (err.path) { errorMap[err.path] = err.message; }
  });

  return errorMap;
};