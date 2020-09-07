//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require('bcryptjs');

//Requiero fs ya que debo leer el archivo json de usuarios y verificar si el usuario que se está reistrando existe o no
const fs = require('fs');

//Requiero Multer, ya que voy a permitir que el usuario que se registre suba su avatar
const multer = require('multer');




//Requiero el paquete express-validator que ya habiamos instalado. Como a esta constante le vamos a pasar mas de un parametro lo hacemos dentro de un objeto literal
const {
    check,//-> Este parametro nos va a indicar si nuestros campos tienen o no tienen algun tipo de deatlle.
    validationResult, //--> Almacena los errores si es que llegan a existir.
    body//--> Guarda el dato que estaria viajando desde nuestro formulario
  }
 = require('express-validator');

//debo requerir el modulo del controlador:

const controllersUsuarios = require(path.resolve(__dirname, "..", "controllers", "controllersUsuarios.js"))

//Aquí abro mi archivo de usuarios, ya que al registrarse un usuario es conveniente buscar que no exista una ya registrado con el mismo email o id o el campo que utlicen para identificar al usuario.

let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','usuarios'));
  },
  filename: function (req, file, cb) {
    cb(null, "usuario" + "-" + req.body.nombre + ' ' + req.body.apellido);
  }
})
 
const upload2 = multer({ storage: storage2 });

//Aquí se incorpora lo referido a la carga de la imagen

//Aquí dispongo la información del storage para tratamiento de guardado imagenes
//https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/images/usuarios'));    //Aquí deben indicar donde van a guardar la imagen
  },
  filename: function (req, file, cb) {
    cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
  }
})
 
const upload= multer({ storage })



// Métodos en nuestros controladores: index - show - edit - delete- update -logout
//Aquí disppongo mis rutas
router.get('/registro', controllersUsuarios.registro);

//------------------------------------------------------------------------------------------


//Aqui en esta ruta envio al controlador todo el registro del usuario así como las respectivas validaciones

router.post('/registro', upload.single('avatar'),[
  //Aca se hace la primera validacion para que el campo de llenar el nombre no este vacio. NOTA: El valor del "first_name" viene de lo que viaje por el atributo name en el formulario en la vista. 
  check('first_name').isLength({
        min: 1
      }).withMessage('El campo nombre no puede estar vacío'),
//Aca se hace la primera validacion para que el campo de llenar el apellido no este vacio.
    check('last_name').isLength({min: 1
      }).withMessage('El campo apellido no puede estar vacío'),
//Aca se hace la primera validacion para que el campo de llenar el email no este vacio.
    check('email').isEmail().withMessage('Agregar un email válido'),

    //Aquí incoporé otras validaciones, para que las tengan de guía en sus proyectos

    //Aquí valido si el usuario ya está registrado en nuestro archivo JSON, esta es una forma

    body('email').custom( (value) =>{
        for (let i = 0; i < archivoUsuarios.length; i++) {
            if (archivoUsuarios[i].email == value) {
                return false    //Si esto se cumple entonces muestra el mensaje de error
            }
        }
        return true   //De no encontrase el email entonces no muestra el mensaje de error
    }).withMessage('Usuario ya se encuentra registrado...'),

    //Aquí valido el Password   
    check('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
    
    //Aquí valido la confimación del password dispuesto por el usuario. El mismo debe tener como minimo 6 caracteres
    check('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

    //Aquí valido si las contraseñas son iguales o no
    //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
    //El valor { req } corresponde a lo que viene desde el formulario

    body('confirm_password').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    // Si yo retorno un true  no se muestra el error     
        }else{
            return false   // Si retorno un false si se muestra el error
        }    
    }).withMessage('Las contraseñas deben ser iguales'),

    //Aquí obligo a que el usuario seleccione su avatar
    body('avatar').custom((value, {req}) =>{
        if(req.file != undefined){
            return true
        }
        return false;
    }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')
  ], controllersUsuarios.create);

//----------Aca empiezan las rutas para el LOGIN-----------------------------------------

router.get('/login', controllersUsuarios.login);
//Dentro de la ruta vamos a armar los middlewares de validacion. Estos middlewares van a ser muy similares a los que usamos para el registro de los usuarios.
// Notese que vamos a cambiar el nombre al metodo ya que este va a ser el que va a servir para "ingresar a la plataforma" 

router.post('/login', [
//Aca empiezan las verificaciones de los datos del email

//En esta validacion verificamos si el email ingresado es valido. Osea que este bien escrito. 
  check('email').isEmail().withMessage('Agregar un email válido'),
//Aca validamos si el mail que el usuario coloca es el mismo que se encuentra guardado en el archivo Json. 'email'= a lo que viaja por el name. 'custom' es el metodo personalizado de verificacion. El value es el valor que esta siendo enviado por el usuario. 
  body('email').custom( (value) =>{
    for (let i = 0; i < archivoUsuarios.length; i++) {
        if (archivoUsuarios[i].email == value) {
            return true    //Si esto se cumple entonces NO se  muestra el mensaje de error
        }
    }
    return false   //De no encontrase el email entonces si se muestra el mensaje de error
}).withMessage('El Usuario no se encuentra registrado...'),

// Aca empiezan las verificaciones del password
//Aca verifico que el password tenga como minimo 6 caracteres.
check('password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),
// En este caso verificamos que las constrasenas coincidan con la que esta guardada en el objeto Json . El {req} esta asi porque lo que viaja es un objeto literal. 
body('password').custom((value, {req}) =>{
  for (let i = 0; i < archivoUsuarios.length; i++) {
    //Aca tengo que hacer una primera validacion de que haya una coincidencia con el usuario que haya puesto el mismo email.
    if (archivoUsuarios[i].email == req.body.email) {
      if(bcrypt.compareSync(value,archivoUsuarios[i].password)){  
      return true    //Si esto se cumple entonces NO se  muestra el mensaje de error
    }else {
      return false
    }
    
  }
}
   //De no encontrase el email entonces si se muestra el mensaje de error
}).withMessage('El password no coincide con el de nuestros registros. Por favor intentelo nuevamente...') ] , controllersUsuarios.ingresar );

router.get('/logout', controllersUsuarios.logout);

//-----------------A pertir de aca vamos a hacer las rutas para el CRUD de usuarios------------------------------------



//Armo mis rutas
router.get("/adminUsers", controllersUsuarios.indexUsers);
router.get("/createUser", controllersUsuarios.createUser);
router.post("/createUser", upload2.any("avatar"),controllersUsuarios.saveUsers);
router.get("/detailUsers/:id", controllersUsuarios.showUsers);
router.get("/deleteUsers/:id", controllersUsuarios.destroyUsers);
router.get("/editUsers/:id", controllersUsuarios.editUsers);
router.put("/editUsers/:id",upload2.any("avatar"),controllersUsuarios.updateUsers);


module.exports = router;