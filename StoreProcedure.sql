CREATE DEFINER=`root`@`localhost` PROCEDURE `personaCrearoActua`(  
  IN _id_persona int ,
  IN _Nombre varchar(50) ,
IN _Apellido varchar(50),
IN _Tipo_de_documento INT,
IN _Documento_de_identidad int ,
IN _Correo_Electronico varchar(100),
IN _Celular varchar(11),
IN _Fecha_de_Nacimiento date,
IN _url longtext
)
BEGIN
	IF _id_persona=0 THEN
    
     insert into persona(Nombre,Apellido,Tipo_de_documento,Documento_de_identidad,Correo_Electronico,Celular,Fecha_de_Nacimiento,url)
     value (_Nombre,_Apellido,_Tipo_de_documento,_Documento_de_identidad,_Correo_Electronico,_Celular,_Fecha_de_Nacimiento,_url);
     
     SET _id_persona= last_insert_id();     
     ELSE
     UPDATE persona
     SET
        Nombre=_Nombre,
        Apellido=_Apellido,
        Tipo_de_documento=_Tipo_de_documento,
        Documento_de_identidad=_Documento_de_identidad,
        Correo_Electronico=_Correo_Electronico,
        Celular=_Celular,
        Fecha_de_Nacimiento=_Fecha_de_Nacimiento,
        url=_url
        where id_persona=_id_persona ;      
        END IF ;   

END