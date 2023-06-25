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
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${categorias._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje    
            }   
            )
        })
    }
}

listarCategorias()

const registrarCategorias = async () => {
    let nombreCategoria = document.getElementById('nombreCategoria').value
    let descripcionCategoria = document.getElementById('descripcionCategoria').value
    let estadoCategoria = document.getElementById('estadoCategoria').value

    let categoria = {
        nombreCategoria: nombreCategoria,
        descripcionCategoria: descripcionCategoria,
        estadoCategoria: estadoCategoria,
    }

    let nombreRegex = /^[a-zA-ZñÑ\s]+$/

    if (nombreRegex.test(nombreCategoria)) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(categoria),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: json.mensaje
                }).then(() => {
                    window.location.href = 'listarCa.html';
                });
            })
         }
            else {
                 Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Verifica los datos ingresados'
            });

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
    let nombreRegex = /^[a-zA-ZñÑ\s]+$/

    if (nombreRegex.test(nombreCategoria)) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(categoria),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: json.mensaje
                }).then(() => {
                    location.reload();
                });
                
            })
         }
            else {
                 Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Verifica los datos ingresados'
            });
}
}
const eliminar = (_id) => {
    Swal.fire({
        title: '¿Está seguro de realizar la eliminación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let categoria = {
                _id: _id
            }

            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(categoria),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then(json => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: json.mensaje
                }).then(() => {
                    location.reload();
                });
            })
        }
    });
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
