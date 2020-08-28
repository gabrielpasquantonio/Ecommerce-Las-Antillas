const path = require("path");
const fs = require('fs');

module.exports = {
    indexProductos: (req, res) => {
     //parametrizando para que la primera letra de files View sea mayuscula                
    //const resto = req.query.type.slice(1)
    //const upper = req.query.type[0]
    //const uppercase = upper.toUpperCase();
    //const name = uppercase + resto
    //const fileViewName = `admin${name}.ejs`
  
//Aca pasamos los datos del archivo Json de los Productos a un Array de una manera parametrizada
let todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.query.type}.json`)));
//let todosProductosFromDb = getAllProductsFromDb()  

//res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
    res.render(path.resolve(__dirname, "..", "views", "admin", "adminProductos.ejs"),{todosProductosJson});

},



    createProductos: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    const todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.query.type}.json`)));
   
    const todasMarcas = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`marcas.json`)));
    const marcas = todasMarcas.find(marca => marca.tipo === req.query.type).marca

        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "createProductos.ejs"),{todosProductosJson,marcas},);
    
    

    },
    
    saveProductos: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.body.tipo}.json`)));

    
        //res.send(req.body);
        //Aqui indico el formato de como se va a guardar la informacion del producto
        
        let nuevoProducto={
            id: todosProductosJson.length + 1,
            nombre: req.body.nombre,
            tipo:req.body.tipo,
            marca:req.body.marca,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.files.length>0?req.files[0].filename:"default.jpg",

            
        };
            //Aquí se agrega al array el nuevo Producto
            todosProductosJson.push(nuevoProducto);
            //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
            let nuevoProductoGuardar = JSON.stringify(todosProductosJson,null,2)
            //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
            fs.writeFileSync(path.resolve(__dirname,'..','data',`${req.body.tipo}.json`),nuevoProductoGuardar);
            //Aqui redireccionamos los nuevos productos a la vista administrar
            res.redirect(`/adminProductos/?type=${req.body.tipo.toLowerCase()}`)
    },
    

    showProductos: (req,res) =>{
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.query.type}.json`)));
    // console.log(req.query.type)
        //res.send(req.params.id);
       //Aca declaro la variable que voy a mandar a la vista 
       let miProducto;
       todosProductosJson.forEach(todoProductoJson => {
           if(todoProductoJson.id == req.params.id){
            miProducto = todoProductoJson;         
            }
        });
        
        //Aca pongo lo que le voy a mandar a la vista 
        res.render(path.resolve(__dirname, '..','views','admin','detailProductos.ejs'), {miProducto})
    
    },
    destroyProductos:(req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.query.type}.json`)));
        //Esta variable va a guardar el habano que se va a borrar
        const productoDeleteId = req.params.id;
        //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
        const productosFinal = todosProductosJson.filter(todoProductoJson => todoProductoJson.id != productoDeleteId);
        //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
        let productosGuardar = JSON.stringify(productosFinal,null,2)
        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
        fs.writeFileSync(path.resolve(__dirname,'..','data',`${req.query.type}.json`),productosGuardar);
        //Aqui redireccionamos los nuevos productos a la vista administrar
        res.redirect(`/adminProductos/?type=${req.query.type}`);
    },

    editProductos: (req,res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.query.type}.json`)));
    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla . 
    const productoId = req.params.id;

    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
        let productoEditar= todosProductosJson.find(todoProductoJson => todoProductoJson.id == productoId);
    //Aca pongo lo que le voy a mandar a la vista 
    res.render(path.resolve(__dirname, '..','views','admin','editProductos.ejs'), {productoEditar});

    

    },

    updateProductos(req,res){
        let todosProductosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data",`${req.body.tipo}.json`)));
        //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
        req.body.id = req.params.id;
        //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit). 
        //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior. 
       // req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        //Aca voy a contener el nuevo habano que ya se actualizo
        let productosUpdate = todosProductosJson.map(todoProductoJson => {
            if(todoProductoJson.id == req.body.id){
           
                req.body.imagen = req.files.length > 0 ? req.files[0].filename:todoProductoJson.imagen
                return todoProductoJson = req.body;
            }
    
            return todoProductoJson;
    
        });
        let productosActualizar = JSON.stringify(productosUpdate,null,2)
        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
        fs.writeFileSync(path.resolve(__dirname,'..','data',`${req.body.tipo}.json`),productosActualizar);
        //Aqui redireccionamos los nuevos productos a la vista administrar
        res.redirect(`/adminProductos/?type=${req.body.tipo.toLowerCase()}`);        
    

    }           
                    
                }
