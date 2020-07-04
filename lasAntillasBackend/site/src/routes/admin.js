//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"))

//Armo mis rutas
router.get("/admin", controllersAdmin.index);
module.exports = router;