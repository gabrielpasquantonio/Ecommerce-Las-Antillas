//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');
const mantenimiento = require('../middlewares/mantenimiento.js');

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','habanos'));
  },
  filename: function (req, file, cb) {
    cb(null, 'habano-'+ Date.now() + path.extname(file.originalname));
  }
})
 
const upload = multer({ storage });

//debo requerir el controlador:

const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"))
//Armo mis rutas
router.get("/adminHabanos", controllersAdmin.index);
//Esta es la ruta que carga el formulario
router.get("/createHabanos", controllersAdmin.createHabanos);
//Esta es la ruta que guarda el formulario
router.post("/createHabanos", upload.any('imagen'), controllersAdmin.saveHabanos);
router.get("/detailHabano/:id", controllersAdmin.show);
router.get("/delete/:id", controllersAdmin.destroy);
router.get("/edit/:id", controllersAdmin.edit);
router.put("/edit/:id", upload.any('imagen'), controllersAdmin.updateHabanos);
module.exports = router;