import {object, string, InferType, ObjectSchema } from "yup";
import { validarContraExpression } from "../lib/expresionRegular.lib";

export type SchemaType<T extends object> = ObjectSchema<T>;

export const LoginSchema = object({
  correo_Usuario: string()
    .required("El correo es requerido"),
  contra_Usuario: string()
    .required("La contraseña es requerida")
});

export type LoginTypeSchema = InferType<typeof LoginSchema>;

export const RegisterSchema = object({
  nombre_Usuario: string()
    .required("El nombre es requerido")
    .max(30, "El nombre debe tener como maximo 30 caracteres"),
  correo_Usuario: string()
    .email("El correo no es valido")
    .min(10, "El correo debe tener al menos 10 caracteres")
    .max(30, "El correo debe tener como maximo 30 caracteres")
    .required("El correo es requerido"),
  contra_Usuario: string()
    .min(6, "La contraseña debe tener como minimo 6 caracteres")
    .max(10, "La contraseña debe tener como minimo 10 caracteres")
    .matches(validarContraExpression, "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un dígito")
    .required("La contraseña es requerida")
});

export type RegisterTypeSchema = InferType<typeof RegisterSchema>;