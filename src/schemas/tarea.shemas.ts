import { object, string, InferType } from "yup";

export const TareaSchema = object({
  titulo_Tarea: string()
    .required("El título es requerido"),
  descripcion_Tarea: string()
    .required("La descripción es requerida"),
});

export type TareaTypeSchema = InferType<typeof TareaSchema>;