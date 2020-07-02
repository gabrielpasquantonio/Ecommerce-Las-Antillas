const path = require("path");
module.exports = {
    habanos: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "habanos.ejs"));

    },
    productDetail: function(req, res) {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "productos", "productDetail.ejs"));

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

    }
}