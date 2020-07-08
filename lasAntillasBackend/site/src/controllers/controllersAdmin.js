const path = require("path");
const fs = require('fs');
//Aca pasamos los datos del archivo Json de Habanos a un Array
let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));

module.exports = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"),{productoHabanos});

    },
    create: (req, res) => {
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "create.ejs"));

    },
    save: (req, res) => {
        //res.send(req.body);
        //Aqui indico el formato de como se va a guardar la informacion del producto
        let nuevoHabano={
            id: productoHabanos.length + 1,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            
        };
            //Aquí se agrega al array el nuevo Producto
            productoHabanos.push(nuevoHabano);
            //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
            let nuevoHabanoGuardar = JSON.stringify(productoHabanos,null,2)
            //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
            fs.writeFileSync(path.resolve(__dirname,'..','data','habanos.json'),nuevoHabanoGuardar);
            //Aqui redireccionamos los nuevos productos a la vista administrar
            res.redirect('/admin')
    },

    show: (req,res) =>{
       //res.send(req.params.id);
       //Aca declaro la variable que voy a mandar a la vista 
       let miHabano;
        productoHabanos.forEach(productoHabano => {
           if(productoHabano.id == req.params.id){
               miHabano = productoHabano;         
            }
        });
        //Aca pongo lo que le voy a mandar a la vista 
        res.render(path.resolve(__dirname, '..','views','admin','detailHabano.ejs'), {miHabano})
    
    }

    }
