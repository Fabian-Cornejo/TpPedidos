let valorTotal = 0;

function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 3) + 1;
}

function generarValorTotal() {
    const valoresPosibles = [];
    for (let i = 2000; i <= 10000; i += 500) {
        valoresPosibles.push(i);
    }
    const indiceAleatorio = Math.floor(Math.random() * valoresPosibles.length);
    return valoresPosibles[indiceAleatorio];
}

function generarNumeroPedido() {
    return Math.floor(Math.random() * (1500 - 200 + 1)) + 200;
}

function obtenerBilleteraVirtual() {
    const numeroAleatorio = Math.floor(Math.random() * 5) + 1;

    switch (numeroAleatorio) {
        case 1:
            return "Mercado Pago";
        case 2:
            return "Uala";
        case 3:
            return "Naranja X";
        case 4:
            return "Cuenta DNI";
        case 5:
            return "Brubank";
        default:
            return "Desconocida";
    }
}

function obtenerDatosTarjeta() {
    const tipoTarjeta = Math.floor(Math.random() * 2) + 1;
    const tarjeta = tipoTarjeta === 1 ? "Visa" : "Mastercard";

    const tipoCuenta = Math.floor(Math.random() * 2) + 1;
    const cuenta = tipoCuenta === 1 ? "Débito" : "Crédito";

    return `${tarjeta} - ${cuenta}`;
}

async function mostrarOpciones(numero) {
    let metodoPago = "";
    let mensajePago = "";
    let pagoCliente = 0;
    let vuelto = 0;

    document.getElementById("mensajeMetodoPago").textContent = "Esperando pago...";
    document.getElementById("mensajeMetodoPago").classList.remove("oculto");

    setTimeout(async () => {
        if (numero === 1) {
            metodoPago = "efectivo";
            pagoCliente = generarPagoEfectivo();
            if (pagoCliente > valorTotal) {
                vuelto = pagoCliente - valorTotal;
                mensajePago = `Monto pagado: $${pagoCliente}. Vuelto: $${vuelto}.`;
            } else {
                mensajePago = `Monto pagado: $${pagoCliente}. No se requiere vuelto.`;
            }
        } else if (numero === 2) {
            metodoPago = "tarjeta";
            const datosTarjeta = obtenerDatosTarjeta();
            mensajePago = `Pago procesado con tarjeta ${datosTarjeta}.`;
        } else if (numero === 3) {
            metodoPago = "billetera virtual";
            const nombreBilletera = obtenerBilleteraVirtual();
            mensajePago = `Pago procesado a través de <strong>${nombreBilletera}</strong>.`;
        } else {
            console.error("Error inesperado: Fin del programa.");
            return;
        }

        document.getElementById("mensajeMetodoPago").textContent = `El cliente pagó con ${metodoPago}.`;

        setTimeout(() => {
            document.getElementById("mensajeResultadoPago").innerHTML = mensajePago;
            document.getElementById("mensajeResultadoPago").classList.remove("oculto");
        }, 2000);
    }, 1000);
}

function generarPagoEfectivo() {
    const pagoExcesivo = Math.random() < 0.5;
    if (pagoExcesivo) {
        return Math.floor((valorTotal + 500) / 500) * 500;
    }
    return valorTotal;
}

function procesarPago() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const pagoExitoso = Math.random() < 0.5;
            resolve(pagoExitoso ? "Pago recibido exitosamente." : "El pago no se ha recibido.");
        }, 2000);
    });
}

function mostrarTicket() {
    valorTotal = generarValorTotal();
    const numeroPedido = generarNumeroPedido();
    document.getElementById("valorTotal").textContent = valorTotal;
    document.getElementById("numeroPedido").textContent = numeroPedido;

    document.getElementById("ticket").classList.remove("oculto");

    const numeroAleatorio = generarNumeroAleatorio();
    mostrarOpciones(numeroAleatorio);
}

function generarTicket() {
    document.getElementById("mensajeMetodoPago").classList.add("oculto");
    document.getElementById("mensajeResultadoPago").classList.add("oculto");
    document.getElementById("ticket").classList.add("oculto");
    setTimeout(() => {
        mostrarTicket();
    }, 1000);
}