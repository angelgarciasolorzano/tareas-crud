import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/configdb";

class Tarea extends Model {}

Tarea.init(
  {
    id_Tarea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo_Tarea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion_Tarea: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_Usuario_FK: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",
        key: "id_Usuario"
      }
    }
  },
  {
    sequelize,
    modelName: "Tarea",
    tableName: "Tarea",
    timestamps: false,
  }
);

export default Tarea;