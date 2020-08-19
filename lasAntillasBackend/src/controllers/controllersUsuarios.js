const path = require("path");
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const {
    check,
    validationResult,
    body
  } = require('express-validator');



module.exports = {
  registro: (req, res) => {
    res.render(
      path.resolve(__dirname, "..", "views", "usuarios", "registro.ejs")
    );
  },

  create: (req, res) => {
    // Aca dentro de la variable  'Errors' tengo que guardar lo que me trae "validationResult" que es la variable que trae desde la ruta , el resultado de las variaciones del middleware. (Es uno de los valores que utilizamos con nuestro Express validator en la linea 8).
    let errors = validationResult(req);
    // En este caso si la variable 'errors' esta vacia , quiere decir que no hay errores. Entonces se empieza a ejecutar las lineas subsiguientes y se guarda la informacion del usuario.
    //Nota: toda la informacion vino viajando a traves del metodo 'Post' por el formulario es por eso que las recibimos con el.body.  A su vez todos los campos vienen de los atributos 'name' que estaban indicados en el formulario.

    if (errors.isEmpty()) {
      let todosUsuariosJson = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json"))
      );
      let user = {
        id: todosUsuariosJson.length + 1,
        nombre: req.body.first_name,
        apellido: req.body.last_name,
        email: req.body.email,
        //En esta linea hacemos uso del 'bcrypt' para hacer la encriptacionn y el hasheo del password. El n 10 indica la cantidad de caracteres aleatoreo que se va  a incorporar al hasheo.
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.file ? req.file.filename : "",
        role: 1,
      };
      // A partir de esta linea de codigo hasta la linea 52 Estoy GUARDANDO LOS DATOS DE ESTE USUARIO QUE PASO LAS VALIDACIONES. Luego en la linea 53 , cuando el usuario esta registrado , lo envio hacia el Login para que pueda iniciar su cesion

      let archivoUsers = fs.readFileSync(
        path.resolve(__dirname, "../data/usuarios.json"),
        {
          encoding: "utf-8",
        }
      );
      let users;
      if (archivoUsers == "") {
        users = [];
      } else {
        users = JSON.parse(archivoUsers);
      }

      users.push(user);
      usersJSON = JSON.stringify(users, null, 2);
      fs.writeFileSync(
        path.resolve(__dirname, "../data/usuarios.json"),
        usersJSON
      );
      res.redirect("/login"); // --> Aca envio al usuario a la vista del login para que siga el proceso.

      //En el caso de que existan errores en la  validacion se va a empezar a ejecutar la siguiente linea de codigo.
    } else {
      //return res.send(errors);

      //Aquí incoporé el old: req.body  --> Para poder enviar a la vista los datos que el usuario indique y no tienen errores entonces deben persistir lo que coloco el usuario

      //Si desean especificar debajo de cada input el mensaje de error específico, entonces deben enviar a la vista los errores de la siguiente manera: errors: errors.mapped()
      //Después en la vista para mostrar debajo del input el respectivo error sólo deben hacer lo siguiente:
      /*
          <div class="form-group">
              <input type="email" class="form-control" name="email" placeholder="Email" value="<%=typeof old == 'undefined' ? '':old.email %>">
              
                  <% if(typeof errors != 'undefined' && errors.email){%>
              <span class="text-danger" > <%= errors.email.msg %></span>
              <%}%>
          </div>         
          */

      // En esta parte del codigo llamo a la vista de registro y le paso los errores que ocurrieron.
      return res.render(path.resolve(__dirname, "../views/usuarios/registro"), {
        errors: errors.errors,
        // Aca muestro lo que el usuario tipeo. Esta variable 'old' es la que juega en el lado de la vista del formulario
        old: req.body,
      });
    }
  },

  login: (req, res) => {
    res.render(path.resolve(__dirname, "..", "views", "usuarios", "login.ejs"));
  },
  ingresar: (req, res) => {
    //En la variable errors vamos a guardar lo que viene en ValidationResult y precisamente dentro de ella lo que viene dentro del request. (Parecido a lo que hicimos a la hora de programar en el registro de usuarios)
    const errors = validationResult(req);
    // return res.send(errors.mapped()); ---> Esto es una forma de ver el error que vendria viajando si es que existiera uno

    // A partir de aca vamos a programar que pasa si NO existe ningun error.

    if (errors.isEmpty()) {
      //Aca tenemos que parsear el archivo Json antes de leerlo.
      let archivoUsers = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../data/usuarios.json"))
      );

      //Tenemos que buscar si el usuario que entro existe o no dentro del usuario que se acaba de loguear. Para ello usamos el metodo 'find'
      let usuarioLogueado = archivoUsers.find(
        (usuario) => usuario.email == req.body.email
      );

      //ACA ES IMPORTANTE, POR UNA CUESTION DE SEGURIDAD BORRAR EL DATO QUE ESTE VIAJANDO DEL USUARIO. Por lo general lo que se borra es el password (ya que es un dato critico). Pero se puede borrar cualquier tipo de dato que llegue. Se borra el dato que viene viajando pero NO del JSOn
      //Asi seria el codigo.
      delete usuarioLogueado.password;

      //----Aquí voy a guardar en session al usuario. ACA Se crea la variable de sesion ----------
      //Aca en mi variable de sesion estaria guardando el usuario que se esta logueando
      //El req.session guarda la variable de sesion. Aca se guarda del lado del servidor
      req.session.usuario = usuarioLogueado;
      // ACA ESTOY PROGRAMANDO EL CASO DE QUE EL USUARIO HAGA CLICK EN EL CUADRITO DE 'RECORDARME' QUE ESTA EN LA VISTA DE LOGIN PARA QUE SE GUARDE LA SESION EN LA QUE ESTA ENTRANDO.
      //El 'recordarme' viene de la vista login.
      if (req.body.recordarme) {
        // Aca es donde se Crea la cookie de ese usuario. Esta sesion se guarda en la memoria del navedgador los datos que ingreso el usuario. Generalmente se mandan 3 datos:  'Email' representa el nombre que le voy a dar a la cookie, que a su vez representa el 'email' del usuario que quiero guardar. Luego tengo que pasar como parametro el usuario logueado. Luego como tercer parametro le paso un objeto literal que guardaria el tiempo que que permanezca activada la cookie (en este caso serian 24 hs)  , que seria el que viaja del formulario.
        res.cookie("email", usuarioLogueado.email, {
          maxAge: 1000 * 60 * 60 * 24,
        });
      }
      // Luego una vez logueado voy  a mandar al usuario a la vista del home.
      res.redirect("/");

      // A partir de aca vamos a programar que pasa si  existe algun error.
      //En este caso voy a mandar al usuario a la vista del login , y en el caso de que existan errores quiero que pases a la vista de los mismos mapeados (resumidos) . Ademas en el caso de que existan datos esten correctos quiero que los muestre tambien. Para ello escribimos el codigo: {
      // errors: errors.mapped(),  old: req.body});
    } else {
      return res.render(path.resolve(__dirname, "../views/usuarios/login"), {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  //Aca estamos matando la sesion y la cookie
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("email", null, { maxAge: -1 });
    res.redirect("/");
  },

  indexUsers: (req, res) => {
    //Aca pasamos los datos del archivo Json de los Productos a un Array de una manera parametrizada
    let todosUsuariosJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json"))
    );

    res.render(
      path.resolve(__dirname, "..", "views", "admin", "adminUsers.ejs"),
      { todosUsuariosJson }
    );
  },

  createUser: (req, res) => {
    const todosUsuariosJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json"))
    );

    res.render(
      path.resolve(__dirname, "..", "views", "admin", "createUser.ejs"),
      { todosUsuariosJson }
    );
  },

  saveUsers: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosUsuariosJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json"))
    );

    //res.send(req.body);
    //Aqui indico el formato de como se va a guardar la informacion del producto

    let nuevoUsuario = {
      id: todosUsuariosJson.length + 1,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
      avatar: req.files.length > 0 ? req.files[0].filename : "default.jpg",
    };
    //Aquí se agrega al array el nuevo Producto
    todosUsuariosJson.push(nuevoUsuario);
    //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
    let nuevoUsuarioGuardar = JSON.stringify(todosUsuariosJson, null, 2);
    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
    fs.writeFileSync(
      path.resolve(__dirname, "..", "data", "usuarios.json"),
      nuevoUsuarioGuardar
    );
    //Aqui redireccionamos los nuevos productos a la vista administrar
    res.redirect("/adminUsers");
  },

  showUsers: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosUsuariosJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json"))
    );

    let miUsuario;
    todosUsuariosJson.forEach((todoUsuarioJson) => {
      if (todoUsuarioJson.id == req.params.id) {
        miUsuario = todoUsuarioJson;
      }
    });

    //Aca pongo lo que le voy a mandar a la vista
    res.render(
      path.resolve(__dirname, "..", "views", "admin", "detailUsers.ejs"),
      { miUsuario }
    );
  },

  destroyUsers: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosUsuariosJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json"))
    );
    //Esta variable va a guardar el habano que se va a borrar
    const userDeleteId = req.params.id;
    //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
    const usersFinal = todosUsuariosJson.filter(
      (todoUsuarioJson) => todoUsuarioJson.id != userDeleteId
    );
    //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
    let usersGuardar = JSON.stringify(usersFinal, null, 2);
    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
    fs.writeFileSync(
      path.resolve(__dirname, "..", "data", "usuarios.json"),
      usersGuardar
    );
    //Aqui redireccionamos los nuevos productos a la vista administrar
    res.redirect("/adminUsers");
  },

  editUsers: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosUsuariosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json")));
    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla .
    const usuarioId = req.params.id;

    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
    let usuarioEditar = todosUsuariosJson.find((todoUsuarioJson) => todoUsuarioJson.id == usuarioId);
    //Aca pongo lo que le voy a mandar a la vista
    res.render(
      path.resolve(__dirname, "..", "views", "admin", "editUsers.ejs"),
      { usuarioEditar }
    );
  },

  updateUsers(req, res) {
    let todosUsuariosJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "..", "data", "usuarios.json")));
    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla
    req.body.id = req.params.id;
    //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit).
    //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior.
    // req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
    //Aca voy a contener el nuevo habano que ya se actualizo
    let usersUpdate = todosUsuariosJson.map((todoUsuarioJson) => {
      if (todoUsuarioJson.id == req.body.id) {
        req.body.avatar = req.files.length > 0 ? req.files[0].filename : todoUsuarioJson.avatar;
        return (todoUsuarioJson = req.body);
      }

      return todoUsuarioJson;
    });
    let usersActualizar = JSON.stringify(usersUpdate, null, 2);
    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
    fs.writeFileSync( path.resolve(__dirname, "..", "data", "usuarios.json"),usersActualizar);
    //Aqui redireccionamos los nuevos productos a la vista administrar
    res.redirect('/adminUsers');
  },
};

