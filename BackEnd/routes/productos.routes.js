const productoService = require ('../services/producto.services')

module.exports = (app) =>{
    app.get('/productos', async (req, res) => {
        try {
            let resp = await productoService.listarProductos()
            res.json(resp)
        } catch (e) {
            console.log(e);
            res.status(500).json({error: e.message})
        }
    })

    app.get('/productos/:descripcion_prod', async(req, res)=>{
        let descripcion_prod = req.params.descripcion_prod
    })

    app.post('/productos', async (req, res)=>{
        let producto = req.body
        try {
            let resp = await productoService.nuevoProducto(producto)
            console.log(resp)
            res.json('El producto fue guardado correctamente')
        } catch (e) {
            console.log(e)
            res,status(500).json({error: e.message})
        }
    })
}