const db = require("../database/models");
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;

const productAssociationQuery = [
  {
    model: categories,
    attributes: ["id", "name"],
  },
  {
    model: brands,
    attributes: ["id", "name"],
  },
  {
    model: atributes,
    attributes: ["id", "name"],
    through: {
      // This block of code allows you to retrieve the properties of the join table
      model: atributeProduct,
      attributes: ["id", "value"],
    },
  },
]

const mapProductWithAssociations = (product) => {
  const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
  const priceAttribute = ["UnitPrice", "PricePerBox"];
  
  const precioFirst = product.Atributes.find((atribute) =>
    priceAttribute.includes(atribute.name));
  
  const precio =
    (precioFirst &&
      precioFirst.atributeProduct) ||
    { value: "PONER PRECIO", id:'999999' }
  
  const nombreFirst = product.Atributes.find((atribute) =>
    nameAttribute.includes(atribute.name)
  );
  
  const nombre =
    (nombreFirst &&
      nombreFirst.atributeProduct &&
      nombreFirst.atributeProduct) ||
    { value: "PONER nombre", id:'999999' }

  return {
    id: product.id,
    // marca: product.Brand.name,
    marca: (product.Brand && product.Brand.name) || "AGREGAR",
    nombre,
    tipo: {
      name: product.Category.name,
      id: product.Category.id
    },
    description: "DESCRIPTION",
    precio,
    descuento: "20%",
    oldImagen: product.image,
    imagen: product.image,
  };
}

module.exports = {
  getProductsByCategory: async (type) => {
    const productsFromDB = await products.findAll({
      include: productAssociationQuery,
      attributes: ["id", "image"],
      where: {
        category_id: type,
      },
    });
    const mapProduct = productsFromDB.map((product) => mapProductWithAssociations(product))
    return mapProduct
  },

  getAtributesTypeByCategory: async (type) => {
    const productsFromDB = await products.findOne({
      include: productAssociationQuery,
      attributes: ["id", "image"],
      where: {
        category_id: type,
      },
    });
    const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
    const priceAttribute = ["UnitPrice", "PricePerBox"];

    const atributes = {
      nameType: productsFromDB.Atributes.find(atribute => nameAttribute.includes(atribute.name)).name,
      priceType: productsFromDB.Atributes.find(atribute => priceAttribute.includes(atribute.name)).name
    }
    return atributes
  },


  getProductById: async (productId) => {
    const product = await products.findOne({
      include: productAssociationQuery,
      attributes: ["id", "image"],
      where: {
        id: productId
      }
    })
    return mapProductWithAssociations(product)
  },

  deleteById: async (productId) => {
    const product = await products.destroy({
      where: {
        id: productId
      }
    })
    return product
  },

  updateById: async (productId, fields) => {
    const producto = await products.update(
      {
        ...fields 
      },
      {
        where: {
          id: productId
        }
      }
    )
  },

  createProduct: async (product, atribute) => {
    return await products.create(product)
  }

};
