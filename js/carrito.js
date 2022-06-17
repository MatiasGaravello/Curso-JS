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
        let codigoIngresado = prompt("FUNCION SELECCIONADA:  1 - AGREGA PRODUCTOS AL CARRITO\n\nPRODUCTOS:\n" + muestraProductos(listaProductos) + "\nIngrese el ID del producto que desea comprar. En caso de no querer ingresar más productos y visualizar el carrito ingrese la palabra FIN:");

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

    } else {
        let tbodyDesktop = document.querySelector("tbody");
        let divContenedorMobile = document.getElementById("productosCarritoMobile");
        tbodyDesktop.innerHTML = "";
        divContenedorMobile.innerHTML = "";

        for (let detalleCompra of compra.listDetalleCompra) {

            let leyendaTalle = `Talle: ${detalleCompra.talle}`;

            if (detalleCompra.talle == 0) {
                leyendaTalle = `Talle: Único`;
            }

            tbodyDesktop.innerHTML +=
                `<tr>
                    <td>
                        <img src=${detalleCompra.producto.pathImagen} alt=${detalleCompra.producto.nombre} class="img-fluid">
                    </td>
                    <td>
                        <p>${detalleCompra.producto.nombre}</p>
                        <p>${leyendaTalle}</p>
                    </td>
                    <td class="text-center">
                        <h4>$${detalleCompra.producto.precio}</h4>
                    </td>
                    <td class="text-center">
                        <h5>${detalleCompra.cantidad}</h5>
                    </td>
                    <td class="text-center">
                        <h4>$${detalleCompra.getSubtotal()}</h4>
                    </td>
                    <td>
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="13px"> -->
                                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                            </svg>
                        </a>
                    </td>
                </tr>`;

            divContenedorMobile.innerHTML += 
                `<div class="card mb-4 text-center">
                    <div class="row row-cols-3 align-items-center">
                        <div class="col h-100">
                            <img src=${detalleCompra.producto.pathImagen} alt=${detalleCompra.producto.nombre} class="img-fluid">
                        </div>

                        <div class="col d-flex flex-column p-1">
                            <p class="card-title fw-bold">${detalleCompra.producto.nombre}</p>
                            <p class="card-text">${leyendaTalle}</p>
                            <p class="card-text">Cantidad: ${detalleCompra.cantidad}</p>
                            <p class="card-text fw-bold">Precio: $${detalleCompra.producto.precio}</p>
                        </div>
                        <div class="col">
                            <p class="text-uppercase m-0 fw-bold">Subtotal:</p>
                            <p class="fw-bold">$${detalleCompra.getSubtotal()}</p>
                            <a class="d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="13px"> -->
                                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                    <path
                                        d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                </svg>
                                <p class="m-0 ps-1">Eliminar</p>
                            </a>
                        </div>
                    </div>
                </div>`;


        }

        const pEnvio = document.getElementById("envio");
        const h4Total = document.getElementById("total");
        
        const pEnvioMobile = document.getElementById("envioMobile");
        const pTotalMobile = document.getElementById("totalMobile");

        const costoEnvio = 1000;

        pEnvio.innerText = `Envío $${costoEnvio}`;// "Envío $1000";
        h4Total.innerText = `TOTAL $${compra.getTotal() + costoEnvio}`;

        pEnvioMobile.innerText =`$${costoEnvio}`;
        pTotalMobile.innerText = `$${compra.getTotal() + costoEnvio}`;
    }
}


//#region  MAIN

ingresaProductosAlCarrito()

//#endregion
