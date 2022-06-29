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

            const leyendaTalle = detalleCompra.talle == 0 ?  `Talle: Único` : `Talle: ${detalleCompra.talle}`;
            // let leyendaTalle = `Talle: ${detalleCompra.talle}`;

            // if (detalleCompra.talle == 0) {
            //     leyendaTalle = `Talle: Único`;
            // }

            const subtotalDetalle = getSubtotalDetalle(detalleCompra);

            tbodyDesktop.innerHTML +=
                `<tr>
                    <td>
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

        pEnvio.innerText = `Envío $${costoEnvio}`;
        h4Total.innerText = `TOTAL $${getTotal() + costoEnvio}`;

        pEnvioMobile.innerText =`$${costoEnvio}`;
        pTotalMobile.innerText = `$${getTotal() + costoEnvio}`;
    }
}

function getTotal(){
    let total = 0;

    for (let detalleCompra of carrito.listDetalleCompra) {
        total += getSubtotalDetalle(detalleCompra);
    }

    return total;
}

// function getSubtotalDetalle(detalleCompra){
//     return detalleCompra.producto.precio * detalleCompra.cantidad;
// }

function getSubtotalDetalle({producto:{precio}, cantidad}){
    return precio * cantidad;
}

//#region  MAIN

muestraCarrito();

//#endregion
