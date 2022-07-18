let listaPublicidad;
let listaProductos;
let listNuestrosProductos;
let listaCategorias;

async function agregaElementosPublicidad() {
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

        carouselItem.className = imagenConDescripcion[0] !== x ? "carousel-item" : "carousel-item active";

        carouselItem.innerHTML = `<img src=${x.pathImagen} class="d-block w-100" alt=${x.descripcion}>`;

        contenedorItems.appendChild(carouselItem);
    });
}

async function agregaElementosEnNovedades() {
    const divNovedades = document.querySelector("#novedades .row");
    divNovedades.innerHTML = "";

    const listaNovedades = [listaProductos[4], listaProductos[2], listaProductos[7], listaProductos[9]];

    for (const producto of listaNovedades) {
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

        divProductoNovedad.onclick = () => {
            localStorage.setItem("productoSeleccionado", JSON.stringify(producto))
        }
    }
}

function agregaElementosEnNuestrosProductos() {
    let divNuestrosProductos = document.querySelector("#productos .row");
    divNuestrosProductos.innerHTML = "";

    listNuestrosProductos.forEach(categoria => {
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

        divCategoriaProducto.onclick = () => {
            localStorage.setItem("categoriaElegida", categoria.id);

            window.open("./producto.html", "_self");
        }

    })
}

async function setInfoElementosIndex() {
    const archivoJSON = await getArchivoJSON();

    listaPublicidad = archivoJSON.listaPublicidad;

    listaProductos = archivoJSON.listaProductos;

    listNuestrosProductos = archivoJSON.listNuestrosProductos;

    listaCategorias = archivoJSON.listaCategorias;
}

async function inicializaIndex() {
    await setInfoElementosIndex();

    agregaElementosPublicidad();

    agregaElementosEnNovedades();

    agregaElementosEnNuestrosProductos();
}

inicializaIndex();


