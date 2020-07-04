const path = require("path");
const fs = require('fs');
//Aca pasamos los datos del archivo Json de Habanos a un Array
let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));


module.exports = {
    habanos: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "habanos.ejs"),{productoHabanos});

    },
    productDetailHabano: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailHabano.ejs"));

    },
    productDetailTabaco: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailTabaco.ejs"));

    },
    productDetailCigarro: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailCigarro.ejs"));

    },
    productDetailCigarrito: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetailCigarrito.ejs"));

    },
    cigarritos: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "cigarritos.ejs"));

    },cigarros: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "cigarros.ejs"));

    },tabacos: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "tabacos.ejs"));

    },carrito: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "carrito.ejs"));
    }, allProducts: function(req,res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "allProducts.ejs"));
    } 
}