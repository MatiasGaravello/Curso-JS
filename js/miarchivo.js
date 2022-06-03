let cantidadProductos = 0;

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = ++cantidadProductos;
    }
}

function setIdProductos(listaProductos) {
    for (var i = 0; i < 9; i++) {
        listaProductos[i].id = parseInt(i);
    }
}

function getListaProductos() {
    const p1 = new Producto("Mini-pocket", 2000);
    const p2 = new Producto("Cartera Total Black", 4200);
    const p3 = new Producto("Bandolera negra con cadena", 3000);
    const p4 = new Producto("Bolso Blanco", 5000);
    const p5 = new Producto("Mochila beige", 4500);
    const p6 = new Producto("Mochila Croco Negro", 4700);
    const p7 = new Producto("Riñonera Negra", 3000);
    const p8 = new Producto("Portanotebook con manija", 3400);
    const p9 = new Producto("Mochila Silver Metalizado", 4500);

    return [p1, p2, p3, p4, p5, p6, p7, p8, p9];
}

function muestraProductos() {
    let listaProductos = getListaProductos();

    let mensaje = "Lista de productos:\n";
    
    for (let producto of listaProductos) {
        mensaje += producto.id + " - " + producto.nombre + "  $" + producto.precio + "\n";
    }

    prompt(mensaje);
}

muestraProductos();