class Producto {
    constructor(nombre, precio, hasTalle, pathImagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = ++cantidadProductos;
        this.hasTalle = hasTalle;
        this.pathImagen = pathImagen;
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

