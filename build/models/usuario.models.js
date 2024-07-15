"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
const Usuario = sequelize.define('Usuario', {
    correo_Usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    contra_Usuario: {
        type: sequelize_1.DataTypes.INET,
        allowNull: false
    }
});
exports.default = Usuario;
