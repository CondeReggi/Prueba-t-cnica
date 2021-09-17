const formulario = document.querySelector('.formulario');
const tabla = document.getElementById('tabla');

function palindrome(arr){
    arr = arr.split('');
    return arr.concat((arr.slice(0, arr.length - 1).reverse()))
}

function AgregarTabla(e){
    e.preventDefault();

    let nombre = document.getElementById('nombre');
    let horas = document.getElementById('horas');

    if (nombre.value === "" || horas.value === "" || horas.value < 1) {
        if(nombre.value === "") alert("Debe ingresar un nombre de la prueba");
        if(horas.value === "") alert("Debe ingresar una cantidad de horas");
        if(nombre.value < 1) alert("Debe ingresar una cantidad de horas no nula")
    }else{
        let nueva_row = document.createElement('tr');
        nueva_row.className = `fila`;
        nueva_row.innerHTML = `
        
                    <td>${nombre.value}</td>
                    <td>${
                        (horas.value === "") ? 0 : "0 / " + horas.value
                    }</td>
                    <div class="botones">
                        <label style="display: none"> Finalizado </label>
                        <button class="finalizar">Finalizar</button>
                        <button class="agregar_horas">Agregar Horas</button>
                        <button class="Borrar">Borrar</button>
                    </div>
        `;
        tabla.appendChild(nueva_row);

        const botones = document.querySelectorAll('button');
        agregarEventos(botones);
    }

    nombre.value = "";
    horas.value = "";
}

function agregarEventos(botones){
    let frase = "";
    botones.forEach(item => {
        item.addEventListener("click", (event) => {
            let div_contenedor = event.target.parentNode;
            if (item.className === "finalizar") {
                div_contenedor.childNodes[1].style.display = "block";
                div_contenedor.childNodes[3].style.display = "none";
                div_contenedor.childNodes[5].style.display = "none";
            }
            if (item.className === "agregar_horas") {
                let padre = div_contenedor.parentNode.childNodes;
                let horas = padre[3].innerHTML;  
                // horas[horas.length - 1] 
                if (parseInt(horas[0]) < horas[horas.length - 1]){
                    padre[3].innerHTML = `${parseInt(horas[0]) + 1} / ${horas[horas.length - 1]}`
                }else{
                    alert("ya supero las horas")
                }
            }
            if (item.className === "Borrar") {
                event.target.parentNode.parentNode.remove()
            }
            if (item.className === "palindrome"){
                //let tabla = event.target.parentNode.childNodes[1]
                //tabla.childNodes
                //let arr = str.split('');
                for (let i = 2; i < tabla.childNodes.length; i++) {
                    let nombre = tabla.childNodes[i].childNodes[1].innerHTML;
                    let nombre_palindrome = palindrome(nombre);
                    frase += `${nombre_palindrome.join("")}  \n`
                }
                alert(frase)
            }
        })
    })
}

formulario.addEventListener('submit', AgregarTabla);

