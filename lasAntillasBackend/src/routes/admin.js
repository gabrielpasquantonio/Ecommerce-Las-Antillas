//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');
const mantenimiento = require('../middlewares/mantenimiento.js');

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images',`${req.body.tipo}`));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.tipo}-`+ Date.now() + path.extname(file.originalname));
  }
})
 
const upload = multer({ storage });


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



router.get("/detailProductos/:id", controllersAdmin.showProductos);

router.get("/deleteProductos/:id", controllersAdmin.destroyProductos);

router.get("/editProductos/:id", controllersAdmin.editProductos);
router.put("/editProductos/:id", upload.any('imagen'), controllersAdmin.updateProductos);
// router.get("/editCigarros/:id", controllersAdmin.editCigarros);
// router.get("/editCigarritos/:id", controllersAdmin.editCigarritos);
// router.get("/editTabacosPipa/:id", controllersAdmin.editTabacosPipa);
// router.get("/editTabacosCigarro/:id", controllersAdmin.editTabacosCigarro);
// router.put("/editCigarros/:id", uploadCigarro.any('imagen2'), controllersAdmin.updateCigarros);
// router.put("/editCigarritos/:id", uploadCigarrito.any('imagen3'), controllersAdmin.updateCigarritos);
// router.put("/editTabacosPipa/:id", uploadTabacosPipa.any('imagen4'), controllersAdmin.updateTabacosPipa);
// router.put("/editTabacosCigarro/:id", uploadTabacosCigarro.any('imagen5'), controllersAdmin.updateTabacosCigarro);
module.exports = router;
