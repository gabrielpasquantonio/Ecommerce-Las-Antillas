const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
//Requerir Sessión Cookies----------------
const session = require('express-session');
const cookies = require('cookie-parser');
//----------------------------------------
// Aca requiero el middleware de aplicacion

const acceso = require('./middlewares/acceso');

const db = require('./database/models')
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;
//Aca esta el codigo que nos va a servir para los usuarios
// users.findAll(
//   {
//     raw: true,
//     include: rols
//   },
// )
// .then(tati => { 
//   console.log('Traigo todos los registros de users', tati);
// })     
// .catch(error => console.log('error', error)) 
//----------------------------------------------------------

//Aca esta el codigo que nos va a servir para traer todos los productos con sus categorias brands y atributos
products.findAll(
  {
    // include: [categories, brands, atributes],
    include: [
      {
        model: categories,
        attributes: ['name']
      },
      {
        model: brands,
        attributes: ['name']
      },
      {
        model: atributes,
        attributes: ['name'],
        through: {
          // This block of code allows you to retrieve the properties of the join table
        model: atributeProduct,
        attributes: ['value'],
        }
      }    
    ],
    attributes: ['id', 'image'],
    limit: 1,
    where: {
      category_id: 3
    },
  }
)
.then(obj => { 
  console.log('logging products', JSON.stringify(obj, null, 4));
})     
.catch(error => console.log('error', error)) 

// products.findAll(
//   {
//     // include: [categories, brands, atributes],
//     include: [categories],
//     limit: 1
//   }
// )
// .then(obj => { 
  
//   console.log('logging products', JSON.stringify(obj, null, 4));
//   const objeto = {
//     tipo: obj[0].Category.name,
//     id: obj[0].id,
//   }
//   console.log(objeto);
// }
// )     
// .catch(error => console.log('error', error)) 

// {
//     "id": 3,
//     "tipo": "Habanos",
//     "nombre": "Habano 3",
//     "marca": "Habano Z",
//     "descripcion": "Some quick example text to build on the card title and make up the bulk of the card's content.",
//     "precio": 500,
//     "descuento": 0,
//     "imagen": "habano3.jpg"
//   },
//Aca debemos requerir el middleware de aplicacion de mantenimiento. Nota: No usamos el metodo path ya que estamos dentro de la raiz
//const mantenimiento = require('./middlewares/mantenimiento.js');

//--------------- ESTA ES LA SESION DE MIDDLEWARES-----------------------------


//Aca estoy indicando a express la carpeta donde se encuentran los archivos estaticos.
app.use(express.static(path.resolve(__dirname, "..", "public")));
//Aca indicamos que estamos usando el motor de plantillas EJS
app.set('view engine','ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

//Aca uso el Midddleware de session 
app.use(session({
  //Aca le pasamos un objeto literal que va a tener los siguientes elementos que son indispensables para que el middleware pueda trabajar:
  secret : 'TopSecret',//----> Este valor puede ser cualquiera. Actua como una especie de token unico que identifica la sesion en la que estamos trabajando 
  resave : true,//---> Cada vez que entramos a una pag se crea un espacio nuevo que seria una sesion .
  saveUninitialized : true 
}));

//Aqui coloco el Middleware para activar lo referido a las cookies. Aca se podria agregar dentro del parentesis se puede indicar el tiempo que va a durar la sesion de la cookie 
app.use(cookies());


//Aquí requiero el Middleware que controla si el usuario está o no Logueado
app.use(acceso);


//Aca llamo a mi middleware de aplicacion
//app.use(mantenimiento);


const webRouter = require("./routes/web.js")
const usuariosRouter = require("./routes/usuarios.js")
const productosRouter = require("./routes/productos.js")
const adminRouter = require("./routes/admin.js")

app.use(webRouter);
app.use(usuariosRouter);
app.use(productosRouter);
app.use(adminRouter);
//Activar el servidor

app.listen(4000, "localhost", () => console.log("Servidor corriendo en el puerto 4000"));