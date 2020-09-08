//se obtiene el grid
let table = document.getElementById("game");

//botones
let startBtn = document.getElementById("start-btn");
let deleteBtn = document.getElementById("delete-btn");

// tamaño de filas y columnas
let row = 50;
let col = 50;

//almacena true o false, para saber si la celda está viva o muerta
let isAlive = [];


//cuenta las celdas adyacentes vivas
let aliveCounter = 0;


//obtiene el slider con la velocidad
let speed = document.getElementById("range");
let speedValue;


//crea la tabla dinámicamente y permite al usuario dar click a cada celda
function createTable() {
    for (let i = 0; i < row; i++) {
        let row = document.createElement("tr");
        isAlive[i] = [];
        for (let j = 0; j < col; j++) {
            let cell = document.createElement("td");
            //pone en false todas las celdas de la matriz que almacena el estado 
            isAlive[i][j] = false
                //si el usuario le da click, agrega o elimina el nombre de la clase "alive" para cambiar de color
            cell.className = "";
            cell.addEventListener("click", function() {
                cell.className = cell.className === "alive" ? "" : "alive";
            });

            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

//llama a la función para crear la tabla
createTable();


//Arreglo que almacena todos loas celdas
let cells = document.getElementsByTagName("td");


//Llena la matriz que verifica si las celdas están vivos o no
function isCellAlive() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            //si la celda está "viva", llena la matriz con true, de lo contrario con false
            if (cells[col * i + j].className === 'alive') {
                isAlive[i][j] = true;
            } else {
                isAlive[i][j] = false;
            }
        }

    }
}

//Hace cada paso de la simulación
function start() {
    isCellAlive();

    //Se recorre la matriz que guarda los estados y verifica si las celdas adyacentes están vivas
    for (let i = 1; i < row - 1; i++) {
        for (let j = 1; j < col - 1; j++) {
            aliveCounter = 0; //contador de celdas vivas

            for (let k = -1; k < 2; k++) {
                for (let l = -1; l < 2; l++) {
                    if (isAlive[i + k][j + l]) {
                        aliveCounter++; //aumenta el contador de celdas adyacentes vivas
                    }

                }
            }


            //Condiciones del juego
            if (!isAlive[i][j] && aliveCounter == 3) {
                cells[col * i + j].className = "alive";
            } else if (isAlive[i][j] && (aliveCounter == 3 || aliveCounter == 2)) {
                cells[col * i + j].className = "alive";
            } else {
                cells[col * i + j].className = "";

            }
        }
    }
}


//Ejecuta cada paso de la simulación en el intervalo de tiempo de la velocidad
function run() {
    speedValue = setInterval(function() {
        start();
    }, speed.value);
}


//Botón para comenzar la simulación
startBtn.addEventListener("click", function() {
    run();
    if (startBtn.textContent === "Comenzar") {
        startBtn.innerText = "Pausado";
        startBtn.disabled = true;
    }

});

//Botón para limpiar las celdas
deleteBtn.addEventListener("click", function() {
    //isAlive = [];
    for (let i = 0; i < row; i++) {
        //isAlive[i] = [];
        for (let j = 0; j < col; j++) {
            cells[col * i + j].className = "";
            //isAlive = [i][j] = false;
        }
    }

    //reiniciar las variables
    /*   aliveCounter = 0;

       //activar el botón de comenzar
       startBtn.innerText = "Comenzar";
       startBtn.disabled = false;
       
    */


});

//Slider que maneja el cambio de velocidad
speed.addEventListener("click", function() {
    //speedValue es el id del intervalo
    clearInterval(speedValue);
    if (speedValue) {
        speedValue = setInterval(function() {
            start();
        }, speed.value); //utilizando el valor que tiene el slider
    }
});


//En el botón para limpiar, intenté reiniciar las variables para comenzar la simulación de nuevo sin tener que recargar la página
//me daba el error "Cannot set property '0' of undefined" y no logré corregirlo