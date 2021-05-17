const clienteService = require ('../services/clientes.services')

module.exports = (app) =>{
    app.get('/clientes',async (req, res)=>{
        try {
            let resp = await clienteService.listarCliente()
            res.json(resp)
        } catch (e) {
            console.log(e)
            res.status(500).json({error: e.message})
        }
    })

    app.get('/clientes/:nombre_usuario', async(req, res)=>{
        let nombre_usuario = req.params.nombre_usuario
    })

    app.post('/clientes', async (req, res)=>{
        let cliente = req.body
        try {
            let resp = await clienteService.nuevoCliente(cliente)
            console.log(resp)
            res.json('El cliente se ha guardado correctamente')
        } catch (e) {
            console.log(e)
            res.status(500).json({error: e.message})
        }
    })
}