const path = require("path");
const fs = require('fs');
const db = require('../database/models');

module.exports = {

  index: (req, res) => {
  db.sequelize
  .query(' select * from products')
  .then(relojes => {
  return res.send(relojes)
  })
  .catch(error => res.send(error))
  }
}