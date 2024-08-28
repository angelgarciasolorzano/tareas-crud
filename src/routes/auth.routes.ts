import { Router } from "express";
import { validarDatos } from "../middleware/validacion.datos";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schemas";
import { 
  registrarUsuario, 
  loginUsuario, 
  cerrarSesion,
  verificarToken 
} from "../controllers/auth.controllers";

const router = Router();

router.post("/login", validarDatos(LoginSchema), loginUsuario);

router.post("/register",  validarDatos(RegisterSchema), registrarUsuario);

router.post("/logout", cerrarSesion);

router.get("/verificar", verificarToken);

export default router;