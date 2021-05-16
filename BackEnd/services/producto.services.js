const seq = require('../db/conexion')

module.exports.listarProductos = async ()=>{
    try {
        let res = await seq.query('SELECT * FROM dbo.productos')
        return res
    } catch (e) {
        console.log(e);
        throw new Error('Ocurrio un problema con la DB')
    }
}

module.exports.nuevoProducto()=async(producto)=>{
    let productoNuevo = [
        producto.descripcion_prod, 
        producto.precio,         
    ]
    try {
        let res = await seq.query(`INSERT INTO productos (descripcion_prod, precio)  VALUES (?,?)`,
        {replacements: productoNuevo, type: seq.QueryTypes.SELECT})
        return res
    } catch (e) {
        console.log(e);
        throw new Error('Ocurrio un problema al realizar una alta en la DB')
    }
     
}