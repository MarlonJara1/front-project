const url = 'https://back-cnji.onrender.com/api/ingrediente'
const listarIngredientes = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)
        .then(res => res.json())
        .then(function (data) {
            let listarIngredientes = data.ingredientes
            listarIngredientes.map((ingredientes) => {
                mensaje += `<tr><td>${ingredientes.nombreIngrediente}</td>`+
                `<td>${ingredientes.descripcionIngrediente}</td>`+
                `<td>${ingredientes.precioIngrediente}</td>`+
                `<td>${ingredientes.estadoIngrediente === 'Activo' ? 'Activo' : 'Inactivo'}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#idModal2" onclick='editar(${JSON.stringify(ingredientes)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="listarIng.html" onclick='eliminar("${ingredientes._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }   
            )
        })
    }
}

listarIngredientes()

const registrarIngrediente = async() => {
    let nombreIngrediente = document.getElementById('nombreIngrediente').value
    let descripcionIngrediente = document.getElementById('descripcionIngrediente').value
    let precioIngrediente = document.getElementById('precioIngrediente').value
    let estadoIngrediente = document.getElementById('estadoIngrediente').value

    let ingrediente = {
        nombreIngrediente: nombreIngrediente,
        descripcionIngrediente: descripcionIngrediente,
        precioIngrediente: precioIngrediente,
        estadoIngrediente: estadoIngrediente,
    }

    let nombreRegex = /^[a-zA-Z\s]+$/

    if (nombreIngrediente !== '' && nombreRegex.test(nombreIngrediente) && parseFloat(precioIngrediente) >= 0) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(ingrediente),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
            alert(json.mensaje)
            window.location.href = 'listarIng.html'

        })
    }
    else {
        alert('Verifica los datos ingresados')
    }
}


const editar = (ingrediente) =>{
    document.getElementById('_id').value = ''
    document.getElementById('nombreIngrediente').value = ''
    document.getElementById('descripcionIngrediente').value = ''
    document.getElementById('precioIngrediente').value = ''
    document.getElementById('estadoIngrediente').value = ''
    
    document.getElementById('_id').value = ingrediente._id
    document.getElementById('nombreIngrediente').value = ingrediente.nombreIngrediente
    document.getElementById('descripcionIngrediente').value = ingrediente.descripcionIngrediente
    document.getElementById('precioIngrediente').value = ingrediente.precioIngrediente
    document.getElementById('estadoIngrediente').value = ingrediente.estadoIngrediente

};

const actualizarIngrediente = async() =>{

    let nombreIngrediente = document.getElementById('nombreIngrediente').value
    let descripcionIngrediente = document.getElementById('descripcionIngrediente').value
    let precioIngrediente = document.getElementById('precioIngrediente').value
    let estadoIngrediente = document.getElementById('estadoIngrediente').value

    let ingrediente = {
        _id: document.getElementById('_id').value,
        nombreIngrediente: nombreIngrediente,
        descripcionIngrediente: descripcionIngrediente,
        precioIngrediente: precioIngrediente,
        estadoIngrediente: estadoIngrediente,
    }

    if((!nombreIngrediente == '')){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(ingrediente),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
           alert(json.mensaje)
            window.location.href = 'listarIng.html'

        })
    }
    else{
        alert('El nombre es obligatorio')
    }
}

const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
    let ingrediente = {
        _id: _id
    }
    
       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(ingrediente),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrarIng'))
{
    document.querySelector('#btnRegistrarIng')
    .addEventListener('click', registrarIngrediente)
}

if(document.querySelector('#btnActualizarIng'))
{
    document.querySelector('#btnActualizarIng')
.addEventListener('click', actualizarIngrediente)
}
