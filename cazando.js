let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

//Poner las constantes de los objetos

const alto_Gato=75;
const ancho_Gato=50;
const alto_Comida=40;
const ancho_Comida=40;

//variable de posicion de los objetos

let gatoX=(canvas.width-ancho_Gato)/2;
let gatoY=425;
let comidaX=460;
let comidaY=460;


function iniciarJuego(){
    graficarGato();
    graficarComida();
}

//LLamar funciones 

function dibujarObjetos(){
    limpiarCanvas();
    graficarComida();
    graficarGato();
}

//DIbujo de gato 

function graficarGato(){
    graficarRectangulo(gatoX,gatoY,ancho_Gato,alto_Gato,"black");
}

//dibujo de comida del Gato

function graficarComida(){
    graficarRectangulo(comidaX,comidaY,ancho_Comida,alto_Comida,"orange")
}

//Creo una funcion para graficar rectangulos

function graficarRectangulo (x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,ancho,alto);
}

//Limpiar el canvas

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

//Mover el gato a la izquierda

function moverPersonajeIzquierda(){
    gatoX=Math.max(0,gatoX-10);
    dibujarObjetos();
}

//mover el gato a la Derecha

function moverPersonajeDerecha(){
    gatoX=Math.max(0,gatoX+10);
    dibujarObjetos();
}

//Mover gato hacia arriba

function moverPersonajeArriba(){
    gatoY=Math.max(0,gatoY-10);
    dibujarObjetos();
}

//Mover gato hacia abajo

function moverPersonajeAbajo(){
    gatoY=Math.min(canvas.height-alto_Gato,gatoY+10);
    dibujarObjetos();
}