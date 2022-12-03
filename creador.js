var matriz=[];
const valor=64;
var alto = 0;
var ancho = 0;
var distancia = 9999;
var entrada = 0;
var salida = 0, c;

var limpiar = document.getElementById("limpiar");
limpiar.addEventListener("click",function(){
	canvas.width=canvas.width;
},false);

function datos() {
    matriz = [];
    alto = parseInt(document.getElementById("altura").value);
    ancho = parseInt(document.getElementById("ancho").value);

    crearLaberinto(alto,ancho);

    document.getElementById('out').innerHTML = matriz.join('\n');
}

function crearLaberinto(x,y){
    for(var i=0; i<=x*y; i++){          //Crea la matriz de forma aleatoria
        matriz[i] = [];
        entrada = 0;
        salida = 0;
        c=0;
        for(var j=0; j<=y*x; j++){
            matriz[0][0] = " ";
            if(i==0){
                matriz[i][j] = String.fromCharCode(valor+j);
            }
            else if(j==0){
                matriz[i][j] = String.fromCharCode(valor+i);
            }
            else if(i==j){
                matriz[i][j]='-';
            }
        }
    }
    for(var i=0; i<=x*y; i++){
        for(var j=0; j<=y*x; j++){
            if(i!=0 && j!=0){;
                if(j<=y && matriz[i][j] != null){
                    if(i==j && j<y) {                   //Revisa si hay pared hacia la derecha en la primera fila
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
    entrada = Math.floor(Math.random()*(y));
    if(entrada == 0){
        entrada = 1;
    }
    salida = Math.floor(Math.random()*(y));
    if(salida == 0){
        salida = 1;
    }
    console.log(entrada);
    console.log(salida);


    draw(entrada, salida);
}

function draw(entrada, salida) { //lista, dibuja correctamente el laberinto.

    var y = alto;
    var x = ancho;
    var total = x*y;
    var mov_x=0, mov_y=0;

    const canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,900);
        ctx.moveTo(900,0);
        ctx.lineTo(900,900);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(entrada*(900/x),0);
        ctx.moveTo((entrada+1)*(900/x),0);
        ctx.lineTo(900,0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,900);
        ctx.lineTo(salida*(900/x),900);
        ctx.moveTo((salida+1)*(900/x),900);
        ctx.lineTo(900,900);
        ctx.stroke();

        for(var i=1;i<=total;i++) {
            for(var j=1;j<=total;j++) {
                
                if(i==j){
                    
                    ctx.beginPath();
                    ctx.moveTo(mov_x*(900/x), mov_y*(900/y))
                    if(matriz[i][j+1]==0){
                        ctx.moveTo((mov_x+1)*(900/x), mov_y*(900/y));
                        ctx.lineTo((mov_x+1)*(900/x), (mov_y+1)*(900/y));
                        //dibujar linea hacia abajo
                    }
                    else{
                        ctx.moveTo((mov_x+1)*(900/x), (mov_y+1)*(900/y));
                        //move
                    }
                    if(matriz[i][j+x]==0){
                        ctx.lineTo((mov_x)*(900/x), (mov_y+1)*(900/y));
                        //dibujar linea hacia la izquierda
                    }
                    ctx.stroke();
                    mov_x++;
                    if(mov_x==x){
                        mov_y++;
                        mov_x = 0;
                    }
                    
                }
            }
        }
    }
}

function resolverLaberinto(){
    //aplicar dickstra
    //techo es [i][j-x]
    //inferior es [i][j+x]
    //izquierdo es [i][j-1]
    //derecho es [i][j+1]
    //entro en [entrada][entrada]
    //salgo en [x*y+salida][x*y+salida]
    var distancia_actual = 0;
    var pos_actual = entrada;
    var r=0;

        if(matriz[pos_actual][pos_actual+ancho] == 1 && matriz[pos_actual][pos_actual+ancho].visited != true){
            //analizamos el inferior
            distancia_actual++;
            matriz[pos_actual][pos_actual].visited = true; //esto hace que no se vuelva a analizar
            pos_actual = pos_actual+ancho; //posible error
            //cambiar pos_actual al vertice de abajo
        }
        if(matriz[pos_actual][pos_actual-1] == 1 && matriz[pos_actual][pos_actual-1].visited != true){
            //analizamos el de la izquierda
            distancia_actual++;
            matriz[pos_actual][pos_actual].visited = true;
            pos_actual--;
            //cambiar pos_actual al vertice de la izquierda
        }
        if(matriz[pos_actual][pos_actual+1] == 1 && matriz[pos_actual][pos_actual+1].visited != true){
            //analizamos el de la derecha
            distancia_actual++;
            matriz[pos_actual][pos_actual].visited = true;
            pos_actual++;
            //cambiar pos_actual al vertice de la derecha
        }
        if(matriz[pos_actual][pos_actual-ancho] == 1 && matriz[pos_actual][pos_actual-ancho].visited != true){
            //analizamos el techo
            distancia_actual++;
            matriz[pos_actual][pos_actual].visited = true;
            pos_actual = pos_actual-ancho; //posible error
            //cambiar pos_actual al vertice de arriba
        }
    console.log(distancia_actual);
}

function mostrarLaberintoResuelto(){

}
