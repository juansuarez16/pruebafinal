
const connection = require("../config/conecction");
const pool = require("../config/conecction");
const { promisify } = require('util');
let modulo = {};

//carga los datos que consulta en la base de datos
modulo.read = async (param, callback) => {
    pool.getConnection(async (err, connection) => {
        connection.query = promisify(connection.query);
        if (connection) {
            try {
              

                    const sql='SELECT persona.id_persona,persona.Nombre,persona.Apellido,tipodocumento.nombre_tipo as Tipo_de_documento,persona.Documento_de_identidad,persona.Correo_Electronico,persona.Celular,persona.Fecha_de_Nacimiento,persona.url FROM empresa.persona inner join tipodocumento on Tipo_de_documento=id_tipodocumento '
                   result = await connection.query(sql);
                
                    if(result){
                    connection.release();
                    await callback({ row: result, error: 0 });                    
                } else {
                    connection.release();
                    await callback({ message: "No hay datos", title: "Error de permisos", type: "warning", error: 3 });
                }
            } catch (error) {
                connection.release();
                console.log(error);
                await callback({ title: `No se puede realizar la acción`, message: `${error}`, error: 3, type: "error" });
            }
        }
    });
};
//insert los datos que me envia el front
modulo.create = async (param, callback) => {
    pool.getConnection(async (err, connection) => {
        connection.query = promisify(connection.query);
        if (connection) {
            try {
                let params = param;

                console.log(param);

                    const sql='insert into persona(Nombre,Apellido,Tipo_de_documento,Documento_de_identidad,Correo_Electronico,Celular,Fecha_de_Nacimiento,url)value (?,?,?,?,?,?,?,?);'
                    
                    if(await connection.query(sql, [params.Nombre,params.Apellido,params.Tipo_de_documento,params.Documento_de_identidad,params.Correo_Electronico,params.Celular,params.Fecha_de_Nacimiento,params.url ])){
                    connection.release();
                    await callback({ message: `Persona cargada...!`, error: 0 });
                } else {
                    connection.release();
                    await callback({ message: "No se pudo cargar a la persona", title: "Error de permisos", type: "warning", error: 3 });
                }
            } catch (error) {
                connection.release();
                console.log(error);
                await callback({ title: `No se puede realizar la acción`, message: `${error}`, error: 3, type: "error" });
            }
        }
    });
};

//actualiza los datos que envia el front
modulo.update = async (param, callback) => {
    pool.getConnection(async (err, connection) => {
        connection.query = promisify(connection.query);
        if (connection) {
            try {

                let params = param;

                    const sql='UPDATE persona SET  Nombre=?,Apellido=?,Tipo_de_documento = ?,Documento_de_identidad = ?,Correo_Electronico = ?,Celular = ?,Fecha_de_Nacimiento = ?,url = ? where id_persona= ?;'
                   
                    if(connection.query(sql, [params.Nombre,params.Apellido,params.Tipo_de_documento,params.Documento_de_identidad,params.Correo_Electronico,params.Celular,params.Fecha_de_Nacimiento,params.url,params.id_persona ])){
                    connection.release();
                    await callback({ message: `Persona actualizada...!`, error: 0 });
                } else {
                    connection.release();
                    await callback({ message: "No se pudo cargar a la persona", title: "Error", type: "warning", error: 3 });
                }
            } catch (error) {
                connection.release();
                console.log(error);
                await callback({ title: `No se puede realizar la acción`, message: `${error}`, error: 3, type: "error" });
            }
        }
    });
};
//elimina el dato especifico que envia el front
modulo.delete = async (param, callback) => {
    pool.getConnection(async (err, connection) => {
        connection.query = promisify(connection.query);
        if (connection) {
            try {

                let params = param;

                    const sql='DELETE FROM persona where id_persona = ?'
                    
                    if(connection.query(sql, [params.id_persona])){
                    connection.release();
                    await callback({ message: `Persona Eliminada...!`, error: 0 });
                } else {
                    connection.release();
                    await callback({ message: "No se pudo cargar a la persona", title: "Error", type: "warning", error: 3 });
                }
            } catch (error) {
                connection.release();
                console.log(error);
                await callback({ title: `No se puede realizar la acción`, message: `${error}`, error: 3, type: "error" });
            }
        }
    });
};

module.exports = modulo;