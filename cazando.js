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
ctx.fillStyle="black";
ctx.fillRect(gatoX,gatoY, ancho_Gato, alto_Gato);
}

//dibujo de comida del Gato

function graficarComida(){
    ctx.fillStyle="orange";
    ctx.fillRect(comidaX, comidaY, ancho_Comida, alto_Comida); 
}