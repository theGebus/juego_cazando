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

//Variables Puntaje y tiempo

let puntaje=0;


function iniciarJuego(){
    comidaRandom();
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
    detectarColision(); 
}

//mover el gato a la Derecha

function moverPersonajeDerecha(){
    gatoX=Math.min(canvas.width-ancho_Gato,gatoX+10);
    dibujarObjetos();
    detectarColision(); 
}

//Mover gato hacia arriba

function moverPersonajeArriba(){
    gatoY=Math.max(0,gatoY-10);
    dibujarObjetos();
    detectarColision(); 
}

//Mover gato hacia abajo

function moverPersonajeAbajo(){
    gatoY=Math.min(canvas.height-alto_Gato,gatoY+10);
    dibujarObjetos();
    detectarColision();  
}

//Deatectar colision

function detectarColision(){
    if(gatoX + ancho_Gato >= comidaX &&
        gatoX <= comidaX+ancho_Comida &&
        gatoY + alto_Gato >= comidaY &&
        gatoY <= comidaY+alto_Comida
    ){
        comidaRandom();
        puntaje=puntaje+1;
        mostrarEnSpan("puntos",puntaje)
    }
}

//Poner comida en random

function comidaRandom(){
    comidaX = generarAleatorio(0,canvas.width-ancho_Comida)
    comidaY = generarAleatorio(0,canvas.height-alto_Comida)
    dibujarObjetos();
}

    