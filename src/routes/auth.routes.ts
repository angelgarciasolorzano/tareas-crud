import { Router } from "express";
import { validarDatos } from "../middleware/validacion.datos";
import { usuarioSchema } from "../schemas/usuario.schemas";
import { 
  registrarUsuario, 
  loginUsuario, 
  cerrarSesion 
} from "../controllers/auth.controllers";

const router = Router();

router.post("/login", validarDatos(usuarioSchema), loginUsuario);

router.post("/register",  validarDatos(usuarioSchema), registrarUsuario);

router.post("/logout", cerrarSesion);

export default router;