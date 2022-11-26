
var matriz=[];
const valor=64;

function datos() {
    matriz = [];
    var alto = parseInt(document.getElementById("altura").value);
    var ancho = parseInt(document.getElementById("ancho").value);

    crearLaberinto(alto,ancho);

    document.getElementById('out').innerHTML = matriz.join('\n');
}

function crearLaberinto(x,y){

    //opcion 2
    var celda = []; //posible uso de objetos

    for(var i=0; i<x; i++){
        celda[i]= [];

        for(var j=0; j<y; j++){
            celda[i][j] = new Object();

            celda[i][j].anarr = 0;
            celda[i][j].ander = 0;
            celda[i][j].anaba = 0;
            celda[i][j].anizq = 0;
        }
    }
            /*
            Elementos del objeto
            -arr: revisa si arriba entra o sale
            -aba: abajo
            -der: derecha
            -izq: izquierda
            -anizq: analisis izquierda, si ya existe una conexion determinada anterior, se duplica.
            -ander: lo mismo para la derecha
            -anarr: lo mismo para arriba
            -anaba: lo mismo para abajo
            */
    for(var i=0; i<x; i++){
        
        for(var j=0; j<y; j++){
            if(i==0 && j==0){
                celda[i][j].arr = 0;
                celda[i][j].der = Math.floor(Math.random()*2);
                if(celda[i][j+1].anizq != 1){
                    celda[i][j+1].izq = celda[i][j].der;
                }
                celda[i][j].aba = Math.floor(Math.random()*2);
                celda[i][j].izq = 0;
            }
            else if(j==0 && i!=0){
                celda[i][j].arr = Math.floor(Math.random()*2);
                celda[i][j].der = Math.floor(Math.random()*2);
                celda[i][j].aba = Math.floor(Math.random()*2);
                celda[i][j].izq = 0;  
            }
            else if(i==0 && j!=0){
                celda[i][j].arr = 0;
                celda[i][j].der = Math.floor(Math.random()*2);
                celda[i][j].aba = Math.floor(Math.random()*2);
                celda[i][j].izq = Math.floor(Math.random()*2);
            }
            else if(i==x-1 && j!=0){
                celda[i][j].arr = Math.floor(Math.random()*2);
                celda[i][j].der = Math.floor(Math.random()*2);
                celda[i][j].aba = 0;
                celda[i][j].izq = Math.floor(Math.random()*2); 
            }
            else if(j==y-1 && i!=0){
                celda[i][j].arr = Math.floor(Math.random()*2);
                celda[i][j].der = 0;
                celda[i][j].aba = Math.floor(Math.random()*2);
                celda[i][j].izq = Math.floor(Math.random()*2); 
            }
            else{
                celda[i][j].arr = Math.floor(Math.random()*2);
                celda[i][j].der = Math.floor(Math.random()*2);
                celda[i][j].aba = Math.floor(Math.random()*2);
                celda[i][j].izq = Math.floor(Math.random()*2);
            }
        }
    }

    //opcion 1

    for(var i=0; i<=x; i++){
        matriz[i] = [];

        for(var j=0; j<=y; j++){
            matriz[0][0] = " ";
            if(i==0){
                matriz[i][j] = String.fromCharCode(valor+j);
            }
            else if(j==0){
                matriz[i][j] = String.fromCharCode(valor+i);
            }
            else if(i==j){
                matriz[i][j]="x";
            }

            if(matriz[i][j]==null) {
                matriz[i][j] = Math.floor(Math.random()*2);
            }
        }
    }
    for(var i=0; i<=x; i++) {
        for(var j=0; j<=y; j++) {
            if(i!=j && i>0 && j>0) {
                if(typeof matriz[i][j]==1 && matriz[j][i]!= null) {
                    matriz[j][i] = 1;
                }
                else if(typeof matriz[i][j]==0 && matriz[j][i]!= null) {
                    matriz[j][i] = 0;
                }
            }

        }
    }
    //falta agregar condicionales para que el laberinto tenga solucion siempre
    //posiblemente que tenga mas de 1 vecino cercano, es decir dentro de los 4 lugares circundantes.
}

function draw() {
    var y = parseInt(document.getElementById("altura").value);
    var x = parseInt(document.getElementById("ancho").value);

    const canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        const ctx = canvas.getContext('2d');

        /*var k=300/x;
        for(var i=0;i<x;i++) {
            var largo=i*(300/x);
            for(var j=0;j<y;j++) {
                var alto=j*(300/y);
                ctx.beginPath();
                ctx.moveTo(largo,alto);
                ctx.lineTo(largo+(300/x),alto);
                ctx.lineTo(largo+(300/x),alto+(300/y));
                ctx.lineTo(largo,alto+(300/y));
                ctx.lineTo(largo,alto);
                ctx.stroke();
            }
        }*/


        var entrada = 0 + Math.floor(Math.random()*x);
        var salida = 0 + Math.floor(Math.random()*x);
        var k=300/x;
        for(var i=0;i<x;i++) {
            var largo=i*(300/x);
            for(var j=0;j<y;j++) {
                var alto=j*(300/y);
                if(i == entrada && j == 0) { //crea la entrada
                    ctx.beginPath();
                    ctx.moveTo(largo,alto);
                    ctx.lineTo(largo,alto+(300/y));
                    ctx.lineTo(largo+(300/x),alto+(300/y));
                    ctx.lineTo(largo+(300/x),alto);
                    ctx.stroke();
                }
                else if(i == salida && j == y-1) { //crea la saldia
                    ctx.beginPath();
                    ctx.moveTo(largo,alto);
                    ctx.lineTo(largo,alto+(300/y));
                    ctx.moveTo(largo,alto);
                    ctx.lineTo(largo+(300/x),alto);
                    ctx.lineTo(largo+(300/x),alto+(300/y));
                    ctx.stroke();

                }
                else {
                    ctx.beginPath();
                    ctx.moveTo(largo,alto);
                    ctx.lineTo(largo+(300/x),alto);
                    ctx.lineTo(largo+(300/x),alto+(300/y));
                    ctx.lineTo(largo,alto+(300/y));
                    ctx.lineTo(largo,alto);
                    ctx.stroke();
                }
                
            }
        }
    }
}

function resolverLaberinto(x, y){

    // usar dickstra
}

function mostrarLaberintoResuelto(){

}
