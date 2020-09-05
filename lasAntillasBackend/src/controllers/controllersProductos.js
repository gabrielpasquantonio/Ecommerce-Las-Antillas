const path = require("path");
const fs = require('fs');

// ACA PREPARAMOS EL ENTORNO DE TRABAJO PARA UTILIZAR SEQUELIZE PARA TRAER LOS DATOS DE LA BD
const db = require('../database/models')
// const { rols, user } = 
const rols = db.Rol;
const users = db.User;
const products = db.Product;
const categories = db.Category;
const brands = db.Brand;
const atributes = db.Atribute;
const atributeProduct = db.AtributeProduct;
const brandCategory = db.BrandCategory;

//  Aca pasamos los datos del archivo Json de Habanos a un Array
const productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
const productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
const productoTabacoPipas = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacoPipa.json")));
const productoTabacoArmar = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacoCigarro.json")));


module.exports = {
    habanos: (req, res) => {
        // PRODUCTS REPRESENTA AL MODELO.
        // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
        // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
        // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
        // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
        console.log('valor/es que viene del front (nav bar "/habanos/?type=X&brand=X") por query', req.query);
        products.findAll({
            where: {
                category_id: req.query.type,
                brand_id: req.query.brand
            },
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
                {
                    model: atributes,
                    through: {
                        model: atributeProduct
                    }
                }
            ]
        })
        // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
        .then(productEncontradosDesdeBD => {
            // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
            console.log('producto encontrados', JSON.stringify(productEncontradosDesdeBD, null, 2))
            // Definimos en variables
            const productoHabanos = []
            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosDesdeBD.forEach(productoEncontrado => {
                // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                const name = productoEncontrado.Atributes.find(atribute => atribute.name === "VitolaDeGalera").atributeProduct.value
                const price = productoEncontrado.Atributes.find(atribute => atribute.name === "UnitPrice").atributeProduct.value
                const imagen = productoEncontrado.image
                productoHabanos.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                        // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                        nombre: {
                            value: name
                        },
                        precio: {
                            value: price
                        },
                        imagen: imagen
                    }
                )
            })
            // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
            // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
            res.render(path.resolve(__dirname, "..", "views", "productos", "habanos.ejs"),{ productoHabanos });
        })

    },

    cigarros:(req, res) => {
        // PRODUCTS REPRESENTA AL MODELO.
        // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
        // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
        // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
        // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
        console.log('valor/es que viene del front (nav bar "/cigarros/?type=X&brand=X") por query', req.query);
        products.findAll({
            where: {
                category_id: req.query.type,
                brand_id: req.query.brand
            },
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
                {
                    model: atributes,
                    through: {
                        model: atributeProduct
                    }
                }
            ]
        })
        // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
        .then(productEncontradosDesdeBD2 => {
            // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
            console.log('producto encontrados', JSON.stringify(productEncontradosDesdeBD2, null, 2))
            // Definimos en variables
            const productoCigarros = []
            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosDesdeBD2.forEach(productoEncontrado2 => {
                // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                const name = productoEncontrado2.Atributes.find(atribute => atribute.name === "Vitola").atributeProduct.value
                const price = productoEncontrado2.Atributes.find(atribute => atribute.name === "UnitPrice").atributeProduct.value
                const imagen = productoEncontrado2.image
                productoCigarros.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                        // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                        nombre: {
                            value: name
                        },
                        precio: {
                            value: price
                        },
                        imagen: imagen
                    }
                )
            })
            // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
            // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
            res.render(path.resolve(__dirname, "..", "views", "productos", "cigarros.ejs"),{ productoCigarros });
        })

    },
     tabaco_pipas:(req, res) => {
        // PRODUCTS REPRESENTA AL MODELO.
        // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
        // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
        // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
        // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
        console.log('valor/es que viene del front (nav bar "/tabacoPipa/?type=X&brand=X") por query', req.query);
        products.findAll({
            where: {
                category_id: req.query.type,
                brand_id: req.query.brand
            },
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
                {
                    model: atributes,
                    through: {
                        model: atributeProduct
                    }
                }
            ]
        })
        // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
        .then(productEncontradosDesdeBD4 => {
            // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
            console.log('producto encontrados', JSON.stringify(productEncontradosDesdeBD4, null, 2))
            // Definimos en variables
            const productoTabacoPipas = []
            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosDesdeBD4.forEach(productoEncontrado4 => {
                // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                const name = productoEncontrado4.Atributes.find(atribute => atribute.name === "Taste").atributeProduct.value
                const price = productoEncontrado4.Atributes.find(atribute => atribute.name === "UnitPrice").atributeProduct.value
                const imagen = productoEncontrado4.image
                productoTabacoPipas.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                        // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                        nombre: {
                            value: name
                        },
                        precio: {
                            value: price
                        },
                        imagen: imagen
                    }
                )
            })
            // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
            // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
            res.render(path.resolve(__dirname, "..", "views", "productos", "tabacosPipas.ejs"),{ productoTabacoPipas });
        })

    },
     tabaco_armar: (req, res) => {
        // PRODUCTS REPRESENTA AL MODELO.
        // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
        // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
        // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
        // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
        console.log('valor/es que viene del front (nav bar "/tabacoArmar/?type=X&brand=X") por query', req.query);
        products.findAll({
            where: {
                category_id: req.query.type,
                brand_id: req.query.brand
            },
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
                {
                    model: atributes,
                    through: {
                        model: atributeProduct
                    }
                }
            ]
        })
        // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
        .then(productEncontradosDesdeBD5 => {
            // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
            console.log('producto encontrados', JSON.stringify(productEncontradosDesdeBD5, null, 2))
            // Definimos en variables
            const productoTabacoArmar = []
            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosDesdeBD5.forEach(productoEncontrado5 => {
                // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                const name = productoEncontrado5.Atributes.find(atribute => atribute.name === "Taste").atributeProduct.value
                const price = productoEncontrado5.Atributes.find(atribute => atribute.name === "UnitPrice").atributeProduct.value
                const imagen = productoEncontrado5.image
                productoTabacoArmar.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                        // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                        nombre: {
                            value: name
                        },
                        precio: {
                            value: price
                        },
                        imagen: imagen
                    }
                )
            })
            // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
            // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
            res.render(path.resolve(__dirname, "..", "views", "productos", "tabacosArmar.ejs"),{ productoTabacoArmar });
        })

    },
     cigarritos: (req, res) => {
        // PRODUCTS REPRESENTA AL MODELO.
        // FINDALL ES EL METODO QUE VA A LEER TODOS LOS PRODUCTOS DE LA BASE DE DATOS
        // EL WHERE ES EL METODO QUE UTILIZAMOS DENTRO DEL FINDALL PARA HACER EL FILTRO (IGUAL QUE SQL)
        // CATEGORY_ID REPRESENTA UNA COLUMNA DEL MODELO PRODUCTS
        // EL REQ.QUERY.TYPE ES LA INFO QUE VIENE DESDE LA VISTA DE NAVBAR (QUE USAMOS QUERY PARA MANDAR LOS DATOS)
        console.log('valor/es que viene del front (nav bar "/cigarritos/?type=X&brand=X") por query', req.query);
        products.findAll({
            where: {
                category_id: req.query.type,
                brand_id: req.query.brand
            },
            // Atravez del include vinculamos al modelo productos con el modelo atributos a traves de atributeProduct
            // la key include tiene como value un array (en este caso de objetos)
            include: [
                {
                    model: atributes,
                    through: {
                        model: atributeProduct
                    }
                }
            ]
        })
        // PRODUCTOS ENCONTRADOS ES EL RESULTADO DEL FIND ALL CON LOS FILTROS CORRESPONDIENTES
        .then(productEncontradosDesdeBD3 => {
            // //JSON STRINGIFY ES PARA MOSTRAR DE UNA MANERA MAS AMIGABLE LA RESPUESTA DE SEQUELIZE
            console.log('producto encontrados', JSON.stringify(productEncontradosDesdeBD3, null, 2))
            // Definimos en variables
            const productoCigarritos = []
            // HACEMOS UN FOREACH PARA RECORRER EL ARRAY CON LOS RESULTADOS ENCONTRADOS
            productEncontradosDesdeBD3.forEach(productoEncontrado3 => {
                // BUSCAS UN VALOR DENTRO DE LOS RESULTADOS ENCONTRADOS EN BASE A UN FILTRO
                const name = productoEncontrado3.Atributes.find(atribute => atribute.name === "Vitola").atributeProduct.value
                const price = productoEncontrado3.Atributes.find(atribute => atribute.name === "PricePerBox").atributeProduct.value
                const imagen = productoEncontrado3.image
                productoCigarritos.push(
                    // REPRESENTA EL MODELO DEL RESULTADO AL QUE QUEREMOS LLEGAR (EL QUE LA VISTA ESPERA RECIBIR)
                    {
                        // NOMBRE, PRECIO E IMAGEN SON KEYS QUE COINCIDEN CON LA VISTA
                        nombre: {
                            value: name
                        },
                        precio: {
                            value: price
                        },
                        imagen: imagen
                    }
                )
            })
            // EL RENDER VA DENTRO DEL .THEN() PARA QUE SE EJECUTE DE MANERA SINCRONICA
            // EL RENDER CONSTA DE DOS PARTES: LA RUTA DE A VISTA A RENDERIZAR Y SEGUNDO LOS DATOS QUE RECIBIRA.
            res.render(path.resolve(__dirname, "..", "views", "productos", "cigarritos.ejs"),{ productoCigarritos });
        })

    },
    productDetailHabano: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailHabano.ejs"));

    },
    productDetailTabaco: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailTabaco.ejs"));

    },
    productDetailCigarro: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailCigarro.ejs"));

    },
    productDetailCigarrito: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailCigarrito.ejs"));

    },//tabacos: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
       // res.render(path.resolve(__dirname, "..", "views", "productos", "tabacos.ejs"));

    carrito: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "carrito.ejs"));
    }, 
    allProducts: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "allProducts.ejs"),{productoHabanos,productoCigarros,productoCigarritos,productoTabacoArmar,productoTabacoPipas});
    } 
}