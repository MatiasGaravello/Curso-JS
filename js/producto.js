function cargaPaginaProducto(producto) {
    cargaImagenesSelectoras(producto);

    cargaImagenPrincipal(producto);

    cargaDetalleProducto(producto);
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

        divSelectorImagenMobile.innerHTML += `
            <div class="carousel-item active">
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

// productoJSON = JSON.stringify(listaProductos[11]);

// localStorage.setItem("productoSeleccionado", productoJSON);

const productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado"));

cargaPaginaProducto(productoSeleccionado);

