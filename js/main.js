//#region VARIABLES GLOBALES

let cantidadProductos = 0;
let carrito;
// let listaProductos = [];

// let listaNovedades = [];
// const listaCategorias = [];
const listaProductoCategoria = [];

//#endregion

//#region FUNCIONES INICIALIZACION

async function getListaProductos(){
    const resp = await fetch("/data.json");

    const objetoJson = await resp.json();

    return objetoJson.listaProductos;

    // generaListaCategorias();

    // asignaCategoriaAProductos();
}

async function getListaCategorias(){
    const resp = await fetch("/data.json");

    const objetoJson = await resp.json();

    return objetoJson.listaCategorias;
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
}

function guardaCarritoEnLS(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//#endregion

//#region INICIALIZA VARIABLES

carrito = JSON.parse(localStorage.getItem("carrito")) || new Carrito();

guardaCarritoEnLS();

//#endregion