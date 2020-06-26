//Seteo del entorno de trabajo para la creacion de rutas

const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersBolivar = require(path.resolve(__dirname, "..", "controllers", "controllersBolivar.js"))

//Armo mis rutas
router.get("/bolivar", controllersBolivar.index);
module.exports = router;