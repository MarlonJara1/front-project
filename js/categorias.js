const url = 'https://back-cnji.onrender.com/api/categoria'
const listarCategorias = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)
        .then(res => res.json())
        .then(function (data) {
            let listarCategorias = data.categorias
            listarCategorias.map((categorias) => {
                mensaje += `<tr><td>${categorias.nombreCategoria}</td>`+
                `<td>${categorias.descripcionCategoria}</td>`+
                `<td>${categorias.estadoCategoria === 'Activo' ? 'Activo' : 'Inactivo'}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#idModal1" onclick='editar(${JSON.stringify(categorias)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="listarCa.html" onclick='eliminar("${categorias._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje    
            }   
            )
        })
    }
}

listarCategorias()

const registrarCategorias = async() => {
    let nombreCategoria = document.getElementById('nombreCategoria').value
    let descripcionCategoria = document.getElementById('descripcionCategoria').value
    let estadoCategoria = document.getElementById('estadoCategoria').value

    let categoria = {
        nombreCategoria: nombreCategoria,
        descripcionCategoria: descripcionCategoria,
        estadoCategoria: estadoCategoria,
    }

    let nombreRegex = /^[a-zA-Z\s]+$/

    if (nombreCategoria !== '' && nombreRegex.test(nombreCategoria)) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(categoria),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
            alert(json.mensaje)
            window.location.href = 'listarCa.html'

        })
    }
    else {
        alert('Verifica los datos ingresados')
    }
}


const editar = (categoria) =>{
    document.getElementById('_id').value = ''
    document.getElementById('nombreCategoria').value = ''
    document.getElementById('descripcionCategoria').value = ''
    document.getElementById('estadoCategoria').value = ''
    
    document.getElementById('_id').value = categoria._id
    document.getElementById('nombreCategoria').value = categoria.nombreCategoria
    document.getElementById('descripcionCategoria').value = categoria.descripcionCategoria
    document.getElementById('estadoCategoria').value = categoria.estadoCategoria

};

const actualizarCategoria = async() =>{

    let nombreCategoria = document.getElementById('nombreCategoria').value
    let descripcionCategoria = document.getElementById('descripcionCategoria').value
    let estadoCategoria = document.getElementById('estadoCategoria').value

    let categoria = {
        _id: document.getElementById('_id').value,
        nombreCategoria: nombreCategoria,
        descripcionCategoria: descripcionCategoria,
        estadoCategoria: estadoCategoria,
    }

    if(!nombreCategoria == ''){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(categoria),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
            window.location.href = 'listarCa.html'
 
        })
    }
    else{
        alert('El nombre es obligatorio')
    }
}

const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
    let categoria = {
        _id: _id
    }
    
       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(categoria),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) 
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrarCa'))
{
    document.querySelector('#btnRegistrarCa')
    .addEventListener('click', registrarCategorias)
}

if(document.querySelector('#btnActualizarCa'))
{
    document.querySelector('#btnActualizarCa')
.addEventListener('click', actualizarCategoria)
}
