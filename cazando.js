let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

//variable de posicion de los objetos

let gatoX=canvas.width/2;
let gatoY=425;
let comidaX=460;
let comidaY=460;

//Poner las constantes de los objetos

const alto_Gato=75;
const ancho_Gato=50;
const alto_Comida=40;
const ancho_Comida=40;


function iniciarJuego(){
    graficarGato();
    graficarComida();
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