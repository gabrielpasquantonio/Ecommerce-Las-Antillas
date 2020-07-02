//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersProductos = require(path.resolve(__dirname, "..", "controllers", "controllersProductos.js"))

//Armo mis rutas
router.get("/habanos", controllersProductos.habanos);
router.get("/productDetail", controllersProductos.productDetail);
router.get("/cigarros", controllersProductos.cigarros);
router.get("/cigarritos", controllersProductos.cigarritos);
router.get("/tabacos", controllersProductos.tabacos);
module.exports = router;