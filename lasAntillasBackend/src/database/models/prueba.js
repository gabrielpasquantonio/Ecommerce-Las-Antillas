// const path = require("path");
// const fs = require('fs');
// const db = require('../database/models');----> la variabble 'db' representa a una base de datos Necesito conectarme a esta base de datos pero ademas hay una serie de modelos que tambien tengo que vincular (Pruduct, User, etc)
// const Product = db.Product----> este product (nombre del modelo ) es el que definimos en Products.js . El orm entiende que es la misma tabla que estaba escrita en plural. 
// module.exports = {

//   //Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
//Aqui se requiere esto para poder buscar
const Op = db.Sequelize.Op;

//Esto es una forma de declarar los Modelos en nuestro controlador

//const Product = db.Product; ---> El 'db' sirve para poder acceder a todos los metodos de base de datos.
//const Category = db.category; ---> Esto tendria que escribir por cada modelo que quiero agregar. 
//const TipoPago = db.TipoPago;

//Otra forma de hacer lo mismo es usando el DESTRUCTURING

//const {Product,Category,TipoPago} = require('../database/models');


module.exports = {
    index: (req,res) =>{
        /*db.sequelize
        .query('select * from products')
        .then(relojes =>{
            return res.send(relojes[0])
        }) 
        .catch(error => res.send(error)) */      

        //res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes});
        //Ahora vamos a trabajar usando los métodos de sequelize
        Product.findAll()   // esto seria como hacer un select * from products
        // Como la respuesta del metodo findAll() puede tardar un poco es que se utiliza una promesa. Para que cuando se obtenga la respuesta se va a ejecutar el siguiennte codigo.  
        .then(relojes =>{ 
            //return res.send(relojes);
            res.render(path.resolve(__dirname, '..', 'views', 'admin', 'adminProductos'),{relojes});
        })
        //En este caso lo que se esta capturando es un error de Base de datos y no de validaciones del Backend. Por lo general, si es que hay un error, en la linea 35 lo que estamos haciendo es mostrar una vista que indique ese error 
        .catch(error => res.send(error))
    },
// A partir de aca es cuando vamos a dejar de trabajar con el archivo Json y empezar a trabajar con el sistema de base de datos.  
    create: (req, res) =>{
      res.render(path.resolve(__dirname, '..','views','admin','createProductos'));
  },
  //  Es fundamental entender que para que todo funcione bien los nombres de los atributos 'name' de los formularios de las vistas tienen que coincidir con los valores de los KEYS de la variable _body. En nuestro proyecto tendriamos que cambiar el formulario de la vista 'createProductos.ejs'.
  save: (req,res)=>{
      //req.body.image = req.file.filename;
      //return res.send(req.body);
      const _body = { 
      //return res.send(_body);
      //Estos son los datos que llegan por el formulario de Create productos en el Crud de Productos. Y tambien se podria aplicar la misma logica al crud de usuarios. Es decir que todos los campos que estan indicados abajo deberian coincidir con los campos de los  formularios de create Productos y Registro de usuarios. Es decir tendrian que estar en el mismo idioma. ( Agregariamos el role de los usuarios para ver los diferentes perfiles)
          name : req.body.nombre,
          description: req.body.descripcion,
          price: req.body.precio,
          discount: req.body.descuento,
          image : req.file.filename
      }    
      //return res.send(_body);
    // a traves de este metodo se podria crear el registro en la base de datos! Osea que con el 'Product.create' estariamos creando el registro en la base de datos.
    Product.create(_body)
    // Nuevamente como la respuesta puede tardar , usamos una promesa para que ejecute el codigo cuando esta respuesta llegue.
      .then(reloj =>{
          res.redirect('/adminProductos');
      })
      //Aca capturamos algun eventual error que pueda aparecer en la base de datos
      .catch(error => res.send(error))
  },
//Hasta aca tendria que poder ver los productos cargados con el metodo create.
//------------------------------------------------------------------------------------------------------
//Con este metodo voy a mostrar los productos de la base de datos
show: (req,res)=>{
    //En este caso los productos vienen viajando por la variable Product. Y luego utilizamos el metodo findByPk que nos proporciona sequelize (para buscar por el primary key) la iformacio que esta viajando en el back end. En este caso se usa el req.params.id porque en la ruta estamos usando las rutas parametrizadas que viaja por la url.
      Product.findByPk(req.params.id)  
      //Como no sabemos en que momento va a venir la respuesta , usamos la promesa. Que nos va a traer la vista del product detail 
      .then(miReloj =>{
          res.render(path.resolve(__dirname, '..','views','admin','detailProductos'), {miReloj})
      })
      //Aca nuevamente vamos a atrapar algun error que venga de la base de dato   
      .catch(error => res.send(error))
  },
  //Con este metodo lo que vamos a poder lograr es borrar los productos del registro. 
  destroy: (req,res) =>{
  //Product representa el nombre del modelo ( la tabla sobre la que estamos trabajando)
    Product.destroy({
    //Luego hay que indicarle que campo hay que borrar. Sino se borraria toda la base directamente. 
    //Para estos pasos vamos a usar el 'where' que es un objeto literal que contiene a su vez otro objeto literal . Basicamente se va a borrar el elemento dentro de la tabla Product en donde el 'id' sea = req.params.id     
          where: {
              id : req.params.id
          }
      })
      //Luego viene una promesa que se va a ejecutar cuando venga la respuesta 
      .then(()=>  res.redirect('/adminProductos'))
      .catch(error => res.send(error))
  },
  //Aca vamos a usar una logica muy similar a la del show
  edit: (req,res) =>{
      Product.findByPk(req.params.id)  
      .then(relojEditar =>{
          res.render(path.resolve(__dirname, '..','views','admin','editProductos'), {relojEditar})
      })  
      .catch(error => res.send(error))        
  },

  update: (req,res) =>{
      /*Les paso la alternativa que usé si alguno quiere verla: Ezequiel
      update: (req,res) =>{
             const _body = {
                 name: req.body.nombre,
                 description: req.body.descripcion,
                 price: req.body.precio,
                 discount: req.body.descuento,
             };
                 if (req.file) {
                     _body.image = req.file.filename
                 };
         
                Product.update(
                    _body,
                    {
                     where:{
                         id: req.params.id
                     }
                    })
                 .then(()=>res.redirect('/administrar'))
                 .catch(error=> res.send(error));
         }*/

      Product.update ({
              name:req.body.nombre,
              price: req.body.precio,
              description : req.body.descripcion,
              discount: req.body.descuento,
              image: req.file ? req.file.filename : req.body.oldImagen
          }, {
              where: {
                  id:req.params.id
             }
          })
          .then(()=> res.redirect('/administrar'))
          .catch(error =>res.send(error))
  },
  //Este codigo sirve para buscar algo en la base de datos
  search: ( req, res) =>{
      Product.findAll({
          where:{
              //el search viene de la vista 
              name: {[Op.like]: `%${req.query.search}%`}
          }
      })
      .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes: resultado});})
      .catch(error => res.send(error))
  }


}
