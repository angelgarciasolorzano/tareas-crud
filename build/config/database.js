"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexionDB = void 0;
const configdb_1 = require("./configdb");
const conexionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield configdb_1.sequelize.authenticate();
        return "Conexion a la base de datos establecida correctamente";
    }
    catch (error) {
        console.log(error);
        return "Error en la conexión a la base de datos";
    }
});
exports.conexionDB = conexionDB;
