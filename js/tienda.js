function agregaProductosEnTienda(listaProductosFiltrados) {
    let divContenedorProductos = document.getElementById("contenedor-productos");
    divContenedorProductos.innerHTML = "";

    for (const producto of listaProductosFiltrados) {
        const contenedorProducto = document.createElement("div");

        contenedorProducto.className = "col";

        contenedorProducto.innerHTML =
            `<a href="../pages/producto.html" class="text-reset">
                <div class="card fade-in transition-regular">
                    <div class="row g-0 align-items-strech text-center">
                        <div class="col-5 col-sm-12">
                            <img src=${producto?.listPathImagen[0]} class="img-fluid rounded-start" alt=${producto.nombre}>
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

        contenedorProducto.onclick = () => { localStorage.setItem("productoSeleccionado", JSON.stringify(producto)) };
    }
}

function getListProductosOrdenados(listaProductos) {
    const selectOrdernar = document.getElementById("selectOrdernar");

    switch (selectOrdernar.value) {
        case "relevancia":
            //devuelve lista original
            break;
        case "menor_precio":
            listaProductos.sort((a, b) => a.precio - b.precio);
            break;
        case "mayor_precio":
            listaProductos.sort((a, b) => b.precio - a.precio);
            break;
        default:

    }
}

function getListProductosPorCategoria() {

    const selectCategoria = document.getElementById("selectCategoria");

    const productoCategoria = listaProductoCategoria.find(x => x.categoria.id === parseInt(selectCategoria.value));

    return productoCategoria?.listaProductos;
}

function getListProductosFiltrados(productosFiltrados) {

    // const resp = await getListaProductos();

    productosFiltrados = [...getListProductosPorCategoria()];

    getListProductosOrdenados(productosFiltrados);

    return productosFiltrados;
}

async function inicializaTienda() {
    const listaProductos = await getListaProductos();

    agregaProductosEnTienda(getListProductosFiltrados());

    for (const selectFiltro of document.getElementsByClassName("form-select")) {
        selectFiltro.onclick = () => {
            agregaProductosEnTienda(getListProductosFiltrados());
        };
    }
}

inicializaTienda();


