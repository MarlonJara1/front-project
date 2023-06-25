const url = 'https://back-cnji.onrender.com/api/paquete'
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
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${paquete._id}")'>Eliminar</a>
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

    let nombreRegex = /^[a-zA-ZñÑ\s]+$/

    if(nombrePaquete !== '' && nombreRegex.test(nombrePaquete) && parseFloat(precioPaquete) >= 0){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(paquete),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
<<<<<<< HEAD
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: json.mensaje
            }).then(() => {
                window.location.href = 'listarPa.html'
            });
=======
           alert(json.mensaje)
            window.location.href = 'listarPa.html'

>>>>>>> f8c8967d44acd51868e9fbcf032c4ecf60459519
        })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifica los datos ingresados'
        });
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

    let nombreRegex = /^[a-zA-ZñÑ\s]+$/

    if(nombrePaquete !== '' && nombreRegex.test(nombrePaquete) && parseFloat(precioPaquete) >= 0){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(paquete),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json())
        .then(json => {
<<<<<<< HEAD
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: json.mensaje
            }).then(() => {
                location.reload()
            });
=======
           alert(json.mensaje)
            window.location.href = 'listarPa.html'

>>>>>>> f8c8967d44acd51868e9fbcf032c4ecf60459519
        })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifica los datos ingresados'
        });
    }
}

const eliminar =(_id) => {
    Swal.fire({
        title: '¿Está seguro de realizar la eliminación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let paquete = {
                _id: _id
            }

            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(paquete),
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
