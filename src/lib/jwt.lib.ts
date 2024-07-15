import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const TOKEN_SECRET: string = `${ process.env.TOKEN_SECRET }`;

interface datosToken {
  id_Usuario: number
};

export const crearAccesoToken = (datos: datosToken) => {
  return new Promise((resolver, rechazar) => {
    jwt.sign(
      datos,
      TOKEN_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          rechazar("Error al generar el token");
        } else {
          resolver(token);
        }
      }
    )
  });
};