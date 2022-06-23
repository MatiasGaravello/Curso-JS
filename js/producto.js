function cargaPaginaProducto(producto) {

}

function cargaImagenesSelectoras(listaImagenes) {

    const divSelectorImagenDesktop = document.querySelector("#contenedor-producto #selectorImagenDesktop");

    const divSelectorImagenMobile = document.querySelector("#carousel-producto .carousel-indicators");

    listaImagenes.forEach(x => {
        divSelectorImagenDesktop.innerHTML +=
            `<a href="">
                <img src="../assets/imagen-producto-1.png" alt="" class="imagen-redondeada-con-borde">
            </a>`;

        divSelectorImagenMobile.innerHTML += `
            <div class="carousel-item active">
                <img src="../assets/imagen-producto-1.png" class="d-block w-100" alt="...">
            </div>`;
    });
}

const productoSeleccionado = JSON.stringify(listaProductos[0]);

localStorage.setItem("productoSeleccionado", productoSeleccionado);

