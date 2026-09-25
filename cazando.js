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
let tiempo=10;

//Variable restar tiempo

let resTiempo=1000;
let limpiarTiempo;


function iniciarJuego(){
    clearInterval(limpiarTiempo)
    mostrarEnSpan("tiempo",tiempo)
    comidaRandom();
    limpiarTiempo=setInterval(restarTiempo,resTiempo)
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
    if(tiempo <= 0 || puntaje >= 6){
    return;}
    gatoX=Math.max(0,gatoX-10);
    dibujarObjetos();
    detectarColision(); 
}

//mover el gato a la Derecha

function moverPersonajeDerecha(){
    if(tiempo <= 0 || puntaje >= 6){
    return;}
    gatoX=Math.min(canvas.width-ancho_Gato,gatoX+10);
    dibujarObjetos();
    detectarColision(); 
}

//Mover gato hacia arriba

function moverPersonajeArriba(){
    if(tiempo <= 0 || puntaje >= 6){
    return;}
    gatoY=Math.max(0,gatoY-10);
    dibujarObjetos();
    detectarColision(); 
}

//Mover gato hacia abajo

function moverPersonajeAbajo(){
    if(tiempo <= 0 || puntaje >= 6){
    return;}
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
        if(puntaje===6){
            clearInterval(limpiarTiempo);
            alert("Ganaste!!")
        }
    }
}

//Poner comida en random

function comidaRandom(){
    comidaX = generarAleatorio(0,canvas.width-ancho_Comida)
    comidaY = generarAleatorio(0,canvas.height-alto_Comida)
    dibujarObjetos();
}

//Restar Tiempo

function restarTiempo(){
    tiempo=tiempo-1;
    mostrarEnSpan("tiempo",tiempo)
    if(tiempo===0){
    clearInterval(limpiarTiempo)
        alert("Perdiste :( !!")
    }
}

//Reiniciar

function reiniciarJuego(){
    tiempo=10;
    mostrarEnSpan("tiempo",tiempo);

    puntaje=0;
    mostrarEnSpan("puntos",puntaje);

    gatoX = (canvas.width - ancho_Gato) / 2;
    gatoY = canvas.height - alto_Gato;

    iniciarJuego();
}


    