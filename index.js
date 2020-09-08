//tabla
let table = document.getElementById("game");
//botones
let startBtn = document.getElementById("start-btn");
let deleteBtn = document.getElementById("delete-btn");

//filas y columnas
let row = 5;
let col = 5;

//para saber si la celda está viva o muerta
let isAlive = [];


//cuenta las celdas adyacentes vivas
let aliveCounter = 0;



//crea la tabla dinámicamente y permite al usuario dar click a cada celda
function createTable() {
    for (let i = 0; i < row; i++) {
        let row = document.createElement("tr");
        isAlive[i] = [];
        for (let j = 0; j < col; j++) {
            let cell = document.createElement("td");
            isAlive[i][j] = false
                //si el usuario le da click, agrega o elimina el nombre de la clase "vivo" para cambiar de color
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


//Para lamacenar todos los elementos td
let cells = document.getElementsByTagName("td");

//llena la matriz que verifica si están vivos o no
function isCellAlive() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            //si la celda está "viva", llena la matriz con true, de lo contrario false
            if (cells[col * i + j].className === 'alive') {
                isAlive[i][j] = true;
            } else {
                isAlive[i][j] = false;
            }
        }

    }
}

function start() {
    isCellAlive();
    for (let i = 1; i < row - 1; i++) {
        for (let j = 1; j < col - 1; j++) {
            aliveCounter = 0;

            for (let k = -1; k < 2; k++) {
                for (let l = -1; l < 2; l++) {
                    if (isAlive[i + k][j + l]) {
                        aliveCounter++;
                    }

                }
            }


            //Condiciones del juego
            if (!isAlive[i][j] && aliveCounter == 3) {
                cells[col * i + j].className = "alive";
                console.log("caso1");
                console.log(isAlive[i][j]);
                console.log(aliveCounter);
            } else if (isAlive[i][j] && (aliveCounter == 3 || aliveCounter == 2)) {
                cells[col * i + j].className = "alive";
                console.log("caso2");
                console.log(isAlive[i][j]);
                console.log(aliveCounter);
            } else {
                cells[col * i + j].className = "";
                console.log("caso3");
                console.log(isAlive[i][j]);
                console.log(aliveCounter);
            }
        }
    }
}


startBtn.addEventListener("click", function() {
    start();
    if (startBtn.textContent === "Comenzar") {
        startBtn.innerText = "Pausado";
        startBtn.disabled = true;
    }

});


deleteBtn.addEventListener("click", function() {
    isAlive = [];
    for (let i = 0; i < row; i++) {
        isAlive[i] = [];
        for (let j = 0; j < col; j++) {
            cells[col * i + j].className = "";
            isAlive = [i][j] = false;
        }
    }

    //reiniciar las variables

    aliveCounter = 0;

    //activar el botón de comenzar
    startBtn.innerText = "Comenzar";
    startBtn.disabled = false;


});