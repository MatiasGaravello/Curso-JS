

//#region  CLASES



//#endregion


//#region FUNCIONES









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

//#region CREA CONTROLES



//#endregion


//#endregion

//#region MAIN



// alert("¡BIENVENIDO A NUESTRO PROGRAMA!\n Actualemnte disponemos de dos funciones que simulan las acciones disponibles en un ecommerce. Pronto aplicaremos dichas funciones directamente al html sin necesidad de usar el prompt.");

// while (true) {

//     let opcionFuncion = parseInt(prompt("FUNCIONES DISPONIBLES:\n1 - AGREGA PRODUCTOS AL CARRITO\n2 - FILTRO DE BUSQUEDA\n3 - SALIR DEL PROGRAMA\n\nIngrese el número de opción que desea realizar:"));

//     switch (opcionFuncion) {
//         case 1:

//             ingresaProductosAlCarrito();

//             break;

//         case 2:

//             filtraBusquedaProductos();

//             break;

//         case 3:

//             alert("\n¡Gracias por utilizar nuestra app!");

//             break;

//         default:

//             alert("Ingrese una opción válida");
//     }

//     if (opcionFuncion == 3)
//         break;
// }




//#endregion


