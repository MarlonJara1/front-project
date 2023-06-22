const url = 'https://back-cnji.onrender.com/api/plato'
const listarPlato = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)
        .then(res => res.json())
        .then(function (data) {
            let listarPlato = data.platos
            listarPlato.map((platos) => {
                mensaje += `<tr><td>${platos.nombrePlato}</td>`+
                `<td>${platos.descripcionPlato}</td>`+
                `<td>${platos.precioPlato}</td>`+
                `<td>${platos.estadoPlato === 'Activo' ? 'Activo' : 'Inactivo'}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#idModal3" onclick='editar(${JSON.stringify(platos)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="listarPla.html" onclick='eliminar("${platos._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }   
            )
        })
    }
}

listarPlato()

const registarPlato = async() =>{

    let nombrePlato = document.getElementById('nombrePlato').value
    let descripcionPlato = document.getElementById('descripcionPlato').value
    let precioPlato = document.getElementById('precioPlato').value
    let estadoPlato = document.getElementById('estadoPlato').value
    

    let plato = {
        nombrePlato: nombrePlato,
        descripcionPlato: descripcionPlato,
        precioPlato: precioPlato,
        estadoPlato: estadoPlato,
    }

    if((!nombrePlato == '' && !precioPlato == isNaN(precioPlato))){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(plato),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
           alert(json.mensaje)
        })
    }
    else{
        alert('Nombre o Precio incorrecto')
    }
}

const editar = (plato) =>{
    document.getElementById('_id').value = ''
    document.getElementById('nombrePlato').value = ''
    document.getElementById('descripcionPlato').value = ''
    document.getElementById('precioPlato').value = ''
    document.getElementById('estadoPlato').value = ''
    
    document.getElementById('_id').value = plato._id
    document.getElementById('nombrePlato').value = plato.nombrePlato
    document.getElementById('descripcionPlato').value = plato.descripcionPlato
    document.getElementById('precioPlato').value = plato.precioPlato
    document.getElementById('estadoPlato').value = plato.estadoPlato

};

const actualizarPlato = async() =>{

    let nombrePlato = document.getElementById('nombrePlato').value
    let descripcionPlato = document.getElementById('descripcionPlato').value
    let precioPlato = document.getElementById('precioPlato').value
    let estadoPlato = document.getElementById('estadoPlato').value

    let plato = {
        _id: document.getElementById('_id').value,
        nombrePlato: nombrePlato,
        descripcionPlato: descripcionPlato,
        precioPlato: precioPlato,
        estadoPlato: estadoPlato,
    }

    if((!nombrePlato == '')){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(plato),
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
    let plato = {
        _id: _id
    }
    
       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(plato),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrarPla'))
{
    document.querySelector('#btnRegistrarPla')
    .addEventListener('click', registarPlato)
}

if(document.querySelector('#btnActualizarPla'))
{
    document.querySelector('#btnActualizarPla')
.addEventListener('click', actualizarPlato)
}
