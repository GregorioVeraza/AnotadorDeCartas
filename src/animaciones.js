import confetti from 'canvas-confetti';
import { mostrarModal } from "./tabla.js";

export function animacionGanar(indexGanador, cantidad, firstColumns){
    const tabla = document.querySelector("table");
    const filas = tabla.querySelectorAll("tr");
    
    // recorrer columnas una por una
    filas.forEach((fila) => {
        const celdas = fila.querySelectorAll("td, th");
        
        celdas.forEach((celda, colIndex) => {
            console.log(colIndex, indexGanador);
            setTimeout(() => {
                if (colIndex === indexGanador) {
                    celda.classList.add("ganador");
                } else {
                    celda.classList.add("perdedor");
                }
            }, colIndex * 400); // delay para que se pinte de a una columna
        });
    });
    

    setTimeout(() => {
        mostrarModal(document.getElementById("perdedor"),`Gano ${firstColumns[indexGanador-1].textContent}`);
        confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

    }, cantidad * 400 + 500); // esperar a que terminen las animaciones


}

export function mostrarQuePerdio(index){
    const filas = document.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        celdas[index].style.backgroundColor = "red";
    }
}

export function mostrarQueVuelveAJugar(index){
    const filas = document.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        celdas[index].style.backgroundColor = "blue";
    }
}
