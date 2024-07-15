import { z } from "zod";

export const usuarioSchema = z.object({
  correo_Usuario: z.string({
    required_error: "El correo es Requerido",
  }).min(10, {
    message: "El correo debe tener al menos 10 caracteres"
  }).max(30, {
    message: "El correo debe tener como máximo 30 caracteres"
  }),
  contra_Usuario: z.string({
    required_error: "La contraseña es Requerida"
  }).min(3, {
    message: "La contraseña debe tener al menos 3 caracteres"
  }).max(10, {
    message: "La contraseña debe tener como máximo 10 caracteres"
  })
});

export type usuarioObjetoSchema = z.infer<typeof usuarioSchema>;