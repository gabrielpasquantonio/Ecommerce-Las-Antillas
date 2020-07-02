const path = require("path");
module.exports = {
    login: function(req, res) {
        res.sendFile(path.resolve(__dirname, "..", "views", "usuarios", "login.html"));
    },
    usersRegister: function(req, res) {
            res.sendFile(path.resolve(__dirname, "..", "views", "usuarios", "usersRegister.html"));
        }
    

}