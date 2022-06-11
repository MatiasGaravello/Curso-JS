//#region VARIABLES GLOBALES

let cantidadProductos = 0;
let productosEnCarrito;

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

//#endregion


//#region FUNCIONES

function setIdProductos(listaProductos) {
    for (let i = 0; i < 9; i++) {
        listaProductos[i].id = parseInt(i);
    }
}

function getListaProductos() {
    const p1 = new Producto("Mini-pocket", 2000, false);
    const p2 = new Producto("Cartera Total Black", 4200, true);
    const p3 = new Producto("Bandolera negra con cadena", 3000, true);
    const p4 = new Producto("Bolso Blanco", 5000, true);
    const p5 = new Producto("Mochila beige", 4500, true);
    const p6 = new Producto("Mochila Croco Negro", 4700, true);
    const p7 = new Producto("Riñonera Negra", 3000, false);
    const p8 = new Producto("Portanotebook con manija", 3400, true);
    const p9 = new Producto("Mochila Silver Metalizado", 4500, true);

    return [p1, p2, p3, p4, p5, p6, p7, p8, p9];
}

function muestraProductos(listaProductos) {
    let mensaje = "Lista de productos:\n";

    for (let producto of listaProductos) {
        mensaje += producto.id + " - " + producto.nombre + "  $" + producto.precio + "\n";
    }

    return prompt(mensaje + "\nPRESIONE CANCELAR PARA FINALIZAR LA CARGA DE PRODUCTOS\n\nIngrese el número del producto que desea agregar:");
}

function validaCodigoIngresado(codigo) {
    return (typeof codigo == 'number' && codigo >= 1 && codigo <= 9);
}

function validaTalle(talle) {

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

//#region MAIN

let listDetalleCompra;
const compra = new Compra(listDetalleCompra);
let listaProductos = getListaProductos();


while (true) {
    let codigoIngresado = parseInt(muestraProductos(listaProductos));

    if (validaCodigoIngresado(codigoIngresado)) {
        const producto = listaProductos.find(x => x.id == codigoIngresado);

        const cantidad = parseInt(solicitaCantidad(producto));

        let talle;

        if (producto.hasTalle) {
            talle = parseInt(solicitaTalle(producto, cantidad));
        } else {
            talle = 0;
        }

        agregaProductoEnCarrito(producto, compra, talle, cantidad);
    }
    else {
        muestraCarrito();

        alert("\n¡Gracias por utilizar nuestra app!")

        break;
    }
}

//#endregion


