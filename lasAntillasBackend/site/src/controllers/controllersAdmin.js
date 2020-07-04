const path = require("path");
const fs = require('fs');
//Aca pasamos los datos del archivo Json de Habanos a un Array
let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));

module.exports = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"),{productoHabanos});

    }
}