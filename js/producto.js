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

    if (!producto.hasTalle) {
        document.querySelector("#detalle #seccionTalle").setAttribute("display", "none");
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
    if (validaTalle(talle)) {
        let detalleCompraRepetido = carrito.listDetalleCompra.find(detalleCompra => detalleCompra.producto.id === producto.id && detalleCompra.talle === talle);

        //verifico si anteriormente se agregó el producto al carrito. En caso de repetirse, actualizo el detalle existente, 
        if (detalleCompraRepetido == null) {
            carrito.listDetalleCompra.push(new DetalleCompra(producto, cantidad, talle));
        } else {
            detalleCompraRepetido.cantidad += cantidad;
        }

        document.querySelector("header #btnCarrito").setCustomValidity("Producto Agregado");
        document.querySelector("header #btnCarrito").reportValidity();

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
    if (agregaProductoEnCarrito(productoSeleccionado, obtieneTalle(), obtieneCantidad())) {
        //redirige a la tienda luego de un tiempo 
        setTimeout(function () { window.open("./tienda.html", "_self"); }, 1500);
    }
};

document.getElementById("btnComprar").onclick = () => {
    if (agregaProductoEnCarrito(productoSeleccionado, obtieneTalle(), obtieneCantidad())) {
        window.open("./carrito.html", "_self");
    }
};

