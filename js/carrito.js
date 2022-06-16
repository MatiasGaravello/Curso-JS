let listDetalleCompra = [];
const compra = new Compra(listDetalleCompra);

function muestraProductos(listaProductos) {

    let mensaje = "";

    for (let producto of listaProductos) {
        mensaje += producto.id + " - " + producto.nombre + "  $" + producto.precio + "\n";
    }

    return mensaje;
}

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

    detalleCompraRepetido = compra.listDetalleCompra.find(detalleCompra => detalleCompra.producto.id === producto.id && detalleCompra.talle === talle);

    //verifico si anteriormente se agregó el producto al carrito. En caso de repetirse, actualizo el detalle existente, 
    if (detalleCompraRepetido == null) {
        compra.listDetalleCompra.push(new DetalleCompra(producto, cantidad, talle));
    } else {
        detalleCompraRepetido.cantidad += cantidad;
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


//#region  MAIN

ingresaProductosAlCarrito()

//#endregion
