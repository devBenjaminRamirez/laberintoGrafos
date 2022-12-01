
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
    for(var i=0; i<=x*y; i++){          //Crea la matriz de forma aleatoria
        matriz[i] = [];

        for(var j=0; j<=y*x; j++){
            matriz[0][0] = " ";
            if(i==0){
                matriz[i][j] = String.fromCharCode(valor+j);
            }
            else if(j==0){
                matriz[i][j] = String.fromCharCode(valor+i);
            }
            else if(i==j){
                matriz[i][j]=0;
            }
        }
    }
    for(var i=0; i<=x*y; i++){
        for(var j=0; j<=y*x; j++){
            if(i!=0 && j!=0){;
                if(j<=y && matriz[i][j] != null){
                    if(i==j && j<y) {                   //Revisa si hay pared hacia la derecha en la priemra fila
                        matriz[i][j+1] = Math.floor(Math.random()*2);
                        matriz[j+1][i] = matriz[i][j+1];
                        matriz[i][j+y] = Math.floor(Math.random()*2);
                        matriz[j+y][i] = matriz[i][j+y];
                    }
                    else if(i==j && j==y) {             //revisa si hay pared hacia abajo en la primera fila
                        matriz[i][j+y] = Math.floor(Math.random()*2);
                        matriz[j+y][i] = matriz[i][j+y];
                    }
                }
                else if(j<y+i && i!= x*y && matriz[i][j] != null && j>y && j%y != 0){   //Revisa si hay pared hacia la derecha y hacia abajo en el resto de nodos
                    if(i==j) {
                        matriz[i][j+1] = Math.floor(Math.random()*2);
                        matriz[j+1][i] = matriz[i][j+1];
                        if(j+y<=y*x) {
                            matriz[i][j+y] = Math.floor(Math.random()*2);
                            matriz[j+y][i] = matriz[i][j+y];
                        }
                    }
                }
                else if(j<y+i && i!= x*y && matriz[i][j] != null && j>y && j%y == 0) { //revisa la pared hacia abajo de los nodos pegados a la derecha
                    if(j+y<=y*x && i==j) {
                        matriz[i][j+y] = Math.floor(Math.random()*2);
                        matriz[j+y][i] = matriz[i][j+y];
                    }
                }
                else if(matriz[i][j] == null){
                    matriz[i][j] = "x";
                }
            }
        }
    }

    for(var i=1; i<=x*y; i++) {         //lo vuelve conexo
        var suma = 0;
        var pos1 = 0;
        var pos2 = 0;
        var pos3 = 0;
        var pos4 = 0;
        var conta = 0;
        var mas1 = false;
        for(var j=1; j<=y*x; j++) {
            if((matriz[i][j] == 0 || matriz[i][j] == 1) && i!=j) {
                suma = suma + matriz[i][j];
                conta++;
                if(suma==0){
                    pos1 = i;
                    pos2 = j;
                    mas1 = true;
                }
                if(suma==1 || mas1 == true) {
                    pos3 = i;
                    pos4 = j;
                    
                }
            }
        }
        if(suma==0 && conta == 2){
            matriz[pos1][pos2] = 1;
            matriz[pos2][pos1] = 1;
        }
        if(suma==0 && conta > 2){
            matriz[pos1][pos2] = 1;
            matriz[pos2][pos1] = 1;
            matriz[pos3][pos4] = 1;
            matriz[pos4][pos3] = 1;
        }
        if(suma==1 && conta > 2){
            matriz[pos3][pos4] = 1;
            matriz[pos4][pos3] = 1;
        }
    }


    const canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        const ctx = canvas.getContext('2d');

        var entrada = 0 + Math.floor(Math.random()*x);
        var salida = 0 + Math.floor(Math.random()*x);
        for(var i=1; i<=x*y; i++){
            var largo=(i-1)*(300/x);
            for(var j=1; j<=y*x; j++){
                var alto=(j-1)*(300/y);
                if(i==j){
                    if(matriz[i][j+1]==0)
                    {
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(largo+(300/y),alto);
                        ctx.lineTo(largo+(300/y),alto+(300/x));
                        ctx.stroke();
                        console.log("pillamos 1");
                    }
                }
            }
        }
    }
}

function draw() {
    var y = parseInt(document.getElementById("altura").value);
    var x = parseInt(document.getElementById("ancho").value);

    const canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        const ctx = canvas.getContext('2d');

        var entrada = 0 + Math.floor(Math.random()*x);
        var salida = 0 + Math.floor(Math.random()*x);
        /*for(var i=0;i<x;i++) {
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
        }*/
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,300);
        ctx.lineTo(300,300);
        ctx.lineTo(300,0);
        ctx.lineTo(0,0);
        ctx.stroke();
        for(var i=0; i<=x*y; i++){
            var largo=i*(300/x);
            for(var j=0; j<=y*x; j++){ //recorre la matriz dibujando las paredes
                var alto=j*(300/y);
                if(i==j){
                    if(matriz[i][j+1]==0 && matriz[i][j+1]!=null) {
                        ctx.beginPath();
                        ctx.moveTo(largo+(300/x),alto);
                        ctx.lineTo(largo+(300/x),alto+(300/y));
                        ctx.stroke();
                    }
                    if(matriz[i][j+y] == 0 && matriz[i][j+y]!=null) {
                        ctx.beginPath();
                        ctx.moveTo(largo,alto+(300/y));
                        ctx.lineTo(largo+(300/x),alto+(300/y));
                        ctx.stroke();
                    }
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
