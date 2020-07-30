const path = require("path");
module.exports = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "usuarios", "login.ejs"));

    },
    usersRegister: (req, res) => {
        res.render(path.resolve(__dirname, "..", "views", "usuarios", "usersRegister.ejs"));

        }
    

}