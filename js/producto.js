function cargaPaginaProducto(producto) {
    cargaImagenesSelectoras(producto);

    cargaImagenPrincipal(producto);

    cargaDetalleProducto(producto);

    agregaIndicadoresCarouselProducto(producto.listPathImagen.length, document.querySelector("#carousel-producto .carousel-indicators"))
}

function cargaImagenPrincipal(producto) {
    const divimagenPricipalProducto = document.querySelector("#contenedor-producto #imagenPricipalProducto");

    divimagenPricipalProducto.innerHTML =
        `<a href="">
            <img class="imagen-redondeada" src=${producto.listPathImagen[0]} alt="Mini bag Riñonera 2 en 1">
        </a>`;
}

function cargaImagenesSelectoras(producto) {

    const divSelectorImagenDesktop = document.querySelector("#contenedor-producto #selectorImagenDesktop");

    const divSelectorImagenMobile = document.querySelector("#carousel-producto .carousel-inner");

    producto.listPathImagen.forEach(x => {
        divSelectorImagenDesktop.innerHTML +=
            `<a href="">
                <img src=${x} alt="" class="imagen-redondeada-con-borde">
            </a>`;

        let itemActive = x == producto.listPathImagen[0] ? "active" : "";

        divSelectorImagenMobile.innerHTML += `
            <div class="carousel-item ${itemActive}">
                <img src=${x} class="d-block w-100" alt="...">
            </div>`;
    });
}

function cargaDetalleProducto(producto) {
    document.querySelector("#detalle #nombreProducto").textContent = producto.nombre;

    document.querySelector("#detalle #precioProducto").textContent = "$" + producto.precio;

    document.querySelector("#detalle #descripcionProducto").textContent = producto.descripcion;

    document.querySelector("#detalle #seccionTalle").style.display = producto.hasTalle ? "block" : "none";
}

function cargaSelectCantidad() {
    const selectCantidad = document.getElementById("selectCantidad")

    for (i = 1; i < 16; i++) {
        const optionCantidad = document.createElement("option")
        optionCantidad.value = i
        optionCantidad.innerText = i

        i === 1 && optionCantidad.setAttribute("selected", "selected")

        selectCantidad.appendChild(optionCantidad)

    }
}

function agregaIndicadoresCarouselProducto(cantidadBotones, contenedorIndicadores) {
    for (let i = 0; i < cantidadBotones; i++) {
        contenedorIndicadores.innerHTML +=
            `<button type="button" data-bs-target="#carousel-producto" data-bs-slide-to="${i}" class="active"
            aria-current="true" aria-label="Slide ${(i + 1)}"></button>`;
    }
}

function agregaProductoEnCarrito(producto, talle, cantidad) {

    if (!producto.hasTalle || validaTalle(talle)) {
        let detalleCompraRepetido = carrito.listDetalleCompra.find(detalleCompra => detalleCompra.producto.id === producto.id && detalleCompra.talle === talle);

        //verifico si anteriormente se agregó el producto al carrito. En caso de repetirse, actualizo el detalle existente, 
        detalleCompraRepetido ? detalleCompraRepetido.cantidad += cantidad : carrito.listDetalleCompra.push(new DetalleCompra(producto, cantidad, talle));

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        }).then(()=>{
            document.getElementById("selectTalle").selectedIndex = 0
            
            document.getElementById("selectCantidad").selectedIndex = 0
        })
       
        guardaCarritoEnLS();

        return true;
    } else {
        const selectTalle = document.querySelector("#seccionTalle #selectTalle");
        selectTalle.setCustomValidity("Seleccione un talle");
        selectTalle.reportValidity();

        return false;
    }

}


function validaTalle(talle) {
    switch (talle) {
        case "s":
        case "m":
        case "l":
            return true;
        default:
            return false;
    }
}

function obtieneTalle() {
    return document.querySelector("#seccionTalle select").value;
}

function obtieneCantidad() {
    return parseInt(document.getElementById("selectCantidad").value);
}



const productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado"));

cargaPaginaProducto(productoSeleccionado);

document.getElementById("btnAgregarAlCarrito").onclick = () => {
    agregaProductoEnCarrito(productoSeleccionado, obtieneTalle(), obtieneCantidad())
};

document.getElementById("btnComprar").onclick = () => {
    agregaProductoEnCarrito(productoSeleccionado, obtieneTalle(), obtieneCantidad()) && window.open("./carrito.html", "_self");
};

cargaSelectCantidad()

