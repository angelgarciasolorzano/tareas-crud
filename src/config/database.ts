import { sequelize } from "./configdb";

export const conexionDB = async () => {
  try {
    await sequelize.authenticate();
    return "Conexion a la base de datos establecida correctamente";
  } catch (error) {
    return "Error en la conexión a la base de datos"
  }
}