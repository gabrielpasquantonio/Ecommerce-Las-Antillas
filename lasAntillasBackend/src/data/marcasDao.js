const db = require('../database/models')
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;

module.exports = {
  getMarcaByName: async marcaName => {
    return await brands.findOne(
      {
        attributes: ['id'],
        where: {
          name: marcaName
        }
      } 
    )
  }
}