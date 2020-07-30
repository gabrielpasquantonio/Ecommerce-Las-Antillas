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

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storageCigarro = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','cigarros'));
  },
  filename: function (req, file, cb) {
    cb(null, 'cigarro-'+ Date.now() + path.extname(file.originalname));
  }
})
 
const uploadCigarro = multer({ storageCigarro });

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storageCigarrito = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','cigarritos'));
  },
  filename: function (req, file, cb) {
    cb(null, 'cigarrito-'+ Date.now() + path.extname(file.originalname));
  }
})
 
const uploadCigarrito = multer({ storageCigarrito });

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storageTabacosPipa = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','tabaco_pipas'));
  },
  filename: function (req, file, cb) {
    cb(null, 'tabaco_pipas-'+ Date.now() + path.extname(file.originalname));
  }
})
 
const uploadTabacosPipa = multer({ storageTabacosPipa });

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storageTabacosCigarro = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','tabaco_cigarros'));
  },
  filename: function (req, file, cb) {
    cb(null, 'tabaco_cigarros-'+ Date.now() + path.extname(file.originalname));
  }
})
 
const uploadTabacosCigarro = multer({ storageTabacosCigarro });

//debo requerir el controlador:

const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"))
//Armo mis rutas
router.get("/adminProductos", controllersAdmin.indexProductos);
//router.get("/adminHabanos", controllersAdmin.index);
//router.get("/adminCigarros", controllersAdmin.indexCigarros);
//router.get("/adminCigarritos", controllersAdmin.indexCigarritos);
//router.get("/adminTabacosPipa", controllersAdmin.indexTabacosPipa);
//router.get("/adminTabacosCigarro", controllersAdmin.indexTabacosCigarro);
//Esta es la ruta que carga el formulario
router.get("/createProductos", controllersAdmin.createProductos);


// router.get("/createHabanos", controllersAdmin.createHabanos);
// router.get("/createCigarros", controllersAdmin.createCigarros);
// router.get("/createCigarritos", controllersAdmin.createCigarritos);
// router.get("/createTabacosPipa", controllersAdmin.createTabacosPipa);
// router.get("/createTabacosCigarro", controllersAdmin.createTabacosCigarro);
//Esta es la ruta que guarda el formulario
router.post("/createProductos", upload.any('imagen'), controllersAdmin.saveProductos);


// router.post("/createHabanos", upload.any('imagen'), controllersAdmin.saveHabanos);
// router.post("/createCigarros", uploadCigarro.any('imagen2'), controllersAdmin.saveCigarros);
// router.post("/createCigarritos", uploadCigarrito.any('imagen3'), controllersAdmin.saveCigarritos);
// router.post("/createTabacosPipa", uploadTabacosPipa.any('imagen4'), controllersAdmin.saveTabacosPipa);
// router.post("/createTabacosCigarro", uploadTabacosCigarro.any('imagen5'), controllersAdmin.saveTabacosCigarro);
router.get("/detailProductos/:id", controllersAdmin.showProductos);

// router.get("/detailHabano/:id", controllersAdmin.show);
// router.get("/detailCigarro/:id", controllersAdmin.showCigarro);
// router.get("/detailCigarrito/:id", controllersAdmin.showCigarrito);
// router.get("/detailTabacosPipa/:id", controllersAdmin.showTabacosPipa);
// router.get("/detailTabacosCigarro/:id", controllersAdmin.showTabacosCigarro);
router.get("/deleteProductos/:id", controllersAdmin.destroyProductos);

// router.get("/delete/:id", controllersAdmin.destroy);
// router.get("/deleteCigarro/:id", controllersAdmin.destroyCigarro);
// router.get("/deleteCigarrito/:id", controllersAdmin.destroyCigarrito);
// router.get("/deleteTabacosPipa/:id", controllersAdmin.destroyTabacosPipa);
// router.get("/deleteTabacosCigarro/:id", controllersAdmin.destroyTabacosCigarro);
router.get("/edit/:id", controllersAdmin.edit);
router.put("/edit/:id", upload.any('imagen'), controllersAdmin.updateHabanos);
router.get("/editCigarros/:id", controllersAdmin.editCigarros);
router.get("/editCigarritos/:id", controllersAdmin.editCigarritos);
router.get("/editTabacosPipa/:id", controllersAdmin.editTabacosPipa);
router.get("/editTabacosCigarro/:id", controllersAdmin.editTabacosCigarro);
router.put("/editCigarros/:id", uploadCigarro.any('imagen2'), controllersAdmin.updateCigarros);
router.put("/editCigarritos/:id", uploadCigarrito.any('imagen3'), controllersAdmin.updateCigarritos);
router.put("/editTabacosPipa/:id", uploadTabacosPipa.any('imagen4'), controllersAdmin.updateTabacosPipa);
router.put("/editTabacosCigarro/:id", uploadTabacosCigarro.any('imagen5'), controllersAdmin.updateTabacosCigarro);
module.exports = router;
