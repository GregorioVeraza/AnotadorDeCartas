
function cantJugadores(){
    cant = document.getElementById("cantidad-jugadores").value;
    ganar = document.getElementById("puntos-ganadores").value;
    document.getElementById("link").href = document.getElementById("tipo").value;
    localStorage.setItem("cantidadJugadores", cant);
    localStorage.setItem("puntosGanadores", ganar);
}

