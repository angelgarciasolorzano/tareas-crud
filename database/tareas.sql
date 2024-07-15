DROP DATABASE IF EXISTS tareas;
CREATE DATABASE tareas;
USE tareas;

CREATE TABLE Usuarios (
  id_Usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  correo_Usuario VARCHAR (30) NOT NULL,
  contra_Usuario VARCHAR (30) NOT NULL
);

CREATE TABLE Tarea (
  id_Tarea INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Tarea VARCHAR (30) NOT NULL,
  descripcion_Tarea VARCHAR (50) NOT NULL,
  id_Usuario_FK INT NOT NULL,

  FOREIGN KEY (id_Usuario_FK) REFERENCES Usuarios (id_Usuario)
);

DESCRIBE Usuario;
DESCRIBE Tarea;

DROP TABLE Usuarios;
DROP TABLE Tarea;

DROP PROCEDURE UsuarioInformacion;