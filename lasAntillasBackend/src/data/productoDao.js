const db = require("../database/models");
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;

module.exports = {
  getProductsByCategory: async (type) => {
    const productsFromDB = await products.findAll({
      include: [
        {
          model: categories,
          attributes: ["name"],
        },
        {
          model: brands,
          attributes: ["name"],
        },
        {
          model: atributes,
          attributes: ["name"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: atributeProduct,
            attributes: ["value"],
          },
        },
      ],
      attributes: ["id", "image"],
      where: {
        category_id: type,
      },
    });
    const nameAttribute = ["VitolaDeGalera", "Vitola", "Taste"];
    const priceAttribute = ["UnitPrice", "PricePerBox"];
    const mapProduct = productsFromDB.map((product) => {
      // const precio = product.Atributes.find(atribute => priceAttribute.includes(atribute.name)).atributeProduct.value
      // const nombre = product.Atributes.find(atribute => nameAttribute.includes(atribute.name)).atributeProduct.value
      const precioFirst = product.Atributes.find((atribute) =>
        priceAttribute.includes(atribute.name)
      );
      const precio =
        (precioFirst &&
          precioFirst.atributeProduct &&
          precioFirst.atributeProduct.value) ||
        "PONER PRECIO";
      const nombreFirst = product.Atributes.find((atribute) =>
        nameAttribute.includes(atribute.name)
      );
      const nombre =
        (nombreFirst &&
          nombreFirst.atributeProduct &&
          nombreFirst.atributeProduct.value) ||
        "PONER PRECIO";
      return {
        id: product.id,
        // marca: product.Brand.name,
        marca: (product.Brand && product.Brand.name) || "AGREGAR",
        nombre,
        tipo: product.Category.name,
        description: "DESCRIPTION",
        precio,
        descuento: "20%",
        oldImagen: product.image,
        imagen: product.image,
      };
    });
    return mapProduct;
  },
};
