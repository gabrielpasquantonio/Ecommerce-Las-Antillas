const path = require("path");
module.exports = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "usuarios", "login.ejs"));

    },
    registro: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "usuarios", "registro.ejs"));

        }
    

}