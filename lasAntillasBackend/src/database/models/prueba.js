// const path = require("path");
// const fs = require('fs');
// const db = require('../database/models');
// //Dendtro de la base de datos quiero que me traigas ese modelo ( es el que creamos en el archivos Products.js)
// const products = db.products;

// module.exports = {

//   /*
//   index: (req, res) => {
//   db.sequelize
//   .query(' select * from products')
//   .then(relojes => {
//   return res.send(relojes)
//   })
//   .catch(error => res.send(error))
//   }
//   res.render(path.resolve(__dirname, "..","views","admin", 'administrar'),{relojes});
// */

// //Ahora vamos a trabajar usando los metodos de sequelize
// db.products.findAll()// Aca estariamos usando el metodo de sequelize para que llame a todos los registros seria como hacer un Select * from products en la base de datos.
// .then(relojes=> {
//   return res.send(relojes);
// })
// .catch(error => res.send(error))

// }
