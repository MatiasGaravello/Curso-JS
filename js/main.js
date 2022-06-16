//#region VARIABLES GLOBALES

let cantidadProductos = 0;
let productosEnCarrito;

const listaProductos = [];
const listaCategorias = [];
const listaProductoCategoria = [];

//#endregion

//#region FUNCIONES INICIALIZACION

// function setIdProductos(listaProductos) {
//     for (let i = 0; i < 9; i++) {
//         listaProductos[i].id = parseInt(i);
//     }
// }

function generaListaProductos() {

    listaProductos.push(new Producto("Mini-pocket", 2000, false, "../assets/minipocket.png"));

    listaProductos.push(new Producto("Cartera Total Black", 4200, true, "../assets/cartera_total_black.png"));

    listaProductos.push(new Producto("Bandolera negra con cadena", 3000, true, "../assets/bandolera-negra.png"));

    listaProductos.push(new Producto("Bolso Blanco", 5000, true, "../assets/bolso-mendiano-blanco.png"));

    // listaProductos.push(new Producto("Bolso Nude", 5200, true,""));

    listaProductos.push(new Producto("Mochila beige", 4500, true, "../assets/mochila_beige.png"));

    listaProductos.push(new Producto("Mochila Croco Negro", 4700, true, "../assets/mochila-croco-negro.png"));

    listaProductos.push(new Producto("Riñonera Negra", 3000, false, "../assets/riñonera_negra.png"));

    listaProductos.push(new Producto("Portanotebook con manija", 3400, true, "../assets/portanotebook_con_manija.png"));

    // listaProductos.push(new Producto("Portanotebook convencional", 3000, true));

    listaProductos.push(new Producto("Mochila Silver Metalizado", 4500, true, "../assets/mochi_metalizada.png"));

    // listaProductos.push(new Producto("Cartuchera con glitter", 2600, false));
}

function generaListaCategorias() {

    listaCategorias.push(new Categoria(100, "Carteras"));

    listaCategorias.push(new Categoria(101, "Bolsos y Maletines"));

    listaCategorias.push(new Categoria(102, "Mochilas"));

    listaCategorias.push(new Categoria(103, "Riñoneras"));

    listaCategorias.push(new Categoria(104, "Portanotebooks"));

    listaCategorias.push(new Categoria(105, "Bandoleras"));

    listaCategorias.push(new Categoria(106, "Cartucheras"));

    listaCategorias.push(new Categoria(107, "Billeteras"));

    listaCategorias.push(new Categoria(108, "Promociones"));

    listaCategorias.push(new Categoria(109, "Todas"));

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

//#endregion

//#region INICIALIZA VARIABLES

// 



generaListaProductos();

generaListaCategorias();

asignaCategoriaAProductos();

//#endregion