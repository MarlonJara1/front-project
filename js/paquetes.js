const url = 'http://localhost:8181/api/paquete'
const listarPaquete = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)
        .then(res => res.json())
        .then(function (data) {
            let listarPaquete = data.paquete
            listarPaquete.map((paquete) => {
                mensaje += `<tr><td>${paquete.nombrePaquete}</td>`+
                `<td>${paquete.descripcionPaquete}</td>`+
                `<td>${paquete.precioPaquete}</td>`+
                `<td>${paquete.estadoPaquete === 'Activo' ? 'Activo' : 'Inactivo'}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#idModal4" onclick='editar(${JSON.stringify(paquete)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="listarPa.html" onclick='eliminar("${paquete._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }   
            )
        })
    }
}

listarPaquete()

const registrarPaquete = async() =>{

    let nombrePaquete = document.getElementById('nombrePaquete').value
    let descripcionPaquete = document.getElementById('descripcionPaquete').value
    let precioPaquete = document.getElementById('precioPaquete').value
    let estadoPaquete = document.getElementById('estadoPaquete').value
    

    let paquete = {
        nombrePaquete: nombrePaquete,
        descripcionPaquete: descripcionPaquete,
        precioPaquete: precioPaquete,
        estadoPaquete: estadoPaquete,   
    }

    if((!nombrePaquete == '')){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(paquete),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
           alert(json.mensaje)
        })
    }
    else{
        alert('El nombre debe ser obligatorio')
    }
}

const editar = (paquete) =>{
    document.getElementById('_id').value = ''
    document.getElementById('nombrePaquete').value = ''
    document.getElementById('descripcionPaquete').value = ''
    document.getElementById('precioPaquete').value = ''
    document.getElementById('estadoPaquete').value = ''
    
    document.getElementById('_id').value = paquete._id
    document.getElementById('nombrePaquete').value = paquete.nombrePaquete
    document.getElementById('descripcionPaquete').value = paquete.descripcionPaquete
    document.getElementById('precioPaquete').value = paquete.precioPaquete
    document.getElementById('estadoPaquete').value = paquete.estadoPaquete

};

const actualizarPaquete = async() =>{

    let nombrePaquete = document.getElementById('nombrePaquete').value
    let descripcionPaquete = document.getElementById('descripcionPaquete').value
    let precioPaquete = document.getElementById('precioPaquete').value
    let estadoPaquete = document.getElementById('estadoPaquete').value

    let paquete = {
        _id: document.getElementById('_id').value,
        nombrePaquete: nombrePaquete,
        descripcionPaquete: descripcionPaquete,
        precioPaquete: precioPaquete,
        estadoPaquete: estadoPaquete,
    }

    if((!nombrePaquete == '')){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(paquete),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
           alert(json.mensaje)
        })
    }
    else{
        alert('El nombre es obligatorio')
    }
}

const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
    let paquete = {
        _id: _id
    }
    
       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(paquete),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrarPa'))
{
    document.querySelector('#btnRegistrarPa')
    .addEventListener('click', registrarPaquete)
}

if(document.querySelector('#btnActualizarPa'))
{
    document.querySelector('#btnActualizarPa')
.addEventListener('click', actualizarPaquete)
}