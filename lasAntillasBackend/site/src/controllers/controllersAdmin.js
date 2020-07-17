const path = require("path");
const fs = require('fs');

module.exports = {
    index: (req, res) => {
        //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "admin.ejs"),{productoHabanos});

    },
    create: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "create.ejs"));

    },
    save: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //res.send(req.body);
        //Aqui indico el formato de como se va a guardar la informacion del producto
        
        let nuevoHabano={
            id: productoHabanos.length + 1,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.files[0].filename
            
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
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
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
    
    },
    destroy:(req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //Esta variable va a guardar el habano que se va a borrar
        const habanoDeleteId = req.params.id;
        //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
        const habanosFinal = productoHabanos.filter(productoHabano => productoHabano.id != habanoDeleteId);
        //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
        let habanosGuardar = JSON.stringify(habanosFinal,null,2)
        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
        fs.writeFileSync(path.resolve(__dirname,'..','data','habanos.json'),habanosGuardar);
        //Aqui redireccionamos los nuevos productos a la vista administrar
        res.redirect('/admin');
    },

    edit: (req,res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla . 
    const habanoId = req.params.id;

    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
        let habanoEditar= productoHabanos.find(productoHabano => productoHabano.id == habanoId);
    //Aca pongo lo que le voy a mandar a la vista 
    res.render(path.resolve(__dirname, '..','views','admin','edit.ejs'), {habanoEditar});

    

    },

    updateHabanos(req,res){
        let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
        req.body.id = req.params.id;
        //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit). 
        //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior. 
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        //Aca voy a contener el nuevo habano que ya se actualizo
        let habanoUpdate = productoHabanos.map(productoHabano => {
            if(productoHabano.id == req.body.id){
                return productoHabano = req.body;
            }
            return productoHabano;
        });
        let habanosActualizar = JSON.stringify(habanoUpdate,null,2)
        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
        fs.writeFileSync(path.resolve(__dirname,'..','data','habanos.json'),habanosActualizar);
        //Aqui redireccionamos los nuevos productos a la vista administrar
        res.redirect('/admin');        
    

    }
} 
