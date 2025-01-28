const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('.carrito-items'); // Cambiado a la nueva clase
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalElemento = document.querySelector('.carrito-precio-total');

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    
    // Nuevos listeners para cambios de cantidad
    carrito.addEventListener('click', manejarCantidad);
}

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.closest('.product');
        leerDatosElemento(elemento);
        actualizarTotalCarrito(); // Actualizar total al agregar
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    // Verificar si el elemento ya existe
    const existe = [...lista.children].some(item => 
        item.querySelector('.carrito-item-titulo').textContent === elemento.titulo
    );
    
    if(existe) {
        alert('El producto ya está en el carrito');
        return;
    }

    const itemCarrito = document.createElement('div');
    itemCarrito.classList.add('carrito-item');
    itemCarrito.innerHTML = `
        <img src="${elemento.imagen}" width="80px" alt="${elemento.titulo}">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${elemento.titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${elemento.precio}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    
    lista.appendChild(itemCarrito);
    actualizarTotalCarrito();
}

function manejarCantidad(e) {
    if(e.target.classList.contains('sumar-cantidad')) {
        const input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        actualizarTotalCarrito();
    }
    
    if(e.target.classList.contains('restar-cantidad')) {
        const input = e.target.nextElementSibling;
        if(parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            actualizarTotalCarrito();
        }
    }
}

function eliminarElemento(e){
    e.preventDefault();
    if(e.target.closest('.btn-eliminar')) {
        e.target.closest('.carrito-item').remove();
        actualizarTotalCarrito();
    }
}

function vaciarCarrito(){
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    actualizarTotalCarrito();
}

// Función principal para actualizar el total
function actualizarTotalCarrito(){
    let total = 0;
    
    document.querySelectorAll('.carrito-item').forEach(item => {
        const precioTexto = item.querySelector('.carrito-item-precio').textContent;
        const precio = parseFloat(
            precioTexto
                .replace('$', '')
                .replace(/\./g, '')
                .replace(',', '.')
        );
        
        const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        total += precio * cantidad;
    });

    totalElemento.textContent = `$${total.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}