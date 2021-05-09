//Importamos y exportamos
const fetch = require('node-fetch');
module.exports = { getCategoriaInfo,getProductosInfo};

//Declaración de variables
let urlCategoria = process.env.urlCategoria
let urlProducto = process.env.urlProducto

//Funciones
async function getCategoria() {
    let res = await fetch(urlCategoria);
    let data = await res.json();
    return data;
}
async function getCategoriaInfo() {
    
    let resultado = await getCategoria();
    console.log(resultado)
    try {
        if (!resultado){
            throw new Error("La url esta dañada")
            
        }else{
            console.log("La url es correcta")
        }
    }catch (e){
        throw new Error(e.message)
        
    }
    return resultado;
}
//getInfoCategoria();


async function getProductCategoria(id) {
    let urlProduct = urlProducto + id;
    try{
        if(!id){
            throw new Error("No existe un ID")
        }else{
            console.log(":D")
            let res = await fetch(urlProduct);
            let data = await res.json();
            return data;
        }
    }catch (e){
        throw new Error (e.message)
    }
    
}
async function getProductosInfo(id) {
    let resultado = await getProductCategoria(id);
    return resultado;
}



