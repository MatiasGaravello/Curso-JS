const listaProductoCategoria = [];

let listaCategorias;

function agregaProductosEnTienda(listaProductos) {
    let divContenedorProductos = document.getElementById("contenedor-productos");
    divContenedorProductos.innerHTML = "";

    for (const producto of listaProductos) {
        const contenedorProducto = document.createElement("div");

        contenedorProducto.className = "col";

        const strId = producto.idProducto.toString();

        contenedorProducto.setAttribute("data-productoid", strId);

        contenedorProducto.setAttribute("data-productoNombre", producto.nombre);

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

function getListProductosFiltrados() {

    const productosFiltrados = [...getListProductosPorCategoria()];

    getListProductosOrdenados(productosFiltrados);

    return productosFiltrados;
}

function asignaCategoriaAProductos(listaProductos) {

    listaProductoCategoria.push(new ProductoCategoria(listaProductos, listaCategorias.find((x) => x.nombre === "Todas")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Cartera")), listaCategorias.find((x) => x.nombre === "Carteras")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Bolso")), listaCategorias.find((x) => x.nombre === "Bolsos y Maletines")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Mochila")), listaCategorias.find((x) => x.nombre === "Mochilas")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Riñonera")), listaCategorias.find((x) => x.nombre === "Riñoneras")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Portanotebook")), listaCategorias.find((x) => x.nombre === "Portanotebooks")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Bandolera")), listaCategorias.find((x) => x.nombre === "Bandoleras")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Cartuchera")), listaCategorias.find((x) => x.nombre === "Cartucheras")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("pocket")), listaCategorias.find((x) => x.nombre === "Billeteras")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.precio <= 4000), listaCategorias.find((x) => x.nombre === "Promociones")));

    listaProductoCategoria.push(new ProductoCategoria(listaProductos.filter((x) => x.nombre.includes("Clutch")), listaCategorias.find((x) => x.nombre === "Clutches")));
}

function creaSelectCategoria() {
    const selectCategoria = document.getElementById("selectCategoria");

    const categoriaElegida = parseInt(localStorage.getItem("categoriaElegida"));

    listaCategorias.forEach(categoria => {
        const optionCategoria = document.createElement("option");

        optionCategoria.value = categoria.id;

        optionCategoria.innerText = categoria.nombre;

        categoria.id == categoriaElegida && optionCategoria.setAttribute("selected", "selected");

        selectCategoria.appendChild(optionCategoria);
    });

}

function buscaProducto(cadenaBusqueda) {
    document.getElementById("contenedor-productos").childNodes.forEach(x => {
        if (x.dataset.productonombre.includes(cadenaBusqueda)) {
            x.style.display = ""
        } else {
            x.style.display = "none"
        }
    })
}

async function inicializaTienda() {
    const resp = await fetch("/data.json");

    const objetoJson = await resp.json();

    const listaProductos = objetoJson.listaProductos;

    listaCategorias = objetoJson.listaCategorias;

    creaSelectCategoria();

    asignaCategoriaAProductos(listaProductos);

    agregaProductosEnTienda(getListProductosFiltrados());

    const txtBusqueda = document.getElementById("txtBusqueda")

    for (const selectFiltro of document.getElementsByClassName("form-select")) {
        selectFiltro.onchange = () => {
            agregaProductosEnTienda(getListProductosFiltrados());

            localStorage.setItem("categoriaElegida", selectFiltro.value);

            txtBusqueda.value = ""
        };
    }

    document.getElementById("btnBuscar").onclick = (evt) => {
        evt.preventDefault()
        buscaProducto(txtBusqueda.value)
    }

    //reseteo la busqueda en caso
    txtBusqueda.oninput = () => {
        txtBusqueda.value.length == 0 && document.getElementById("contenedor-productos").childNodes.forEach(x => {
            x.style.display = "block"
        })
    }


}

inicializaTienda();


