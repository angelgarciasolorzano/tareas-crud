import { conexionDB } from "./config/database";

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UsuarioRoutes from "./routes/auth.routes";
import TareaRoutes from "./routes/tarea.routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const PORT_CLIENT = process.env.PORT_CLIENT;

app.use(cors({
  origin: `${ PORT_CLIENT }`,
  credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use('/api', UsuarioRoutes);
app.use('/api', TareaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ PORT }`);
});

const mensaje = async () => {
  try {
    const conexion = await conexionDB();
    console.log(conexion);
  } catch (error) {
    console.log(error);
  }
};
mensaje();