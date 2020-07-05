const path = require("path");
const fs = require('fs');
//Aca pasamos los datos del archivo Json de Habanos a un Array
let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
let productoTabacoPipas = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
let productoTabacoArmar = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));




module.exports = {
    habanos: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "habanos.ejs"),{productoHabanos});

    },

    cigarros: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "cigarros.ejs"),{productoCigarros}); 
     },
     tabaco_pipas: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "tabacosPipas.ejs"),{productoTabacoPipas}); 
     },
     tabaco_armar: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "tabacosArmar.ejs"),{productoTabacoArmar}); 
     },
     cigarritos: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "cigarritos.ejs"),{productoCigarritos}); 
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
    }, allProducts: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "allProducts.ejs"),{productoHabanos},{productoCigarros},{productoCigarritos},{productoTabacoArmar},{productoTabacoPipas});
    } 
}