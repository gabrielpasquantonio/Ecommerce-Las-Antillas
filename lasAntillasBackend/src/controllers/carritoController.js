const path = require('path');
const {validationResult} = require('express-validator');
const {Product, CartProduct, User, Cart } = require('../database/models'); 

module.exports = {
    addCart: (req,res) =>{ 
        //return res.send(req.body)

        console.log(req.session)
        const errores = validationResult(req);
        if(errores.isEmpty()){
            Cart.findOne({
               where: { 
                   state_id : 1,
                   user_id: req.session.usuario.id
                 }
            })
                            
             .then((cart)=>{
                console.log('console log ',cart,!cart) //return res.send(producto)
                 if (!cart){
                     console.log('aca esta ')
                     Cart.create({
                         user_id: req.session.usuario.id,
                         state_id: 1,
                         total:0
                     })
                     .then((createdCart)=>{
                        console.log('aca e  sta ')
                         CartProduct.create({
                            
                            quantity: req.body.cantidad,
                            subtotal: req.body.precio * req.body.cantidad,
                            user_id: req.session.usuario.id,
                            product_id: req.body.product_id,
                            cart_id: createdCart.id
                         })
                     })
                 }else{
                     CartProduct.create({        
                     quantity: req.body.cantidad,
                     subtotal: req.body.precio * req.body.cantidad,
                     state: 1,
                     userId: req.session.usuario.id,
                     product_id: req.body.product_id,
                     cart_id: cart.id
                     })                   
                 //console.log(salePrice + '====================================')
                 .then(()=> res.redirect('/carrito')) //mandar para o carrinho
                 .catch(error => console.log(error))
                 }
            })
        }
    },
    cart : (req,res) =>{
        Cart.findOne({
            where: { 
                state_id : 1,
                user_id: req.session.usuario.id
              },
            include:{
                model: Product,
                through: {
                  // This block of code allows you to retrieve the properties of the join table
                  model: CartProduct,
                },
            }
        })
        .then((cartProducto)=>{
            console.long('elseeee',JSON.stringify(cartProducto,null,2))
            let total = cartProducto.reduce((total, item)=>(total = total + (Number(item.subtotal))),0)
            return res.render(path.resolve(__dirname, '../views/productos/carrito'), {
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
