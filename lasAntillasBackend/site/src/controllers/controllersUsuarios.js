const path = require("path");
module.exports = {
    login: function(req, res) {
        res.render(path.resolve(__dirname, "..", "views", "usuarios", "login.ejs"));

    },
    usersRegister: function(req, res) {
        res.render(path.resolve(__dirname, "..", "views", "usuarios", "usersRegister.ejs"));

        }
    

}