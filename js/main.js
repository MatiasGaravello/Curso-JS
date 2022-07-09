//#region VARIABLES GLOBALES

let cantidadProductos = 0;
let carrito;
let listaProductos = [];

// let listaNovedades = [];
const listaCategorias = [];
const listaProductoCategoria = [];

//#endregion

//#region FUNCIONES INICIALIZACION

// function generaListaProductos() {

//     listaProductos.push(new Producto("Mini-pocket", 2000, false, ["../assets/minipocket.png"], ""));

//     listaProductos.push(new Producto("Cartera Total Black", 4200, true, ["../assets/cartera_total_black.png"], ""));

//     listaProductos.push(new Producto("Bandolera negra con cadena", 3000, true, ["../assets/bandolera-negra.png"], ""));

//     listaProductos.push(new Producto("Bolso Blanco", 5000, true, ["../assets/bolso-mendiano-blanco.png"], ""));

//     listaProductos.push(new Producto("Bolso de viaje XXL", 5200, true, ["../assets/bolso-de-viaje-1.png", "../assets/bolso-de-viaje-2.png"], "En esta ocasión combinamos Charol Negro con Nude Mate y le dimos brillo con nuestro Glitter multicolor en las correas. Que les parece?"));

//     listaProductos.push(new Producto("Mochila beige", 4500, true, ["../assets/mochila_beige.png"], ""));

//     listaProductos.push(new Producto("Mochila Croco Negro", 4700, true, ["../assets/mochila-croco-negro.png"], ""));

//     listaProductos.push(new Producto("Riñonera Negra", 3000, false, ["../assets/riñonera_negra.png"], ""));

//     listaProductos.push(new Producto("Portanotebook con manija", 3400, true, ["../assets/portanotebook_con_manija.png"], ""));

//     listaProductos.push(new Producto("Mochila Negra", 4000, true, ["../assets/mochi-small-negra.png"], ""));

//     listaProductos.push(new Producto("Mochila Silver Metalizado", 4500, true, ["../assets/mochi_metalizada.png"], ""));

//     listaProductos.push(new Producto("Mini Bag Riñonera 2 en 1", 4000, true, ["../assets/imagen-producto-1.png", "../assets/imagen-producto-2.png", "../assets/imagen-producto-3.png", "../assets/imagen-producto-4.png"], "Si así es, cambiándole la posición de la correa la podes usar como Riñonera o solo como Bandolera. Vos elegí la opción que más te guste según tu outfit."));
// }

async function getListaProductos(){
    const resp = await fetch("/data.json");

    listaProductos = await resp.json();

    generaListaCategorias();

    asignaCategoriaAProductos();

    // listaNovedades = [listaProductos[4], listaProductos[2], listaProductos[7], listaProductos[9]];

    // agregaElementosEnNovedades();
}

function generaListaCategorias() {

    listaCategorias.push(new Categoria(1, "Todas"));

    listaCategorias.push(new Categoria(2, "Carteras"));

    listaCategorias.push(new Categoria(3, "Bolsos y Maletines"));

    listaCategorias.push(new Categoria(4, "Mochilas"));

    listaCategorias.push(new Categoria(5, "Riñoneras"));

    listaCategorias.push(new Categoria(6, "Portanotebooks"));

    listaCategorias.push(new Categoria(7, "Bandoleras"));

    listaCategorias.push(new Categoria(8, "Cartucheras"));

    listaCategorias.push(new Categoria(9, "Billeteras"));

    listaCategorias.push(new Categoria(10, "Promociones"));
}

function asignaCategoriaAProductos() {

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

// getListaProductos();

carrito = JSON.parse(localStorage.getItem("carrito")) || new Carrito();

guardaCarritoEnLS();

//#endregion