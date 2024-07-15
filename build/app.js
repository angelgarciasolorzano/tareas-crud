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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const tareas_routes_1 = __importDefault(require("./routes/tareas.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
dotenv_1.default.config();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(tareas_routes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const mensaje = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conexion = yield (0, database_1.conexionDB)();
        console.log(conexion);
    }
    catch (error) {
        console.log(error);
    }
});
mensaje();
