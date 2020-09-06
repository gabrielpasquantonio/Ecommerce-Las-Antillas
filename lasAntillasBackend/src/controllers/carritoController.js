const path = require('path');
const {validationResult} = require('express-validator');
//const {Dish, Item, User, Cart } = require('../database/models'); 

module.exports = {
    addCart: (req,res) =>{ 
        //return res.send(req.body)
        const errores = validationResult(req);
        if(errores.isEmpty()){
            Dish.findByPk(req.body.productId,{
               include: ['category']
             })
             .then((producto)=>{
                 //return res.send(producto)
                 let price = Number(producto.price)
                 let salePrice = (price - ((price * producto.discount) / 100))  
                 //console.log(salePrice + '====================================')
                 return Item.create({
                     salePrice: salePrice,
                     quantity: req.body.cantidad,
                     subtotal: salePrice * req.body.cantidad,
                     state: 1,
                     userId: req.session.usuario.id,
                     productId: producto.id,
                     cartId: null
                 })
                 .then(()=> res.redirect('/productos'))
                 .catch(error => console.log(error))
             })
     }else{
         //Hay errores
         Dish.findByPk(req.body.productId,{
                 include: ['category']
             })
             .then((platoComida)=>{
                 return res.render(path.resolve(__dirname, '../views/productos/detail'), {
                     errors: errors.errors, platoComida})
             })
          }
    },
    cart : (req,res) =>{
        Item.findAll({
            where:{
                userId : req.session.usuario.id,
                state: 1
            },
            include:{
                all: true,
                nested: true
            }
        })
        .then((cartProducto)=>{
            //return res.send(cartProducto)
            let total = cartProducto.reduce((total, item)=>(total = total + (Number(item.subtotal))),0)
            return res.render(path.resolve(__dirname, '../views/carrito/carrito'), {
                cartProducto, total})
        })

    },
    deleteCart : (req,res) =>{
        Item.destroy({
            where: {
                id : req.body.itemId
            }
        })
        .then(()=> res.redirect('/carrito'))
        .catch(error => console.log(error))
    }





} 