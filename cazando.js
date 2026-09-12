let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

function llamarFunciones(){
    graficarGato();
}

function graficarGato(){

ctx.fillStyle="black";
ctx.fillRect(canvas.width/2, 50, 75, 50);
}