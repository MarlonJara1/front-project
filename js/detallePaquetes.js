const url = 'https://back-cnji.onrender.com/api/detalle'
const listarDetalle = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)
        .then(res => res.json())
        .then(function (data) {
            let listarDetalle = data.detalle
            listarDetalle.map((detalle) => {
                mensaje += `<tr><td>${detalle.idPaquete}</td>`+
                `<td>${detalle.tipoPa}</td>`+
                `<td>${detalle.cantidad}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#idModal5" onclick='editar(${JSON.stringify(detalle)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="listarCa.html" onclick='eliminar("${detalle._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje    
            }   
            )
        })
    }
}

listarDetalle()

const registrarDetalle = async() => {
    let idPaquete = document.getElementById('idPaquete').value
    let tipoPa = document.getElementById('tipoPa').value
    let cantidad = document.getElementById('cantidad').value

    let detalle = {
        idPaquete: idPaquete,
        tipoPa: tipoPa,
        cantidad: cantidad,
    }

    if (idPaquete !== '' && tipoPa !== '' && parseFloat(cantidad) >= 0) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(detalle),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
            alert(json.mensaje)
                       window.location.href = 'listarDe.html'

        })
    }
    else {
        alert('No se puede crear, por favor ingrese los datos')
    }
}


const editar = (detalle) =>{
    document.getElementById('_id').value = ''
    document.getElementById('idPaquete').value = ''
    document.getElementById('tipoPa').value = ''
    document.getElementById('cantidad').value = ''
    
    document.getElementById('_id').value = detalle._id
    document.getElementById('idPaquete').value = detalle.idPaquete
    document.getElementById('tipoPa').value = detalle.tipoPa
    document.getElementById('cantidad').value = detalle.cantidad

};

const actualizarDetalle = async() =>{

    let idPaquete = document.getElementById('idPaquete').value
    let tipoPa = document.getElementById('tipoPa').value
    let cantidad = document.getElementById('cantidad').value

    let detalle = {
        _id: document.getElementById('_id').value,
        idPaquete: idPaquete,
        tipoPa: tipoPa,
        cantidad: cantidad,
    }

    if(idPaquete !== '' && tipoPa !== '' && cantidad !== ''){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(detalle),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
            window.location.href = 'listarDe.html'

        })
    }
    else{
        alert('No se puede editar, por favor ingrese los datos')
    }
}

const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
    let detalle = {
        _id: _id
    }
    
       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(detalle),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrarDe'))
{
    document.querySelector('#btnRegistrarDe')
    .addEventListener('click', registrarDetalle)
}

if(document.querySelector('#btnActualizarDe'))
{
    document.querySelector('#btnActualizarDe')
.addEventListener('click', actualizarDetalle)
}
