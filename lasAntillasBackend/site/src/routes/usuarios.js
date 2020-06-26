//Seteo del entorno de trabajo para la creacion de rutas

const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersUsuarios = require(path.resolve(__dirname, "..", "controllers", "controllersUsuarios.js"))

//Armo mis rutas
router.get("/login", controllersUsuarios.login);
module.exports = router;