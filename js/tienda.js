function agregaProductosEnTienda() {
    let divContenedorProductos = document.getElementById("contenedor-productos");

    for (const producto of listaProductos) {
        const contenedorProducto = document.createElement("div");

        contenedorProducto.className = "col";

        contenedorProducto.innerHTML = 
            `<a href="../pages/producto.html" class="text-reset">
                <div class="card fade-in transition-regular">
                    <div class="row g-0 align-items-strech text-center">
                        <div class="col-5 col-sm-12">
                            <img src=${producto.pathImagen} class="img-fluid rounded-start" alt=${producto.nombre}>
                        </div>
                        <div class="col-7 col-sm-12">
                            <div class="card-body h-100 d-flex flex-column justify-content-center">
                                <h3 class="card-title fs-5">${producto.nombre}</h3>
                                <p class="card-text fs-3 fw-bold">$${producto.precio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>`;

        divContenedorProductos.appendChild(contenedorProducto);
    }
}


agregaProductosEnTienda();
