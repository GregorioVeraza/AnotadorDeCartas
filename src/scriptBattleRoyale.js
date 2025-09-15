import confetti from 'canvas-confetti';
import { crearTabla, mostrarModal, actualizarFila, agregarFila, borrarFila } from './tabla.js';
import { cerrar, cambiarNombre  } from './modal.js';
import { animacionGanar } from './animaciones.js';




const gameState = {
    puntos : [],
    rows : [],
    firstColumns: [],
    ronda : 1,
    perdedores : 0
};

const cantidad = localStorage.getItem("cantidadJugadores");


const tabla = document.getElementById("tabla");


let ultimaResultados = [];

crearTabla(tabla, cantidad, gameState.firstColumns, gameState.puntos, ultimaResultados, gameState.rows);




document.getElementById("agregar-fila").addEventListener("click", () =>
    agregarFila(cantidad, gameState.firstColumns, gameState.puntos, gameState.perdedores, gameState.ronda++, ultimaResultados, gameState.index++, gameState.resolverModal));
document.getElementById("borrar-fila").addEventListener("click",() =>{
    console.log(gameState.puntos);
    if (gameState.ronda > 1){ 
        borrarFila(gameState.puntos, gameState.ronda--, ultimaResultados, cantidad);
    }

});;
document.getElementById("actualizar-fila").addEventListener("click", () =>actualizarFila(gameState.puntos, gameState.index, gameState.resolverModal));
document.getElementsByClassName("cerrar")[0].addEventListener("click", ()=>cerrar(1));
document.getElementsByClassName("cerrar")[1].addEventListener("click", ()=>cerrar(2));
document.getElementById("cambiar-nombre").addEventListener("click", () => cambiarNombre);





let indexNombre;
/**
 * @param {HTMLTableCellElement} elemento
 */
gameState.firstColumns.forEach((elemento) => {
    elemento.addEventListener("click", ()=>{
        indexNombre = elemento;
        document.getElementsByTagName("dialog")[2].showModal();
    });
});



