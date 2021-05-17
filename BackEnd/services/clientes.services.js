const seq = require('../db/conexion')

module.exports.listarCliente = async() =>{
    try {
        let res = await seq.query('SELECT * FROM dbo.clientes')    
        return res
    } catch (e) {
        console.log(e)
        throw new Error ('Ocurrio un error en la DB')        
    }
}

module.exports.nuevoCliente()=async(cliente)=>{
    let clienteNuevo=[
        cliente.nombre_usuario,
        cliente.apellido_usuario,
        cliente.direccion_usuario,
        cliente.genero_usuario,
    ]
    try {
        let res = await seq.query(`INSERT INTO clientes (nombre_usuario, apellido_usuario,
             direccion_usuario, genero_usuario) VALUES (?,?,?,?)`,{
                replacements: clienteNuevo, type: seq.QueryTypes.SELECT
             })
             return results
    } catch (e) {
        console.log(e);
        throw new Error ('Ocurrio un error al realizar una alta en la DB')
        
    }
}