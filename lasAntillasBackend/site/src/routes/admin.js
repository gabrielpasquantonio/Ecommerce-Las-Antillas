//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"))

//Armo mis rutas
router.get("/admin", controllersAdmin.index);
//Esta es la ruta que carga el formulario
router.get("/create", controllersAdmin.create);
//Esta es la ruta que guarda el formulario
router.post("/create", controllersAdmin.save);
router.get("/detailHabano/:id", controllersAdmin.show);

module.exports = router;