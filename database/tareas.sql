DROP DATABASE IF EXISTS tareas;
CREATE DATABASE tareas;
USE tareas;

CREATE TABLE Usuarios (
  id_Usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario VARCHAR (30) NOT NULL,
  correo_Usuario VARCHAR (30) NOT NULL,
  contra_Usuario VARCHAR (10) NOT NULL
);

CREATE TABLE Tarea (
  id_Tarea INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo_Tarea VARCHAR (30) NOT NULL,
  descripcion_Tarea VARCHAR (50) NOT NULL,
  id_Usuario_FK INT NOT NULL,

  FOREIGN KEY (id_Usuario_FK) REFERENCES Usuarios (id_Usuario)
);

ALTER TABLE Tarea CHANGE COLUMN nombre_Tarea titulo_Tarea VARCHAR (50) NOT NULL; 

DESCRIBE Usuario;
DESCRIBE Tarea;

DROP TABLE Usuarios;
DROP TABLE Tarea;

DROP PROCEDURE UsuarioInformacion;