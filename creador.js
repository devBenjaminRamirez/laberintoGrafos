/*
Integrantes:
    -Pablo Castillo     (RUT: 20.858.272-0)
    -Tomas Cayul        (RUT: 20.722.016-7)
    -Victor Guzman      (RUT: 20.456.492-2)
    -Roberto Jorquera   (RUT: 20.846.312-8)
    -Victor Ubeda       (RUT: 21.041.812-1)
Seccion: 411.
Fecha: 04/12/2022
Asignatura: Grafos y lenguajes formales.
Profesor: Michael Emil Cristi Capstick
Carrera: Ingenieria Civil en Computacion mencion Informatica
*/

var matriz=[];
var matriz2=[];
var ruta = [];
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

function datos() { //funcion que se encarga de recibir los datos ingresados en las casillas y convertirlos a valor entero (numerico)
    matriz = [];
    alto = parseInt(document.getElementById("altura").value);
    ancho = parseInt(document.getElementById("ancho").value);
    
    crearLaberinto(alto,ancho);
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
                matriz[i][j] = String.fromCharCode(valor+j); //Asigna caracteres a los vertices, utilizado para el proceso de evaluacion.
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
                    else if(i==j && j==y) {             //Revisa si hay pared hacia abajo en la primera fila
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
    

    resolverLaberinto(); //comprueba si el laberinto tiene solucion y de ser el caso que no, vuelve a generar la matriz de adyacencia hasta que se genere uno con solucion.
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
                        //dibuja linea hacia abajo, lado derecho
                    }
                    else{
                        ctx.moveTo((mov_x+1)*(900/x), (mov_y+1)*(900/y));
                        //move
                    }
                    if(matriz[i][j+x]==0){
                        ctx.lineTo((mov_x)*(900/x), (mov_y+1)*(900/y));
                        //dibuja linea hacia la izquierda, lado inferior
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

function resolverLaberinto(){ //resuelve el laberinto, buscando el camino menos costoso posible 

    var inicio = entrada+1;
    var final = salida+(ancho*(alto-1))+1;
    var distancia = 0;
    var n = 0;
    var m = 0;
    var cantidad = alto*ancho;
    var tabla = new Array(cantidad);

    for(var n=1; n<=(cantidad+2); n++){
        tabla[n] = new Object(); //instanciamos objetos para los vertices
        tabla[n].visitado = 0;          //
        tabla[n].distancia = 9999999;   //datos de los vertices 
        tabla[n].previo = 0;            //
    }
    tabla[inicio].distancia = 0;        //igualamos la distancia recorrida en 0 para la entrada.
    
    for(distancia = 0; distancia < (cantidad+1); distancia++){  //recorre todo el laberinto
        for(n=1;n<=(cantidad+1);n++){
            if((tabla[n].visitado == 0) && (tabla[n].distancia == distancia)){ 
                tabla[n].visitado = 1;
                for(m=1;m<=(cantidad+1); m++){
                    if(matriz[n][m] == 1){
                        if(tabla[m].distancia == 9999999){
                            tabla[m].distancia = distancia+1;
                            tabla[m].previo = n;
                        }
                    }
                }
            }
        }
    }

    ruta = [];
    var nodo = final;
    while(nodo != inicio){ //recorremos los nodos
        ruta.push(nodo);
        if(tabla[nodo] == null){ //condicion que evalua si el laberinto no tiene solucion
            console.log("no tiene solucion"); //muestra en consola si la matriz generada no tiene solucion
            crearLaberinto(alto,ancho); //vuelve a crear la matriz
            
            return 0; //condicion de termino
        }
        nodo = tabla[nodo].previo;
    }
    ruta.push(inicio);
    console.log(ruta); //muestra la ruta mas corta para llegar a la salida
}

function mostrarLaberintoResuelto(ruta){ //lista, dibuja los puntos por los que pasa para formar el camino minimo.

    var mov_x = 0;
    var mov_y = 0;
    var i=0;

    const canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        const ctx = canvas.getContext('2d');

        while(ruta[i] != null){     //evaluamos los movimientos que se deben realizar para las figuras.
                
            mov_x = Math.trunc((ruta[i]%ancho)-1);
            if(mov_x < 0 && ruta[i] > 0){
                mov_x = ancho-1;
            }
            if(Math.trunc((ruta[i]%ancho)) == 1){
                mov_x = 0;
            }
            mov_y = Math.trunc((ruta[i]/ancho)); 

            if(ruta[i]%ancho == 0){
                mov_y--;
            }

            ctx.beginPath();
            ctx.arc((mov_x*(900/ancho))+(900/(2*ancho)), mov_y*(900/alto)+(900/(2*alto)), (500/(ancho*alto))+2, 0, 2*Math.PI); //generamos las figuras que muestran el path a seguir para resolver el laberinto
            ctx.stroke();

            i++; 
        }
    }
}
