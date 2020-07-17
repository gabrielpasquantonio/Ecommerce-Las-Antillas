const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

//Aca debemos requerir el middleware de aplicacion de mantenimiento. Nota: No usamos el metodo path ya que estamos dentro de la raiz
//const mantenimiento = require('./middlewares/mantenimiento.js');

//Aca estoy vinculando los archivos css
app.use(express.static(path.resolve(__dirname, "..", "public")));
//Aca indicamos que estamos usando el motor de plantillas EJS
app.set('view engine','ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

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