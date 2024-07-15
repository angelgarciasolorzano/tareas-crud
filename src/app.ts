import { conexionDB } from "./config/database";

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UsuarioRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use('/api', UsuarioRoutes);

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