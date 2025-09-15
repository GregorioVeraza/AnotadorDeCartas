const crear = (string) => {document.createElement(string)};
const cantidad = localStorage.getItem("cantidadJugadores");
const puntosGanadores = localStorage.getItem("puntosGanadores");

const puntos = [];
for (let index = 1; index <= cantidad; index++) {
    crearJugador(index);
}

function canva(ctx){
    const largo =  document.querySelector('div');
    console.log(largo);
    ctx.beginPath(); // Inicia un nuevo camino (ruta)
    ctx.moveTo(75, 0); // Punto de inicio de la línea (x1, y1)
    ctx.lineTo(0, 75); // Punto final de la línea (x2, y2)
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.stroke(); // Dibuja la línea
    return ctx;
}

    

function crearJugador(num){
    const ctx = document.getElementById('main-anotador');
    const section = document.createElement("section");

    section.appendChild(CreatePlayer(num));
    section.appendChild(document.createElement("div"));
    section.appendChild(addTotal());

    ctx.appendChild(section);
    puntos.push(0);

}
function addButton(img, clase){
    const button = document.createElement("button");
    button.classList.add(clase);
    const background = document.createElement("img");
    background.src = `${img}`;
    button.appendChild(background);
    
    return button;
}

function addTotal(){
    const h2 = document.createElement("h2");
    h2.style.position = "fixed";
    h2.style.bottom = "0";
    h2.textContent= "total 0";
    return h2;
}

function CreatePlayer(num) {
    
    const header = document.createElement("header");
    
    
    const h1 = document.createElement("h1");
    h1.textContent = `Player ${num}`;
    h1.onClick=`crearModal()`;
    header.appendChild(addButton("substract.png", "substract"));
    header.appendChild(h1);
    header.appendChild(addButton("add.png", "add"));
    
    return header;
}
const h1 = document.getElementsByTagName("h1");
let num;
for (let index = 0; index < h1.length; index++) {
    const element = h1[index];
    element.addEventListener('click', () =>{
        crearModal("first-modal");
        num = index;
    });
}
function crearModal(modal) {
    document.getElementById(modal).classList.remove("ocultar");
    document.getElementById("background-modal").classList.remove("ocultar");
}

function cambiarNombre() {
    if (document.getElementById("nombre").value != ""){
    h1[num].textContent= document.getElementById("nombre").value;
    }
    cerrarModal("first-modal");
}

function cerrarModal(modal){
    document.getElementById(modal).classList.add("ocultar");
    document.getElementById("background-modal").classList.add("ocultar");
}


const add = document.getElementsByClassName("add");
for (let index = 0; index < add.length; index++) {
    const element = add[index];
    element.addEventListener('click', () => {
        
        const sections = document.getElementsByTagName("section");
        const divs = sections[index].getElementsByTagName("div");
        h2 = sections[index].getElementsByTagName("h2")[0];
        console.log(divs);
        if (puntos[index]%5 === 0){
        
            divs[divs.length-1].classList.add("arriba");
            
        } else if (puntos[index]%5 === 1){
            divs[divs.length-1].classList.add("derecha");
        } else if (puntos[index]%5 === 2){
            divs[divs.length-1].classList.add("abajo");
        } else if (puntos[index]%5 === 3){
            divs[divs.length-1].classList.add("izquierda");
        } else if (puntos[index]%5 === 4){
            const canvas = document.createElement("canvas");
            
            const ctx = canvas.getContext('2d'); 
            canva(ctx); 
            divs[divs.length-1].append(canvas);
            sections[index].appendChild(document.createElement("div"));
        }
        puntos[index]++;
        h2.innerText = `total ${puntos[index]}`;
        if (puntos[index] == puntosGanadores){
            mostrarModal(sections[index].getElementsByTagName("h1")[0].textContent);
        }
    });
}

function mostrarModal(nombre) {
    const dialog =document.getElementsByTagName("dialog")[0];
    document.getElementById("nombre-jugador").textContent= nombre;
    dialog.showModal();
    
}



const substract = document.getElementsByClassName("substract");
for (let index = 0; index < substract.length; index++) {
    const element = substract[index];
    element.addEventListener('click', () => {
    const sections = document.getElementsByTagName("section");
    const divs = sections[index].getElementsByTagName("div"); // limitar a jugador
    h2 = sections[index].getElementsByTagName("h2")[0];
    console.log(divs);
    if (puntos[index] > 0) { // no bajar de 0
        puntos[index]--;

        if (puntos[index] % 5 === 0) {
            divs[divs.length-1].classList.remove("arriba");
        } else if (puntos[index] % 5 === 1) {
            divs[divs.length-1].classList.remove("derecha");
        } else if (puntos[index] % 5 === 2) {
            divs[divs.length-1].classList.remove("abajo");
        } else if (puntos[index] % 5 === 3) {
            divs[divs.length-1].classList.remove("izquierda");
        } else if (puntos[index] % 5 === 4) {
            sections[index].removeChild(divs[divs.length-1]);// sacar el último div extra
            divs[divs.length-1].removeChild(divs[divs.length-1].firstChild);
            //i[index]--; // solo una vez
        }
        h2.textContent = `total ${puntos[index]}`;
    }

    console.log(puntos);
});

}

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita el refresh
    cambiarNombre();
});


