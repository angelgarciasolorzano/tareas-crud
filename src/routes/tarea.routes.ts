import { Router } from "express";
import { TareaSchema } from "../schemas/tarea.shemas";
import { validarDatos } from "../middleware/validacion.datos";
import { 
  getTareas, getTarea, agregarTarea, 
  actualizarTarea, eliminarTarea } 
from "../controllers/tareas.controllers";

import authRequerida from "../middleware/validarToken";

const router = Router();

router.get("/tareas", authRequerida, getTareas);

router.get("/tareas/:id", authRequerida, getTarea);

router.post("/tareas", authRequerida, validarDatos(TareaSchema), agregarTarea);

router.put("/tareas/:id", authRequerida, validarDatos(TareaSchema), actualizarTarea);

router.delete("/tareas/:id", authRequerida, eliminarTarea);

export default router;