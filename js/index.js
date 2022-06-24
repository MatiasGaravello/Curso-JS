const listaPublicidad = [{ pathImagen: "../assets/imagen-principal-1.jpg", descripcion: "mochila nude y cuero serpiente" },
{ pathImagen: "../assets/imagen-principal-2.jpg", descripcion: "riñonera negra con tachas" },
{ pathImagen: "../assets/imagen-principal-3.jpg", descripcion: "mochila roja con charol negro" }];

const listNovedades = [listaProductos[4], listaProductos[2], listaProductos[7], listaProductos[9]];

const listNuestrosProductos = [{ pathImagen: "assets/producto-riñonera1.jpg", nombre: "riñoneras" },
{ pathImagen: "assets/producto-mochila.jpg", nombre: "mochilas" },
{ pathImagen: "assets/producto-bolso.jpg", nombre: "bolsos" },
{ pathImagen: "assets/producto-clutch.jpg", nombre: "clutches" },
{ pathImagen: "assets/producto-minibag.jpg", nombre: "minibags" },
{ pathImagen: "assets/producto-portanotebook.jpg", nombre: "portanotebooks" },
{ pathImagen: "assets/producto-billetera.jpg", nombre: "billeteras" },
{ pathImagen: "assets/producto-cartuchera.jpg", nombre: "cartucheras" },
{ pathImagen: "assets/producto-bandolera.jpg", nombre: "bandoleras" }];

function agregaElementosPublicidad() {
    agregaIndicadoresCarousel(listaPublicidad.length, document.querySelector("#carouselPublicidad .carousel-indicators"));

    agregaImagenesCarousel(listaPublicidad, document.querySelector("#carouselPublicidad .carousel-inner"));
}

function agregaIndicadoresCarousel(cantidadBotones, contenedorIndicadores) {
    for (let i = 0; i < cantidadBotones; i++) {
        contenedorIndicadores.innerHTML +=
            `<button type="button" data-bs-target="#carouselPublicidad" data-bs-slide-to="${i}" class="active"
            aria-current="true" aria-label="Slide ${(i + 1)}"></button>`;
    }
}

function agregaImagenesCarousel(imagenConDescripcion, contenedorItems) {
    imagenConDescripcion.forEach(x => {
        const carouselItem = document.createElement("div");

        if (imagenConDescripcion[0] != x) {
            carouselItem.className = "carousel-item";
        } else {
            carouselItem.className = "carousel-item active";
        }

        carouselItem.innerHTML = `<img src=${x.pathImagen} class="d-block w-100" alt=${x.descripcion}>`;

        contenedorItems.appendChild(carouselItem);
    });
}

function agregaElementosEnNovedades() {
    const divNovedades = document.querySelector("#novedades .row");
    divNovedades.innerHTML = "";

    for (const producto of listNovedades) {
        const divProductoNovedad = document.createElement("div");
        divProductoNovedad.className = "col";
        divProductoNovedad.innerHTML =
            `<a href="pages/producto.html" class="text-reset">
                <div class="card h-100 border-0 fade-in transition-regular">
                    <img src=${producto.listPathImagen[0]} class="card-img-top rounded imagen-2" alt=${producto.nombre}>
                    <div class="card-body">
                        <h3 class="card-title fs-5 text-truncate">${producto.nombre}</h5>
                            <p class="card-text fs-3 fw-bold">$${producto.precio}</p>
                    </div>
                </div>
            </a>`

        divNovedades.appendChild(divProductoNovedad);
    }
}

function agregaElementosEnNuestrosProductos() {
    let divNuestrosProductos = document.querySelector("#productos .row");
    divNuestrosProductos.innerHTML = "";

    for (const categoria of listNuestrosProductos) {
        const divCategoriaProducto = document.createElement("div");
        divCategoriaProducto.className = "col";
        divCategoriaProducto.innerHTML =
            `<a href="pages/tienda.html">
                <div class="card text-white text-uppercase mx-auto img-hover-zoom">
                    <img src=${categoria.pathImagen} class="card-img" alt=${categoria.nombre}>
                    <div class="card-img-overlay d-flex flex-column justify-content-end">
                        <h3 class="card-title text-center text-truncate">${categoria.nombre}</h3>
                    </div>
                </div>
            </a>`

        divNuestrosProductos.appendChild(divCategoriaProducto);
    }
}

agregaElementosEnNovedades();

agregaElementosEnNuestrosProductos();

agregaElementosPublicidad();
