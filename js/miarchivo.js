//#region VARIABLES GLOBALES

let cantidadProductos = 0;
let productosEnCarrito;

const listaProductos = [];
const listaCategorias = [];
const listaProductoCategoria = [];

//#endregion

//#region  CLASES

class Producto {
    constructor(nombre, precio, hasTalle) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = ++cantidadProductos;
        this.hasTalle = hasTalle;
    }
}

class DetalleCompra {
    constructor(producto, cantidad, talle) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.talle = talle
    }

    getSubtotal() {
        return this.producto.precio * this.cantidad;
    }
}

class Compra {
    constructor(listDetalleCompra) {
        this.listDetalleCompra = listDetalleCompra;
    }

    getTotal() {
        let total = 0;

        if (this.listDetalleCompra != null) {
            for (let detalleCompra of this.listDetalleCompra) {
                total += detalleCompra.getSubtotal();
            }
        }

        return total;
    }
}

class Categoria {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class ProductoCategoria {
    constructor(listaProductos, categoria) {
        this.listaProductos = listaProductos;
        this.categoria = categoria;
    }
}

//#endregion


//#region FUNCIONES


//#region FUNCIONES INICIALIZACION
function setIdProductos(listaProductos) {
    for (let i = 0; i < 9; i++) {
        listaProductos[i].id = parseInt(i);
    }
}

function generaListaProductos() {

    listaProductos.push(new Producto("Mini-pocket", 2000, false));

    listaProductos.push(new Producto("Cartera Total Black", 4200, true));

    listaProductos.push(new Producto("Bandolera negra con cadena", 3000, true));

    listaProductos.push(new Producto("Bolso Blanco", 5000, true));

    listaProductos.push(new Producto("Bolso Nude", 5200, true));

    listaProductos.push(new Producto("Mochila beige", 4500, true));

    listaProductos.push(new Producto("Mochila Croco Negro", 4700, true));

    listaProductos.push(new Producto("Riñonera Negra", 3000, false));

    listaProductos.push(new Producto("Portanotebook con manija", 3400, true));

    listaProductos.push(new Producto("Portanotebook convencional", 3000, true));

    listaProductos.push(new Producto("Mochila Silver Metalizado", 4500, true));

    listaProductos.push(new Producto("Cartuchera con glitter", 2600, false));
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

function muestraProductos(listaProductos) {

    let mensaje = "";

    for (let producto of listaProductos) {
        mensaje += producto.id + " - " + producto.nombre + "  $" + producto.precio + "\n";
    }

    return mensaje;
}



//#region INGRESA PRODUCTOS AL CARRITO

function ingresaProductosAlCarrito() {
    while (true) {
        let codigoIngresado = prompt("FUNCION SELECCIONADA:  1 - AGREGA PRODUCTOS AL CARRITO\n\nPRODUCTOS:\n" + muestraProductos(listaProductos) + "\nIngrese el ID del producto que desea comprar. En caso de no querer visualizar el carrito ingrese la palabra FIN:");

        if (validaCodigoIngresado(parseInt(codigoIngresado))) {
            const producto = listaProductos.find(x => x.id == parseInt(codigoIngresado));

            const cantidad = parseInt(solicitaCantidad(producto));

            let talle;

            if (producto.hasTalle) {
                talle = parseInt(solicitaTalle(producto, cantidad));
            } else {
                talle = 0;
            }

            agregaProductoEnCarrito(producto, compra, talle, cantidad);
        }
        else if (codigoIngresado === "FIN") {
            muestraCarrito();

            break;
        } else {
            alert("Opción no válida");
        }
    }

}

function validaCodigoIngresado(codigo) {
    return (typeof codigo == 'number' && codigo >= 1 && codigo <= 9);
}

function agregaProductoEnCarrito(producto, compra, talle, cantidad) {
    let detalleCompraRepetido;

    if (compra.listDetalleCompra != null) {
        detalleCompraRepetido = compra.listDetalleCompra.find(detalleCompra => detalleCompra.producto.id === producto.id && detalleCompra.talle === talle);

        //verifico si anteriormente se agregó el producto al carrito. En caso de repetirse, actualizo el detalle existente, 
        if (detalleCompraRepetido == null) {
            compra.listDetalleCompra.push(new DetalleCompra(producto, cantidad, talle));
        } else {
            detalleCompraRepetido.cantidad += cantidad;
        }
    }
    else {
        compra.listDetalleCompra = [new DetalleCompra(producto, cantidad, talle)];
    }


}

function solicitaCantidad(producto) {
    const mensajeCantidad = "USTED HA SELECCIONADO:\n" + producto.nombre + "\n$" + producto.precio;

    return prompt(mensajeCantidad + "\n\nIngrese cantidad:");
}

function solicitaTalle(producto, cantidad) {
    const mensajeTalle = "USTED HA SELECCIONADO:\n" + producto.nombre + "\n$" + producto.precio + "\nCantidad: " + cantidad;

    return prompt(mensajeTalle + "\n\nSeleccione un talle del 1 al 3:");
}

function muestraCarrito() {

    if (compra.getTotal() == 0) {
        alert("Usted no ha agregado ningun producto al carro de compras");
    } else {
        let mensajeCarrito = "Productos seleccionados:";

        for (let detalleCompra of compra.listDetalleCompra) {
            mensajeCarrito += "\n\n" + detalleCompra.producto.nombre + "\nCantidad: " + detalleCompra.cantidad + " ";

            if (detalleCompra.producto.hasTalle) {
                mensajeCarrito += "\nTalle: " + detalleCompra.talle;
            }

            mensajeCarrito += "\nPrecio: $" + detalleCompra.producto.precio + "\nSUBTOTAL: $" + detalleCompra.getSubtotal();
        }

        mensajeCarrito += "\n\nTOTAL: $" + compra.getTotal();

        alert(mensajeCarrito);
    }
}

//#endregion


//#region FILTRA PRODUCTOS

function filtraBusquedaProductos() {
    let opcionCategoria = prompt("FUNCION SELECCIONADA:  2 - FILTRO DE BUSQUEDA\n\nCATEGORIAS DISPONIBLES: " + muestraListaCategorias() + "\nIngrese el ID o DESCRIPCION DE LA CATEGORIA DESEADA");

    let objetoCategoria = listaCategorias.find((x) => x.nombre.toUpperCase().includes(opcionCategoria.toUpperCase()) || x.id == parseInt(opcionCategoria));

    let productoCategoria;

    if (objetoCategoria != null) {
        productoCategoria = listaProductoCategoria.find((x) => x.categoria.id == objetoCategoria.id);

        alert("CATEGORIA : " + productoCategoria.categoria.nombre + "\n\n" + muestraProductos(productoCategoria.listaProductos));
    } else {
        alert("Opción no válida");
    }
}

function muestraListaCategorias() {
    let lista = "\n ID    DESCRIPCION\n";

    for (const categoria of listaCategorias) {
        lista += categoria.id + " - " + categoria.nombre + "\n";
    }

    return lista;
}

//#endregion


//#endregion

//#region MAIN

let listDetalleCompra;

const compra = new Compra(listDetalleCompra);

generaListaProductos();

generaListaCategorias();

asignaCategoriaAProductos();

alert("¡BIENVENIDO A NUESTRO PROGRAMA!\n Actualemnte disponemos de dos funciones que simulan las acciones disponibles en un ecommerce. Pronto aplicaremos dichas funciones directamente al html sin necesidad de usar el prompt.");

while (true) {

    let opcionFuncion = parseInt(prompt("FUNCIONES DISPONIBLES:\n1 - AGREGA PRODUCTOS AL CARRITO\n2 - FILTRO DE BUSQUEDA\n3 - SALIR DEL PROGRAMA\n\nIngrese el número de opción que desea realizar:"));

    switch (opcionFuncion) {
        case 1:

            ingresaProductosAlCarrito();

            break;

        case 2:

            filtraBusquedaProductos();

            break;

        case 3:

            alert("\n¡Gracias por utilizar nuestra app!");

            break;

        default:

            alert("Ingrese una opción válida");
    }

    if (opcionFuncion == 3)
        break;
}

//#endregion


