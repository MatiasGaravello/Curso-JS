let total = 0;

const costoEnvio = 1000;

function muestraCarrito() {
    if (getTotal() == 0) {

    } else {
        let tbodyDesktop = document.querySelector("tbody");
        let divContenedorMobile = document.getElementById("productosCarritoMobile");
        tbodyDesktop.innerHTML = "";
        divContenedorMobile.innerHTML = "";


        for (let detalleCompra of carrito.listDetalleCompra) {

            const leyendaTalle = detalleCompra.talle == "" ? `Talle: Único` : `Talle: ${detalleCompra.talle}`;
            // let leyendaTalle = `Talle: ${detalleCompra.talle}`;

            // if (detalleCompra.talle == 0) {
            //     leyendaTalle = `Talle: Único`;
            // }

            const subtotalDetalle = getSubtotalDetalle(detalleCompra);

            const btnEliminar = document.createElement("button");

            btnEliminar.classList.add("border-0");

            btnEliminar.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="13px"> -->
                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                        d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>`;

            const contenedorProductoDesktop = document.createElement("tr");

            contenedorProductoDesktop.innerHTML =
                `<td>
                    <img src=${detalleCompra.producto.listPathImagen[0]} alt=${detalleCompra.producto.nombre} class="img-fluid">
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
                    <h4>$${subtotalDetalle}</h4>
                </td>
                <td>
                </td>`;

            contenedorProductoDesktop.lastChild.appendChild(btnEliminar);

            tbodyDesktop.appendChild(contenedorProductoDesktop);

            btnEliminar.onclick = () => { muestraConfirmacionEliminarProducto(detalleCompra, leyendaTalle) };

            const divTarjetaMobile = document.createElement("div");

            divTarjetaMobile.className = "card mb-4 text-center";

            divTarjetaMobile.innerHTML =
                `<div class="row row-cols-3 align-items-center">
                    <div class="col h-100">
                        <img src=${detalleCompra.producto.listPathImagen[0]} alt=${detalleCompra.producto.nombre} class="img-fluid">
                    </div>

                    <div class="col d-flex flex-column p-1">
                        <p class="card-title fw-bold">${detalleCompra.producto.nombre}</p>
                        <p class="card-text">${leyendaTalle}</p>
                        <p class="card-text">Cantidad: ${detalleCompra.cantidad}</p>
                        <p class="card-text fw-bold">Precio: $${detalleCompra.producto.precio}</p>
                    </div>
                    <div class="col">
                        <p class="text-uppercase m-0 fw-bold">Subtotal:</p>
                        <p class="fw-bold">$${subtotalDetalle}</p>
                    </div>
                </div>`;

            const btnEliminarMobile = document.createElement("a");
            btnEliminarMobile.className = "d-flex justify-content-center";
            btnEliminarMobile.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="13px"> -->
                    <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                        d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
                <p class="m-0 ps-1">Eliminar</p>`;

            btnEliminarMobile.onclick = () => { muestraConfirmacionEliminarProducto(detalleCompra, leyendaTalle) };

            divTarjetaMobile.querySelector("div .col:last-child").appendChild(btnEliminarMobile);

            divContenedorMobile.appendChild(divTarjetaMobile);
        }

        const pEnvio = document.getElementById("envio");
        const h4Total = document.getElementById("total");

        const pEnvioMobile = document.getElementById("envioMobile");
        const pTotalMobile = document.getElementById("totalMobile");

        pEnvio.innerText = `Envío $${costoEnvio}`;
        h4Total.innerText = `TOTAL $${getTotal() + costoEnvio}`;

        pEnvioMobile.innerText = `$${costoEnvio}`;
        pTotalMobile.innerText = `$${getTotal() + costoEnvio}`;
    }
}

function getTotal() {
    let total = 0;

    for (let detalleCompra of carrito.listDetalleCompra) {
        total += getSubtotalDetalle(detalleCompra);
    }

    return total;
}

// function getSubtotalDetalle(detalleCompra){
//     return detalleCompra.producto.precio * detalleCompra.cantidad;
// }

function getSubtotalDetalle({ producto: { precio }, cantidad }) {
    return precio * cantidad;
}

function muestraConfirmacionEliminarProducto(detalleCompra, leyendaTalle) {
    Swal.fire({
        title: 'Seguro que deseas eliminar este producto?',
        text: `${detalleCompra.producto.nombre} Cantidad:${detalleCompra.cantidad} ${leyendaTalle}`,
        icon: 'warning',
        imageUrl: `${detalleCompra.producto.listPathImagen[0]}`,
        imageWidth: 200,
        imageHeight: 220,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.listDetalleCompra.splice(carrito.listDetalleCompra.indexOf(detalleCompra), 1);

            guardaCarritoEnLS();

            Swal.fire(
                'Producto eliminado del carrito!',
            ).then((result) => {
                document.location.reload();
            })


        }
    })
}

//#region  MAIN

muestraCarrito();


//#endregion
