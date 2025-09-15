const cantidad = localStorage.getItem("cantidadJugadores");
const puntosGanadores = localStorage.getItem("puntosGanadores");

const tabla = document.getElementById("tabla");

let puntos = [];

let ultimaResultados = []
const rows = [];

/** @type {NodeListOf<HTMLTableCellElement>} */
const firstColumns = [];

let ronda = 1;

crearTabla()

function crearTabla(){
    const fila = document.createElement("tr");
    for (let i = 0; i <= cantidad; i++) {
        const columna = document.createElement("td");
        if (i > 0){
            columna.textContent = `player ${i}`;
            firstColumns.push(columna);
            puntos.push(0);
            ultimaResultados.push(0);
        }
        fila.appendChild(columna);
        rows.push(fila);
    }
    tabla.appendChild(fila);
}


let indexNombre;
/**
 * @param {HTMLTableCellElement} elemento
 */
firstColumns.forEach((elemento) => {
    elemento.addEventListener("click", ()=>{
        indexNombre = elemento;
        document.getElementsByTagName("dialog")[2].showModal();
    });
});

function cambiarNombre(){
    indexNombre.textContent= document.getElementById("nuevo-nombre").value;
    document.getElementsByTagName("dialog")[2].close();
}

let index;
let column;
const modal = document.getElementById("modal");

let resolverModal; // <-- guardamos la función resolve aquí


function actualizarFila() {
    
    puntos[index - 1] += parseInt(document.getElementById("puntos").value);
    column.appendChild(crearColumna(puntos[index - 1]));
    modal.close();

    // 🚀 resolvemos la promesa cuando se cierra el modal
    if (resolverModal) {
        resolverModal();  
        resolverModal = null; // limpiar por seguridad
    }
}

function mostrarModal(fila) {
    document.getElementById("jugador").textContent = `${firstColumns[fila-1].textContent}`;
    modal.showModal();

    // 👇 devolvemos una promesa que se resuelve en actualizarFila()
    return new Promise((resolve) => {
        resolverModal = resolve;
    });
}

function crearColumna(texto) {
    const columna = document.createElement("td");
    columna.textContent = texto;
    return columna;
}

function puntosAnteriores(){
    const tabla = document.getElementsByTagName("table")[0];
    if (tabla.children.length > 2){
        const ultimaColumna = tabla.children[tabla.children.length-2].getElementsByTagName("td");
        
        for (let i = 1; i <= cantidad; i++) {
            ultimaResultados[i-1] = parseInt(ultimaColumna[i].textContent);
        }
        console.log(ultimaResultados);
    } else{
        for (let i = 1; i <= cantidad; i++) {
            ultimaResultados[i-1] = 0;
        }
        console.log(ultimaResultados);
    }
}

async function agregarFila() {
    const tabla = document.getElementsByTagName("table")[0];
    const columna = document.createElement("tr");
    columna.appendChild(crearColumna(ronda));
    column = columna;
    tabla.appendChild(columna);
    puntosAnteriores();
    for (let i = 1; i <= cantidad; i++) {
        index = i;

        await mostrarModal(i); // ahora espera a que se cierre el modal
        if (puntos[i-1]>= puntosGanadores){
            
            document.getElementsByTagName("h1")[0].textContent = `Gano el player ${i}`;
            document.getElementsByTagName("dialog")[1].showModal();
            break;
        }
    }
    
    ronda++;
    
}

function cerrar(num){
    document.getElementsByTagName("dialog")[num].close();
}

function borrarFila(){
    const tabla = document.getElementsByTagName("table")[0];
    if (tabla.children.length > 1){
        tabla.removeChild(tabla.lastChild);    
    }
    console.log(`antes: ${ultimaResultados}`);
    puntos = ultimaResultados.slice();
    puntosAnteriores();
    console.log(`despues: ${ultimaResultados}`);
    ronda--;
}