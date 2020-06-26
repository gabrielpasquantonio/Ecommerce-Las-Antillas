const path = require("path");
module.exports = {
    bolivar: function(req, res) {
        res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    }
}