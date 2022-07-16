//#region VARIABLES GLOBALES

let cantidadProductos = 0;
let carrito;
let categoriaElegida;

//#endregion

//#region FUNCIONES INICIALIZACION

const getArchivoJSON = async () => {
    const resp = await fetch("/data.json")

    return await resp.json()
}

function guardaCarritoEnLS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//#endregion

//#region INICIALIZA VARIABLES

carrito = JSON.parse(localStorage.getItem("carrito")) || new Carrito()

categoriaElegida = parseInt(localStorage.getItem("categoriaElegida") || 1)

guardaCarritoEnLS()

//#endregion