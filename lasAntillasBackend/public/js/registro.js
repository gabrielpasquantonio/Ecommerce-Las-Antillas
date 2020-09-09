// Todo lo que vamos a hacer en este archivo hay que incluirlo dentro de la funcion window , para que se desarrolle despues de que se cargue la pagina 
window.addEventListener('load', function () {
  //En esta seccion vamos a  Capturar los elementos

  let formularios = document.getElementById("formulario");
  let ulErrores = document.getElementById("errores");
  let selectProvincias = document.querySelector("#provincias");
  let formButton = document.querySelector("#form-register-button");

  //  console.log(formulario.elements.nombre.value);
  // Este console log muestra el input que estariamos trayendo. (.elements --> significa que trae todos los inputs del formulario.) (.'nombre' representa lo que esta incluido en el atributo name del formulario  )
    formButton.addEventListener('click', function (evento) {
    if (!validaciones(evento)) {
      return evento.preventDefault();
    }
    return formulario.submit();
  });

  function validaciones(evento) {
    //Aca hago Destructuring de código, para que podamos declarar multiples variables en una linea de codigos.
    //NOTA: ES en esta parte donde nos tenemos que asegurar de que los nombres de las variables coincidan con lo que teniamos declarados en los 'name' de nuestro formulario.
    let {
      nombre,
      apellido,
      email,
      username,
      password,
      confirm_password,
      avatar,
    } = formularios.elements;

    let errores = [];
    //Esto le agrega color rojo a los errores cuando vayan apareciendo
    ulErrores.classList.add("alert-danger");

    //Validacion del nombre. Aca verifico que pasa si el campo nombre este vacio
    if (nombre.value == "") {
      errores.push("El campo nombre no puede estar vacio...");
      //Las siguientes lineas sirven para agregar el borde de color rojo de error a los campos que presenten problemas y ponerlos de color verde cuando superen las pruebas de validacion
      nombre.classList.add("is-invalid");
      nombre.classList.remove("is-valid");
    } else {
      nombre.classList.add("is-valid");
      nombre.classList.remove("is-invalid");
    }

    //Validacion de  apellidos
    if (apellido.value == "") {
      errores.push("El campo apellido no puede estar vacio...");
      apellido.classList.add("is-invalid");
      apellido.classList.remove("is-valid");
    } else {
      apellido.classList.add("is-valid");
      apellido.classList.remove("is-invalid");
    }

    //Validacion  del email  -  usando  (Expresiones Regulares)
    let reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //Javascript posee un método que se encarga de validar nuestras expresiones regulares, ese metodo se llama "test"
    // El metodo Test devuelve un booleano.
    if (!reEmail.test(email.value)) {
      errores.push("El email inválido, por favor ingreselo nuevamente");
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
    }

    //Validacion de  password
    if (password.value == "") {
      errores.push("El campo contraseña no puede estar vacio");
      password.classList.add("is-invalid");
      password.classList.remove("is-valid");
    } else {
      password.classList.add("is-valid");
      password.classList.remove("is-invalid");
    }

    if (username.value == "") {
      errores.push("El campo contraseña no puede estar vacio");
      username.classList.add("is-invalid");
      username.classList.remove("is-valid");
    } else {
      username.classList.add("is-valid");
      username.classList.remove("is-invalid");
    }

    //Validacion de  Confirmacion de password
    if (confirm_password.value == "") {
      errores.push("Este campo no puede estar vacio");
      confirm_password.classList.add("is-invalid");
      confirm_password.classList.remove("is-valid");
    } else {
      confirm_password.classList.add("is-valid");
      confirm_password.classList.remove("is-invalid");
    }

    if (avatar.value == "") {
      let avatarErrorMessage = document.getElementById("avatar-error-message");
      errores.push("Este campo no puede estar vacio");
      avatarErrorMessage.style.display = "inline-block"
      avatarErrorMessage.style.color = "red"
    } else {
      avatarErrorMessage.style.display = "none"
      }

    //Aquí es cuando yo controlo si hay o no errores para enviar o no al usuario
    if (errores.length > 0) {
      //Esto hace que cuando se vuelva a cargar la pagina no queden guardado los datos que habiamos completado en el fomulario
      ulErrores.innerHTML = "";
      for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML += `<li>${errores[i]}</li>`;
      }
    } else {
      //Si no hay errores entonces aca esto va hacer  que se ejecute el codigo del submit
      return true;
    }
  }
  //-------------------------------A partir de aqui vamos a consumir la API para cargar las provincias-----------------------

  //Aquí vamos a trabajar con el consumo de API
  //Debemos llamar a la función
  cargarProvincias();
//A continuacion esta la funcion para poder cargar de manera dinamica las provincias
  function cargarProvincias() {
    //Primero tenemos que ir contra el url de la appi que queremos consumir , y traerlo mediante el metodo fetch. Como  esta funcion va a trabajar de forma asincrona , vamos a usar promesas   
    fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
      .then(function (respuesta) {
    //IMPORTANTE : como la info que viene desde la api viene en formato Json hay que usar ese metodo para poder trabajarla.
        return respuesta.json();
      })
      .then(function (datosProvincias) {
        //Aca hacemos un  console.log(datosProvincias) para ver que es lo que esta llegando. La informacion que nos interesa esta contenida en el key "provincias".
        for (const opcionProvincia of datosProvincias.provincias) {
        //En estas lineas a continuacion vamos a crear las opciones mediante el metodo "create element"
          let opcionesProvincias = document.createElement("option");
        //Aca le estamos asignando a cada provincia un atributo (mediante un setAttribute) y el valor de ese atributo va a ser el id.  
          opcionesProvincias.setAttribute("value", opcionProvincia.id);
          //Aca le estamos asignando el nombre de esa provincia
          opcionesProvincias.innerHTML = opcionProvincia.nombre;
          //aca estamos agregando al select,  cargando los elementos y las opciones que creamos en las lineas anteriores. 
          selectProvincias.appendChild(opcionesProvincias);
        }
      })
      .catch((error) => console.error(error));
  }
});



  


