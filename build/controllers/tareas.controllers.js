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
exports.crearUsuario = void 0;
const usuario_models_1 = __importDefault(require("../models/usuario.models"));
const crearUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contra } = request.body;
    try {
        const usuarios = yield usuario_models_1.default.create({
            correo_Usuario: correo,
            contra_Usuario: contra
        });
        console.log(usuarios);
        return response.json(usuarios);
    }
    catch (errro) {
        return response.status(404).json({ message: "El usuario no se pudo crear" });
    }
});
exports.crearUsuario = crearUsuario;
