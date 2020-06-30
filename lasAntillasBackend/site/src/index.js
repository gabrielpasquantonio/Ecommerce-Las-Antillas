const express = require("express");
const app = express();
const path = require("path");

//Aca estoy vinculando los archivos css
app.use(express.static(path.resolve(__dirname, "..", "public")));


const webRouter = require("./routes/web.js")
const usuariosRouter = require("./routes/usuarios.js")


app.use(webRouter);
app.use(usuariosRouter)
//Activar el servidor

app.listen(4000, "localhost", () => console.log("Servidor corriendo en el puerto 4000"));