import { z } from "zod";
import { validarContra } from "../lib/expresionRegular";

export const LoginFormSchema = z.object({
  correo_Usuario: z.string({
    required_error: "El correo es Requerido",
  }).min(1, {
    message: "El correo es requerido"
  }),
  contra_Usuario: z.string({
    required_error: "La contraseña es Requerida"
  }).min(1, {
    message: "La contraseña es requerida"
  })
});

export type LoginTypeSchema = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
  nombre_Usuario: z.string({
    required_error: "El nombre es Requerido",
  }).max(30, {
    message: "El nombre debe tener como máximo 30 caracteres"
  }).min(1, {
    message: "El nombre es requerido"
  }),
  correo_Usuario: z.string({
    required_error: "El correo es Requerido",
  }).min(10, {
    message: "El correo debe tener al menos 10 caracteres"
  }).max(30, {
    message: "El correo debe tener como máximo 30 caracteres"
  }).email({
    message: "El correo no es válido"
  }),
  contra_Usuario: z.string({
    required_error: "La contraseña es Requerida"
  }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  }).max(10, {
    message: "La contraseña debe tener como máximo 10 caracteres"
  }).regex(validarContra, {
    message: "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un dígito"
  })
});

export type RegisterTypeSchema = z.infer<typeof RegisterFormSchema>;