const puntosPerdedores = localStorage.getItem("puntosGanadores");

let resolverModal; // <-- guardamos la función resolve aquí


export function cerrar(num){
    document.getElementsByTagName("dialog")[num].close();
    if (resolverModal) {
        resolverModal();  
        resolverModal = null; // limpiar por seguridad
    }
}




export function cambiarNombre(){
    indexNombre.textContent= document.getElementById("nuevo-nombre").value;
    document.getElementsByTagName("dialog")[2].close();
}
