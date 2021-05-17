const url = "https:/api.mercadolibre.com/sites/MLM/search?q="
let textML = document.getElementById("MercadoLibre");


/*async function getProduct (name){
    let productName = url + name
    let response = await fetch (productName)
    let legend = document.createElement('p')
    
    legend.textContent = `${json.title}`
    
    textML.appendChild(legend)
    
    
}

async function getProductoML (name){
    let response = await getProduct(name)
    console.log(response)

}
*/
//Prueba
function getProducto(name){
    let productName = url + name
    fetch(productName)
        .then (response => response.json())
        .then(json => {
            console.log(json)            
            console.log(productName)
            for (let i=0;i<productName.length ;i++){
                const myPara1 = document.createElement('p')
                myPara1.textContent= `${json.results[i].title}`
                const myPara2 = document.createElement('p')
                myPara2.textContent=`$ ${json.results[i].price}`                
                let imagen = document.createElement('img')
                imagen.setAttribute('src',json.results[i].thumbnail)
                imagen.className += "imagen"
                let aceptar = document.createElement('img')
                aceptar.setAttribute('src',"./assets/img/carrito.jpeg")
                aceptar.className += "agregar"
                let eliminar = document.createElement('img')
                eliminar.setAttribute('src','./assets/img/trash.jpeg')
                eliminar.className += "eliminar"
                textML.appendChild(myPara1)
                textML.appendChild(myPara2)
                textML.appendChild(imagen)
                textML.appendChild(aceptar)
                textML.appendChild(eliminar)
            }
        }).catch(err=>{
            console.error("Error: ",err)
        })

}

//getProducto("computadora")
getProducto("iphone")