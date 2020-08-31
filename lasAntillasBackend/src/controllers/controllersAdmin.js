const path = require("path");
const fs = require('fs');
const db = require('../database/models')
// const rols = db.Rol;
// const users = db.User;
// const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;
const brandCategory = db.BrandCategory;

const ProductDao = require('../data/productoDao')
const atributeDao = require('../data/atributeDao');

module.exports = {
    indexProductos: async (req, res) => {
      //parametrizando para que la primera letra de files View sea mayuscula                
      //Aca pasamos los datos del archivo Json de los Productos a un Array de una manera parametrizada
      const todosProductosFromDBByType = await ProductDao.getProductsByCategory(req.query.type)
      res.render(path.resolve(__dirname, "..", "views", "admin", "adminProductos.ejs"),{todosProductosJson: todosProductosFromDBByType});
    },

    createProductos: async (req, res) => {
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const parseType = JSON.parse(req.query.type);

      const marcasFromDb = await categories.findOne({
        include: [
          {
            model: brands,
            attributes: ["name", "id"]
          },
        ],
        where: {
          id: parseType.id,
        },
      });
      const marcas = marcasFromDb.Brands.map(marca => marca)
      res.render(path.resolve(__dirname, "..", "views", "admin", "createProductos.ejs"),{productType: parseType, marcas});
    },
    
    saveProductos: async (req, res) => {
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const productType = JSON.parse(req.body.tipo) 
      const newProduct = {
        brand_id: req.body.marca,
        category_id: productType.id,
        image: req.files.length > 0 ? req.files[0].filename: "default.jpg",
      }

      const newProductFromDb = await ProductDao.createProduct(newProduct);
      const productAtributeType = await ProductDao.getAtributesTypeByCategory(productType.id)

      let atribute = await atributeDao.getAtributeByName(productAtributeType.priceType)
      await atributeProduct.create({
        atribute_id: atribute.id,
        product_id: newProductFromDb.id,
        value: req.body.precio
      })

      atribute = await atributeDao.getAtributeByName(productAtributeType.nameType)
      await atributeProduct.create({
        atribute_id: atribute.id,
        product_id: newProductFromDb.id,
        value: req.body.nombre
      })
      res.redirect(`/adminProductos/?type=${productType.id}`)
    },

    showProductos: async (req,res) =>{
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const miProducto = await ProductDao.getProductById(req.params.id);
      //Aca pongo lo que le voy a mandar a la vista 
      res.render(path.resolve(__dirname, '..','views','admin','detailProductos.ejs'), {miProducto})
    },

    destroyProductos: async (req, res) => {
      const product = await ProductDao.deleteById(req.params.id);
      res.redirect(`/adminProductos/?type=${req.query.type}`);
    },

    editProductos: async (req,res) => {
      //Aca pasamos los datos del archivo Json de Habanos a un Array
      const productoEditar = await ProductDao.getProductById(req.params.id);
      //Aca pongo lo que le voy c mandar a la vista 
      res.render(path.resolve(__dirname, '..','views','admin','editProductos.ejs'), {productoEditar});
    },

    updateProductos: async (req,res) => {
      //Update the product name
      await atributeProduct.update(
        {
          value: req.body.nombre
        },
        {
          where: {
            id: req.body.nombreId
          }
        }
      )

      //Update the product price
      await atributeProduct.update(
        {
          value: req.body.precio
        },
        {
          where: {
            id: req.body.precioId
          }
        }
      )

      const updatedFields = {
        image: req.files.length > 0 ? req.files[0].filename: req.body.oldimagen
      }

      await ProductDao.updateById(req.params.id, updatedFields)
      res.redirect(`/adminProductos/?type=${JSON.parse(req.body.tipo).id}`);        
    }           
                    
}
