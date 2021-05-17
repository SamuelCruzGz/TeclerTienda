//Importamos los módulos
const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const middle = require('./midd/midd')
const serviceAPI = require ('./services/services')

//Middleware globales
app.use(express.json())
app.use(cors())
app.use(middle.limiter)

//iniciar nuestro servidor
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta iniciando en http://${process.env.HOST}:${process.env.PORT}`);
});

//middleware errores globales
app.use((err, req, res, next) => {
    console.log(err);
    if (err){
        return res
        .status(503)
        .json("No esta disponible en este momento")
    }else{
        return next()
    }
})

//end point inicial 
app.get("/",cors(middle.corsOptions), (req, res) => {
    let respuesta = {
      codigo: 200,
      status : "OK", 
      message: "Inicio de la app :D",
    }
    res.json(respuesta);
  })
  
  //get a categorías
app.get("/categoria",cors(middle.corsOptions),async function (req, res)  {
  try {
      let categorias = await serviceAPI.getCategoriaInfo()
      res.send(categorias)
  } catch (error) {
    let finalE = {
      message: "Ocurrió un error",
      error: error.message,
      
    }
    res.send(finalE)
  }
})
//get a productos
app.get("/producto", cors(middle.corsOptions), async function (req,res){
  try{
      id = "MLM1051"
      let producto = await serviceAPI.getProductosInfo(id)
      res.send(producto)
  }
  catch(error){
      let finalE = {
          error: error.message,
          message: "Ocurrió un error",
        }
        res.send(finalE)
  }
})