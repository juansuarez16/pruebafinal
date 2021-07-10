create database IF NOT EXISTS empresa;
use empresa;
create table persona(
id_persona int not null auto_increment,
Nombre varchar(50) not null,
Apellido varchar(50) not null,
Tipo_de_documento INT not null,
Documento_de_identidad int not null,
Correo_Electrónico varchar(100),
Celular varchar(11) not null,
Fecha_de_Nacimiento date not null,
url longtext,
 PRIMARY KEY (`id_persona`)
);


create table tipodocumento(
id_tipodocumento int not null auto_increment,
nombre_tipo varchar(50),
PRIMARY KEY (`id_tipodocumento`)
);
#ejecutar despues de crear las tablas#
ALTER TABLE `empresa`.`persona` 
ADD CONSTRAINT `fk_persona_tipodocumento`
  FOREIGN KEY (`Tipo_de_documento`)
  REFERENCES `empresa`.`tipodocumento` (`id_tipodocumento`)
