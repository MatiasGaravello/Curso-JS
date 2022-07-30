const validaEmail = (email) => {

}

const validaPassword = (password) => {

}

const validaCampo = (inputControl) => {
    // let campoValido = true

    // let mensajeError

    const contenidoInput = inputControl.value
    if (inputControl.required) {
        switch (inputControl.type) {
            case "password":
                const claveValida = contenidoInput.length >= 6

                claveValida ? inputControl.setCustomValidity("") : inputControl.setCustomValidity("La contraseña de tener como mínimo 6 caracteres")

                inputControl.reportValidity()

                return claveValida
        }
    }

    if (!inputControl.checkValidity()) {
        inputControl.reportValidity()

        return false
    }

    return true
}

const validaSexo = () => {
    const conetenedorRdbSexo = document.getElementById("contenedor-rdb-sexo")

    const radiobuttonSexo = document.querySelector("input:checked")

    const validaSexo = radiobuttonSexo != null

    validaSexo ? conetenedorRdbSexo.setCustomValidity("") : (conetenedorRdbSexo.setCustomValidity("La contraseña de tener como mínimo 6 caracteres"))

    return validaSexo
}


const loginUser = () => {
    if (validaCampo(document.getElementById("userMail"))) {
        if (validaCampo(document.getElementById("userPassword"))) {
            Swal.fire({
                icon: 'success',
                title: 'Login success',
                showConfirmButton: false,
                timer: 1700
            }).then(() => {
                window.open("../index.html", "_self");
            })
        }
    }
}

const createUser = () => {
    if (validaCampo(document.getElementById("floatingNombre"))) {
        if (validaCampo(document.getElementById("floatingApellido"))) {
            if (validaCampo(document.getElementById("floatingMail"))) {
                if (validaCampo(document.getElementById("floatingPhone"))) {
                    if (validaSexo()) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario creado correctamente',
                            showConfirmButton: false,
                            timer: 1700
                        }).then(() => {
                            const inputs = document.querySelectorAll('#floatingNombre, #floatingApellido, #floatingMail, #floatingPhone')

                            inputs.forEach(input => {
                                input.value = ""
                            });
                        })
                    }

                }
            }
        }
    }
}

document.getElementById("btnLogin").onclick = (event) => {
    event.preventDefault()
    loginUser()
}

document.getElementById("btnEnviar").onclick = (event) => {
    event.preventDefault()
    createUser()
}


