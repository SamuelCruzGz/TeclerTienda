// Declaración de variables
const url = "https:/api.mercadolibre.com/sites/MLM/search?q="
let textML = document.getElementById("MercadoLibre")
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const items = document.getElementById('items')
const fragment = document.createDocumentFragment()
const cards = document.getElementById('cards')
let contador = 0
let carrito = {}

//Cuando escuche el evento ejecutará nuestra función
document.addEventListener('DOMContentLoaded', () => {
    buscar()
})

//Obtener click del boton de carrito de compras
textML.addEventListener('click', e => {
    addCarrito(e);
})

items.addEventListener('click', e => {
    btnAgregarQuitar(e);
})


//Función para uso de nuestro buscador
function buscar() {
    let input = document.getElementById('search').value
    getProducto(input)
    
    if (contador != 0) {
        location.reload()
    }
    contador++
}

//Función para obtener el producto y mostrarlo
function getProducto(name) {
    name.innerHTML = ''
    let productName = url + name
    fetch(productName)
        .then(response => response.json())
        .then(json => {            
                for (let i = 0; i < productName.length; i++) {
                    const myDiv = document.createElement('div')
                    myDiv.className = 'div-mostrar'
                    const icon = document.createElement('button')
                    icon.className = 'fa fa-cart-plus'
                    icon.setAttribute('aria-hidden', true)
                    icon.setAttribute('id', 'icon')
                    const myPara1 = document.createElement('p')
                    myPara1.textContent = `${json.results[i].title}`
                    //Convertir precio de string a entero
                    newprice = `$ ${json.results[i].price}`.substring(2, `$ ${json.results[i].price}`.length)
                    newprice2 = parseInt(newprice);
                    const myPara2 = document.createElement('h5')
                    myPara2.textContent = newprice2
                    let imagen = document.createElement('img')
                    imagen.setAttribute('src', json.results[i].thumbnail)
                    imagen.className += "imagen"
                    myDiv.appendChild(myPara1)
                    myDiv.appendChild(myPara2)
                    myDiv.appendChild(imagen)
                    myDiv.appendChild(icon).dataset.id = `$ ${json.results[i].id}`                    
                    textML.appendChild(myDiv)                                                        
                } 
        }).catch(err => {
            console.error("Error: ", err)
        })

}



//Añadimos al carrito
const addCarrito = e => {
    if (e.target.classList.contains('fa-cart-plus')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.fa-cart-plus').dataset.id,
        title: objeto.querySelector('p').textContent,
        price: objeto.querySelector('h5').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto }
    pintarCarrito()
}

//Se obtiene el total del carro
const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()
    localStorage.setItem('carrito', json.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope='row' colSpan='5'>Carrito vacio - comience a comprar!</th>        `
        return;
    }
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, price }) => acc + cantidad * price, 0)
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito();
    })
}

const btnAgregarQuitar = e => {
    console.log(e.target);
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito();
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}