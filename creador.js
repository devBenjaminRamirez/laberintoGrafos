
var matriz=[];

function datos() {

    var height = parseInt(document.getElementById("height").value);
    var width = parseInt(document.getElementById("width").value);

    crearLaberinto(height,width);

    document.getElementById('out').innerHTML = matriz.join('\n');
}

function crearLaberinto(x,y){

    for(var i=0; i<x; i++){
        matriz[i] = [];

        for(var j=0; j<y; j++){
            matriz[i][j] = Math.floor(Math.random()*2);
        }
    }
    //falta agregar condicionales para que el laberinto tenga solucion siempre
    //posiblemente que tenga mas de 1 vecino cercano, es decir dentro de los 8 lugares circundantes.
}

function mostrarLaberinto(x, y){

    //esta funcion deberia mostrarlo mas "bonito", dejando espacios en blanco para los 1's y con X para los 0's.

}

function resolverLaberinto(x, y){

}