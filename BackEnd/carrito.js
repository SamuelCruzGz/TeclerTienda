const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

function inicio() {
    location.href = '/FrontEnd/index.html';
}

/*document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        const productosLS = JSON.parse(localStorage.getItem('carrito'))
        console.log(productosLS);
    }
}) */

function obtenerProductosLocalStorage(){
    let productoLS;
  
    if(localStorage.getItem('carrito')=== null){
      productoLS = [];
    }else{
      productoLS = JSON.parse(localStorage.getItem('carrito'));

    }
    return productoLS;
  }

function leerCarrito() {
    let productosLS
    productosLS = obtenerProductosLocalStorage();
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
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
document.addEventListener('DOMContentLoaded', leerCarrito());