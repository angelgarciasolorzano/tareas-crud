import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/configdb";

class Usuarios extends Model {}

Usuarios.init(
  {
    id_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    correo_Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contra_Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Usuarios",
    tableName: "Usuarios",
    timestamps: false
  }
);

export default Usuarios;