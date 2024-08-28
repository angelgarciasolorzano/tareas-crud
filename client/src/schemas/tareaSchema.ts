import { z } from "zod";

export const TareasFormSchema = z.object({
  titulo_Tarea: z.string({
    required_error: "El titulo es requerido"
  }).min(1, {
    message: "El título debe tener como mínimo 1 caracter"
  }).max(20, {
    message: "El título debe tener como máximo 20 caracteres"
  }),
  descripcion_Tarea: z.string({
    required_error: "La descripcion es requerida"
  }).min(4, {
    message: "La descripción debe tener como mínimo 4 caracteres"
  }).max(50, {
    message: "La descripción debe tener como máximo 20 caracteres"
  }),
});

export type TareasTypeSchema = z.infer<typeof TareasFormSchema>;