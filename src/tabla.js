
import { mostrarQueVuelveAJugar } from "./animaciones.js";
import { animacionGanar } from "./animaciones.js";

const puntosPerdedores = localStorage.getItem("puntosGanadores");

let column;
let modal = document.getElementById("modal");
let index;
let resolverModal;



export function crearTabla(tabla, cantidad, firstColumns, puntos, ultimaResultados, rows){//anda bien
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

function crearColumna(texto) {//anda
    const columna = document.createElement("td");
    columna.textContent = texto;
    return columna;
}

export async function agregarFila(cantidad, firstColumns, puntos, perdedores, ronda, ultimaResultados){//anda bien{
    // Calcula perdedores antes de la condición principal
    perdedores = puntos.filter(p => p >= puntosPerdedores).length;
    console.log(ronda);
    if (perdedores >= cantidad - 1) {
        
        const columnaGanadora = document.getElementsByTagName("tr")[document.getElementsByTagName("tr").length - 1];
        let i = 1;
        
        while (parseInt(columnaGanadora.children[i].textContent) >= puntosPerdedores && i < cantidad) {
            console.log("while "+ i);
            i++;
        }/*
        if (columnaGanadora.children[i].textContent >= puntosPerdedores){
            i++;//perdieron todos los jugadores
        }*/
        animacionGanar(i, cantidad, firstColumns);
    
        return;
    } else{
        const tabla = document.getElementsByTagName("table")[0];
        const columna = document.createElement("tr");
        columna.appendChild(crearColumna(ronda));
        column = columna;
        tabla.appendChild(columna);
        puntosAnteriores(cantidad, ultimaResultados);
        modal = document.getElementById("modal");
        for (let i = 1; i <= cantidad; i++) {//mostrar que jugador tiene que poner los puntos
            index = i;
            if (puntos[i-1] < puntosPerdedores){
                await mostrarModal(document.getElementById("jugador"),`${firstColumns[i-1].textContent}`); // ahora espera a que se cierre el modal
            }
            column.appendChild(crearColumna(puntos[index - 1]));
        }
        modal = document.getElementById("modal-perdedor");
        
        for (let i = 0; i < cantidad; i++) {//mostrar que perdio
            if (puntos[i] >= puntosPerdedores){
                //perdedores++;
                document.getElementsByTagName("h1")[0].textContent = `perdio el player ${puntos.findIndex(puntos => puntos>= puntosPerdedores) +1}`;
                //mostrarQuePerdio(i+1);
                await mostrarModal(document.getElementById("perdedor"),`perdio ${firstColumns[i].textContent}`);
            }
        }
        
        
        console.log("ronda "+ ronda);  
    }
    
    
}

export function mostrarModal(elemento, texto) {
    elemento.textContent = texto;
    modal.showModal();

    // 👇 devolvemos una promesa que se resuelve en actualizarFila()
    return new Promise((resolve) => {
        resolverModal = resolve;
    });
}


export function actualizarFila(puntos){
    console.log(index);
    if (puntos[index - 1] <= puntosPerdedores){
        puntos[index - 1] += parseInt(document.getElementById("puntos").value);
        
    }
    
    modal.close();

    // 🚀 resolvemos la promesa cuando se cierra el modal
    if (resolverModal) {
        resolverModal();  
        resolverModal = null; // limpiar por seguridad
    }
}

export function puntosAnteriores(cantidad, ultimaResultados){//anda bien
    const tabla = document.getElementsByTagName("table")[0];
    if (tabla.children.length > 2){
        const ultimaColumna = tabla.children[tabla.children.length-2].getElementsByTagName("td");
        
        for (let i = 1; i <= cantidad; i++) {
            ultimaResultados[i-1] = parseInt(ultimaColumna[i].textContent);
        }
        
    } else{
        console.log("aca");
        for (let i = 1; i <= cantidad; i++) {
            ultimaResultados[i-1] = 0;
        }
        
    }
}



export function borrarFila(puntos, ronda, ultimaResultados, cantidad){//anda bien
    console.log(ronda);
    if (ronda > 1){
    const tabla = document.getElementsByTagName("table")[0];
    if (tabla.children.length > 1){
        tabla.removeChild(tabla.lastChild);    
    }
    for (let i = 0; i < puntos.length; i++) {
        puntos[i] = ultimaResultados[i];
    }
    puntosAnteriores(cantidad, ultimaResultados);
    const cambiar = puntos.filter(p => p >= puntosPerdedores);
    cambiar.forEach((puntos, index) => {
        mostrarQueVuelveAJugar(index + 1);
    });
    
        ronda--;
    }
}