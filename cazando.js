// 1. Canvas: aquí dibujamos el juego.
const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// 2. Cambia estos valores para ajustar tamaños y dificultad.
const ancho_Gato = 60;
const alto_Gato = 60;
const ancho_Comida = 32;
const alto_Comida = 24;
const paso = 20; // Píxeles que avanza por movimiento.
const tiempoInicial = 10;
const puntosParaGanar = 6;

let gatoX = (canvas.width - ancho_Gato) / 2;
let gatoY = canvas.height - alto_Gato;
let comidaX = 0;
let comidaY = 0;
let puntaje = 0;
let tiempo = tiempoInicial;
let limpiarTiempo;
let jugando = false; // true: puede moverse; false: partida detenida.

// 3. Iniciar también sirve para empezar otra partida desde cero.
function iniciarJuego() {
    clearInterval(limpiarTiempo); // Evita tener dos relojes a la vez.
    puntaje = 0;
    tiempo = tiempoInicial;
    gatoX = (canvas.width - ancho_Gato) / 2;
    gatoY = canvas.height - alto_Gato;
    jugando = true;
    mostrarEnSpan("puntos", puntaje);
    mostrarEnSpan("tiempo", tiempo);
    mostrarEnSpan("mensaje", "Atrapa " + puntosParaGanar + " peces. ¡Vamos!");
    comidaRandom();
    dibujarObjetos();
    limpiarTiempo = setInterval(restarTiempo, 1000);
}

// 4. Primero borramos y después volvemos a dibujar.
function dibujarObjetos() {
    limpiarCanvas();
    graficarComida();
    graficarGato();
}

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Un gato estilo píxel, construido con rectángulos.
function graficarGato() {
    // Cada dibujo usa 10 columnas y 10 filas imaginarias.
    // Así todas sus partes cambian de tamaño junto con el gato.
    let u = ancho_Gato / 10;
    let v = alto_Gato / 10;
    graficarRectangulo(gatoX + u, gatoY, 2*u, 3*v, "#193c34"); // Oreja.
    graficarRectangulo(gatoX + 7*u, gatoY, 2*u, 3*v, "#193c34");
    graficarRectangulo(gatoX, gatoY + 2*v, 10*u, 5*v, "#193c34"); // Cabeza.
    graficarRectangulo(gatoX + 2*u, gatoY + 7*v, 6*u, 3*v, "#193c34"); // Cuerpo.
    graficarRectangulo(gatoX + 2*u, gatoY + 4*v, 2*u, v, "#edf1dc"); // Ojos.
    graficarRectangulo(gatoX + 6*u, gatoY + 4*v, 2*u, v, "#edf1dc");
    graficarRectangulo(gatoX + 4*u, gatoY + 6*v, 2*u, v, "#ed9867"); // Nariz.
}

function graficarComida() {
    let u = ancho_Comida / 8;
    let v = alto_Comida / 6;
    graficarRectangulo(comidaX, comidaY, 2*u, 6*v, "#bd6338"); // Cola.
    graficarRectangulo(comidaX + 2*u, comidaY + v, 6*u, 4*v, "#d87740"); // Pez.
    graficarRectangulo(comidaX + 6*u, comidaY + 2*v, u, v, "#193c34"); // Ojo.
}

// 5. Las cuatro funciones comparten los límites y la colisión.
function moverPersonajeIzquierda() {
    moverGato(-paso, 0);
}
function moverPersonajeDerecha() {
    moverGato(paso, 0);
}
function moverPersonajeArriba() {
    moverGato(0, -paso);
}
function moverPersonajeAbajo() {
    moverGato(0, paso);
}

function moverGato(cambioX, cambioY) {
    if (jugando === false) {
        return; // Sale de la función cuando la partida está detenida.
    }
    gatoX = gatoX + cambioX;
    gatoY = gatoY + cambioY;

    // Restamos el tamaño para que el gato completo quede dentro.
    if (gatoX < 0) { gatoX = 0; }
    if (gatoY < 0) { gatoY = 0; }
    if (gatoX > canvas.width - ancho_Gato) {
        gatoX = canvas.width - ancho_Gato;
    }
    if (gatoY > canvas.height - alto_Gato) {
        gatoY = canvas.height - alto_Gato;
    }
    detectarColision();
    dibujarObjetos();
}

// 6. Devuelve true si los rectángulos del gato y la comida se cruzan.
function tocaComida() {
    return gatoX + ancho_Gato > comidaX && // Derecha del gato.
           gatoX < comidaX + ancho_Comida && // Izquierda del gato.
           gatoY + alto_Gato > comidaY && // Abajo del gato.
           gatoY < comidaY + alto_Comida; // Arriba del gato.
}

function detectarColision() {
    if (tocaComida()) {
        puntaje = puntaje + 1;
        mostrarEnSpan("puntos", puntaje);
        if (puntaje >= puntosParaGanar) {
            terminarJuego("¡Ganaste! Atrapaste todos los peces.");
        } else {
            comidaRandom();
        }
    }
}

function comidaRandom() {
    comidaX = generarAleatorio(0, canvas.width - ancho_Comida);
    comidaY = generarAleatorio(0, canvas.height - alto_Comida);
    // Si aparece encima del gato, la colocamos en la esquina opuesta.
    if (tocaComida()) {
        if (gatoX < canvas.width / 2) {
            comidaX = canvas.width - ancho_Comida;
        } else {
            comidaX = 0;
        }
    }
}

// 7. setInterval llama esta función cada 1000 ms (un segundo).
function restarTiempo() {
    if (jugando === false) { return; }
    tiempo = tiempo - 1;
    mostrarEnSpan("tiempo", tiempo);
    if (tiempo <= 0) {
        terminarJuego("¡Se acabó el tiempo! Conseguiste " + puntaje + " puntos.");
    }
}

function terminarJuego(mensaje) {
    jugando = false;
    clearInterval(limpiarTiempo);
    mostrarEnSpan("mensaje", mensaje);
}

function reiniciarJuego() {
    iniciarJuego();
}

function desaparecerPersonaje() {
    terminarJuego("Tablero limpio. Pulsa Volver a jugar para comenzar.");
    limpiarCanvas();
}

// 8. También puedes usar las flechas del teclado.
document.addEventListener("keydown", function(evento) {
    if (evento.key === "ArrowLeft") {
        evento.preventDefault(); // Evita desplazar la página con la flecha.
        moverPersonajeIzquierda();
    } else if (evento.key === "ArrowRight") {
        evento.preventDefault();
        moverPersonajeDerecha();
    } else if (evento.key === "ArrowUp") {
        evento.preventDefault();
        moverPersonajeArriba();
    } else if (evento.key === "ArrowDown") {
        evento.preventDefault();
        moverPersonajeAbajo();
    }
});
