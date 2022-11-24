
var matriz=[];
const valor = 64;

function datos() {

    matriz = [];
    var height = parseInt(document.getElementById("height").value);
    var width = parseInt(document.getElementById("width").value);

    crearLaberinto(height,width);

    document.getElementById('out').innerHTML = matriz.join('\n');
}

function crearLaberinto(x,y){

    for(var i=0; i<=x; i++){
        matriz[i] = [];

        for(var j=0; j<=y; j++){
            matriz[0][0] = ' ';
            if(i==0){
                matriz[i][j]= String.fromCharCode(valor+j);
            }
            else if(j==0){
                matriz[i][j]= String.fromCharCode(valor+i);
            }
            else if(i==j){
                matriz[i][j]=0;
            }
            else{
                matriz[i][j] = Math.floor(Math.random()*2);
            }
        }
    }
    //falta agregar condicionales para que el laberinto tenga solucion siempre
    //posiblemente que tenga mas de 1 vecino cercano, es decir dentro de los 8 lugares circundantes.
}

function mostrarLaberinto(x, y){

    //esta funcion deberia mostrarlo mas "bonito", dejando espacios en blanco para los 1's y con X para los 0's.

}

function resolverLaberinto(x, y){

    // usar dickstra
}

function mostrarLaberintoResuelto(){

}