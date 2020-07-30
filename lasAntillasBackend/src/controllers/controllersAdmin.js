const path = require("path");
const fs = require('fs');
const db = require('../database/models');


module.exports = {
    index: (req, res) => {
        //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "adminHabanos.ejs"),{productoHabanos});

    },

    createHabanos: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "createHabanos.ejs"));

    },
    
    saveHabanos: (req, res) => {
    //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
        //res.send(req.body);
        //Aqui indico el formato de como se va a guardar la informacion del producto
        
        let nuevoHabano={
            id: productoHabanos.length + 1,
            nombre: req.body.nombre,
            marca:req.body.marca,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.files.length>0?req.files[0].filename:"default.jpg"
            
        };
            //Aquí se agrega al array el nuevo Producto
            productoHabanos.push(nuevoHabano);
            //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
            let nuevoHabanoGuardar = JSON.stringify(productoHabanos,null,2)
            //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
            fs.writeFileSync(path.resolve(__dirname,'..','data','habanos.json'),nuevoHabanoGuardar);
            //Aqui redireccionamos los nuevos productos a la vista administrar
            res.redirect('/adminHabanos')
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
        res.redirect('/adminHabanos');
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
        res.redirect('/adminHabanos');        
    

    },
    indexCigarros: (req, res) => {
        //Aca pasamos los datos del archivo Json de Habanos a un Array
    let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
        res.render(path.resolve(__dirname, "..", "views", "admin", "adminCigarros.ejs"),{productoCigarros});

    },
    createCigarros: (req, res) => {
        //Aca pasamos los datos del archivo Json de Cigarros a un Array
        let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
            //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
            res.render(path.resolve(__dirname, "..", "views", "admin", "createCigarros.ejs"));
    
        },
        saveCigarros: (req, res) => {
            //Aca pasamos los datos del archivo Json de Cigarros a un Array
            let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
                //res.send(req.body);
                //Aqui indico el formato de como se va a guardar la informacion del producto
                
                let nuevoCigarro={
                    id: productoCigarros.length + 1,
                    nombre: req.body.nombre,
                    marca:req.body.marca,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    imagen: req.files.length>0?req.files[0].filename:"default.jpg"
                    
                };
                    //Aquí se agrega al array el nuevo Producto
                    productoCigarros.push(nuevoCigarro);
                    //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                    let nuevoCigarroGuardar = JSON.stringify(productoCigarros,null,2)
                    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                    fs.writeFileSync(path.resolve(__dirname,'..','data','cigarros.json'),nuevoCigarroGuardar);
                    //Aqui redireccionamos los nuevos productos a la vista administrar
                    res.redirect('/adminCigarros')
            },

            showCigarro: (req,res) =>{
                //Aca pasamos los datos del archivo Json de Habanos a un Array
                let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
                    //res.send(req.params.id);
                   //Aca declaro la variable que voy a mandar a la vista 
                   let miCigarro;
                    productoCigarros.forEach(productoCigarro => {
                       if(productoCigarro.id == req.params.id){
                           miCigarro = productoCigarro;         
                        }
                    });
                    
                    //Aca pongo lo que le voy a mandar a la vista 
                    res.render(path.resolve(__dirname, '..','views','admin','detailCigarro.ejs'), {miCigarro})
                
                },

                destroyCigarro:(req, res) => {
                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                    let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
                        //Esta variable va a guardar el habano que se va a borrar
                        const cigarroDeleteId = req.params.id;
                        //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
                        const cigarrosFinal = productoCigarros.filter(productoCigarro => productoCigarro.id != cigarroDeleteId);
                        //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                        let cigarrosGuardar = JSON.stringify(cigarrosFinal,null,2)
                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                        fs.writeFileSync(path.resolve(__dirname,'..','data','cigarros.json'),cigarrosGuardar);
                        //Aqui redireccionamos los nuevos productos a la vista administrar
                        res.redirect('/adminCigarros');
                    },
              
                    editCigarros: (req,res) => {
                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                    let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
                    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla . 
                    const cigarroId = req.params.id;
                
                    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
                        let cigarroEditar= productoCigarros.find(productoCigarro => productoCigarro.id == cigarroId);
                    //Aca pongo lo que le voy a mandar a la vista 
                    res.render(path.resolve(__dirname, '..','views','admin','editCigarros.ejs'), {cigarroEditar});
                
                    
                
                    },
               
                    updateCigarros(req,res){
                        let productoCigarros = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarros.json")));
                        //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
                        req.body.id = req.params.id;
                        //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit). 
                        //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior. 
                        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
                        //Aca voy a contener el nuevo habano que ya se actualizo
                        let cigarroUpdate = productoCigarros.map(productoCigarro => {
                            if(productoCigarro.id == req.body.id){
                                return productoCigarro = req.body;
                            }
                            return productoCigarro;
                        });
                        let cigarrosActualizar = JSON.stringify(cigarroUpdate,null,2)
                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                        fs.writeFileSync(path.resolve(__dirname,'..','data','cigarros.json'),cigarrosActualizar);
                        //Aqui redireccionamos los nuevos productos a la vista administrar
                        res.redirect('/adminCigarros');        
                    
                
                    }, 
                    indexCigarritos: (req, res) => {
                        //Aca pasamos los datos del archivo Json de Habanos a un Array
                    let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
                        res.render(path.resolve(__dirname, "..", "views", "admin", "adminCigarritos.ejs"),{productoCigarritos});
                
                    },
                    createCigarritos: (req, res) => {
                        //Aca pasamos los datos del archivo Json de Cigarros a un Array
                        let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                            //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
                            res.render(path.resolve(__dirname, "..", "views", "admin", "createCigarritos.ejs"));
                    
                        },
                        saveCigarritos: (req, res) => {
                            //Aca pasamos los datos del archivo Json de Cigarros a un Array
                            let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                                //res.send(req.body);
                                //Aqui indico el formato de como se va a guardar la informacion del producto
                                
                                let nuevoCigarrito={
                                    id: productoCigarritos.length + 1,
                                    nombre: req.body.nombre,
                                    marca:req.body.marca,
                                    descripcion: req.body.descripcion,
                                    precio: req.body.precio,
                                    imagen: req.files.length>0?req.files[0].filename:"default.jpg"
                                    
                                };
                                    //Aquí se agrega al array el nuevo Producto
                                    productoCigarritos.push(nuevoCigarrito);
                                    //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                                    let nuevoCigarritoGuardar = JSON.stringify(productoCigarritos,null,2)
                                    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                    fs.writeFileSync(path.resolve(__dirname,'..','data','cigarritos.json'),nuevoCigarritoGuardar);
                                    //Aqui redireccionamos los nuevos productos a la vista administrar
                                    res.redirect('/adminCigarritos')
                            },
                
                            showCigarrito: (req,res) =>{
                                //Aca pasamos los datos del archivo Json de Habanos a un Array
                                let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                                    //res.send(req.params.id);
                                   //Aca declaro la variable que voy a mandar a la vista 
                                   let miCigarrito;
                                    productoCigarritos.forEach(productoCigarrito => {
                                       if(productoCigarrito.id == req.params.id){
                                           miCigarrito = productoCigarrito;         
                                        }
                                    });
                                    
                                    //Aca pongo lo que le voy a mandar a la vista 
                                    res.render(path.resolve(__dirname, '..','views','admin','detailCigarrito.ejs'), {miCigarrito})
                                
                                },
                
                                destroyCigarrito:(req, res) => {
                                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                                    let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                                        //Esta variable va a guardar el habano que se va a borrar
                                        const cigarritoDeleteId = req.params.id;
                                        //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
                                        const cigarritosFinal = productoCigarritos.filter(productoCigarrito => productoCigarrito.id != cigarritoDeleteId);
                                        //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                                        let cigarritosGuardar = JSON.stringify(cigarritosFinal,null,2)
                                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                        fs.writeFileSync(path.resolve(__dirname,'..','data','cigarritos.json'),cigarritosGuardar);
                                        //Aqui redireccionamos los nuevos productos a la vista administrar
                                        res.redirect('/adminCigarritos');
                                    },
                              
                                    editCigarritos: (req,res) => {
                                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                                    let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                                    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla . 
                                    const cigarritoId = req.params.id;
                                
                                    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
                                        let cigarritoEditar= productoCigarritos.find(productoCigarrito => productoCigarrito.id == cigarritoId);
                                    //Aca pongo lo que le voy a mandar a la vista 
                                    res.render(path.resolve(__dirname, '..','views','admin','editCigarritos.ejs'), {cigarritoEditar});
                                
                                    
                                
                                    },
                               
                                    updateCigarritos(req,res){
                                        let productoCigarritos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","cigarritos.json")));
                                        //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
                                        req.body.id = req.params.id;
                                        //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit). 
                                        //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior. 
                                        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
                                        //Aca voy a contener el nuevo habano que ya se actualizo
                                        let cigarritoUpdate = productoCigarritos.map(productoCigarrito => {
                                            if(productoCigarrito.id == req.body.id){
                                                return productoCigarrito = req.body;
                                            }
                                            return productoCigarrito;
                                        });
                                        let cigarritosActualizar = JSON.stringify(cigarritoUpdate,null,2)
                                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                        fs.writeFileSync(path.resolve(__dirname,'..','data','cigarritos.json'),cigarritosActualizar);
                                        //Aqui redireccionamos los nuevos productos a la vista administrar
                                        res.redirect('/adminCigarritos');        
                                    
                                
                                    }, 
                                    

                                    indexTabacosPipa: (req, res) => {
                                        //Aca pasamos los datos del archivo Json de Habanos a un Array
                                    let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
                                        res.render(path.resolve(__dirname, "..", "views", "admin", "adminTabacosPipa.ejs"),{productoTabacosPipa});
                                
                                    },
                                    createTabacosPipa: (req, res) => {
                                        //Aca pasamos los datos del archivo Json de Cigarros a un Array
                                        let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                            //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
                                            res.render(path.resolve(__dirname, "..", "views", "admin", "createTabacosPipa.ejs"));
                                    
                                        },
                                        saveTabacosPipa: (req, res) => {
                                            //Aca pasamos los datos del archivo Json de Cigarros a un Array
                                            let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                                //res.send(req.body);
                                                //Aqui indico el formato de como se va a guardar la informacion del producto
                                                
                                                let nuevoTabacosPipa={
                                                    id: productoTabacosPipa.length + 1,
                                                    nombre: req.body.nombre,
                                                    marca:req.body.marca,
                                                    descripcion: req.body.descripcion,
                                                    precio: req.body.precio,
                                                    imagen: req.files.length>0?req.files[0].filename:"default.jpg"
                                                    
                                                };
                                                    //Aquí se agrega al array el nuevo Producto
                                                    productoTabacosPipa.push(nuevoTabacosPipa);
                                                    //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                                                    let nuevoTabacosPipaGuardar = JSON.stringify(productoTabacosPipa,null,2)
                                                    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                                    fs.writeFileSync(path.resolve(__dirname,'..','data','tabaco_pipa.json'),nuevoTabacosPipaGuardar);
                                                    //Aqui redireccionamos los nuevos productos a la vista administrar
                                                    res.redirect('/adminTabacosPipa')
                                            },
                                
                                            showTabacosPipa: (req,res) =>{
                                                //Aca pasamos los datos del archivo Json de Habanos a un Array
                                                let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                                    //res.send(req.params.id);
                                                   //Aca declaro la variable que voy a mandar a la vista 
                                                   let miTabacosPipa;
                                                    productoTabacosPipa.forEach(productoTabacosPipa => {
                                                       if(productoTabacosPipa.id == req.params.id){
                                                           miTabacosPipa = productoTabacosPipa;         
                                                        }
                                                    });
                                                    
                                                    //Aca pongo lo que le voy a mandar a la vista 
                                                    res.render(path.resolve(__dirname, '..','views','admin','detailTabacosPipa.ejs'), {miTabacosPipa})
                                                
                                                },
                                
                                                destroyTabacosPipa:(req, res) => {
                                                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                                                    let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                                        //Esta variable va a guardar el habano que se va a borrar
                                                        const TabacosPipaDeleteId = req.params.id;
                                                        //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
                                                        const TabacosPipaFinal = productoTabacosPipa.filter(productoTabacosPipa => productoTabacosPipa.id != TabacosPipaDeleteId);
                                                        //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                                                        let TabacosPipaGuardar = JSON.stringify(TabacosPipaFinal,null,2)
                                                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                                        fs.writeFileSync(path.resolve(__dirname,'..','data','tabaco_pipa.json'),TabacosPipaGuardar);
                                                        //Aqui redireccionamos los nuevos productos a la vista administrar
                                                        res.redirect('/adminTabacosPipa');
                                                    },
                                              
                                                    editTabacosPipa: (req,res) => {
                                                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                                                    let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                                    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla . 
                                                    const TabacosPipaId = req.params.id;
                                                
                                                    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
                                                        let TabacosPipaEditar= productoTabacosPipa.find(productoTabacosPipa => productoTabacosPipa.id == TabacosPipaId);
                                                    //Aca pongo lo que le voy a mandar a la vista 
                                                    res.render(path.resolve(__dirname, '..','views','admin','editTabacosPipa.ejs'), {TabacosPipaEditar});
                                                
                                                    
                                                
                                                    },
                                               
                                                    updateTabacosPipa(req,res){
                                                        let productoTabacosPipa = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabaco_pipa.json")));
                                                        //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
                                                        req.body.id = req.params.id;
                                                        //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit). 
                                                        //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior. 
                                                        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
                                                        //Aca voy a contener el nuevo habano que ya se actualizo
                                                        let TabacosPipaUpdate = productoTabacosPipa.map(productoTabacosPipa => {
                                                            if(productoTabacosPipa.id == req.body.id){
                                                                return productoTabacosPipa = req.body;
                                                            }
                                                            return productoTabacosPipa;
                                                        });
                                                        let TabacosPipaActualizar = JSON.stringify(TabacosPipaUpdate,null,2)
                                                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                                        fs.writeFileSync(path.resolve(__dirname,'..','data','tabaco_pipa.json'),TabacosPipaActualizar);
                                                        //Aqui redireccionamos los nuevos productos a la vista administrar
                                                        res.redirect('/admin');        
                                                    
                                                
                                                    }, 
                                                    
                                    indexTabacosCigarro: (req, res) => {
                                        //Aca pasamos los datos del archivo Json de Habanos a un Array
                                    let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                        //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
                                        res.render(path.resolve(__dirname, "..", "views", "admin", "adminTabacosCigarro.ejs"),{productoTabacosCigarro});
                                
                                    },
                                    createTabacosCigarro: (req, res) => {
                                        //Aca pasamos los datos del archivo Json de Cigarros a un Array
                                        let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                            //res.sendFile(path.resolve(__dirname, "..", "views", "web", "index.html"));
                                            res.render(path.resolve(__dirname, "..", "views", "admin", "createTabacosCigarro.ejs"));
                                    
                                        },
                                        saveTabacosCigarro: (req, res) => {
                                            //Aca pasamos los datos del archivo Json de Cigarros a un Array
                                            let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                                //res.send(req.body);
                                                //Aqui indico el formato de como se va a guardar la informacion del producto
                                                
                                                let nuevoTabacosCigarro={
                                                    id: productoTabacosCigarro.length + 1,
                                                    nombre: req.body.nombre,
                                                    marca:req.body.marca,
                                                    descripcion: req.body.descripcion,
                                                    precio: req.body.precio,
                                                    imagen: req.files.length>0?req.files[0].filename:"default.jpg"
                                                    
                                                };
                                                    //Aquí se agrega al array el nuevo Producto
                                                    productoTabacosCigarro.push(nuevoTabacosCigarro);
                                                    //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                                                    let nuevoTabacosCigarroGuardar = JSON.stringify(productoTabacosCigarro,null,2)
                                                    //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                                    fs.writeFileSync(path.resolve(__dirname,'..','data','tabacos_cigarros.json'),nuevoTabacosCigarroGuardar);
                                                    //Aqui redireccionamos los nuevos productos a la vista administrar
                                                    res.redirect('/adminTabacosCigarro')
                                            },
                                
                                            showTabacosCigarro: (req,res) =>{
                                                //Aca pasamos los datos del archivo Json de Habanos a un Array
                                                let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                                    //res.send(req.params.id);
                                                   //Aca declaro la variable que voy a mandar a la vista 
                                                   let miTabacosCigarro;
                                                    productoTabacosCigarro.forEach(productoTabacosCigarro => {
                                                       if(productoTabacosCigarro.id == req.params.id){
                                                           miTabacosCigarro = productoTabacosCigarro;         
                                                        }
                                                    });
                                                    
                                                    //Aca pongo lo que le voy a mandar a la vista 
                                                    res.render(path.resolve(__dirname, '..','views','admin','detailTabacosCigarro.ejs'), {miTabacosCigarro})
                                                
                                                },
                                
                                                destroyTabacosCigarro:(req, res) => {
                                                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                                                    let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                                        //Esta variable va a guardar el habano que se va a borrar
                                                        const TabacosCigarroDeleteId = req.params.id;
                                                        //Aca recorre el array y hago un filtro con los productos que fueron borrados deacuerdo a su id, una vez filtrado ,tengo que generar un nuevo array, que contenga los productos filtrados, osea todos los productos excepto los que se borraron
                                                        const TabacosCigarroFinal = productoTabacosCigarro.filter(productoTabacosCigarro => productoTabacosCigarro.id != TabacosCigarroDeleteId);
                                                        //Aqui convierto el Array en un string y le indico que un producto se guarde abajo del otro gracias a null,2 espacios
                                                        let TabacosCigarroGuardar = JSON.stringify(TabacosCigarroFinal,null,2)
                                                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                                        fs.writeFileSync(path.resolve(__dirname,'..','data','tabacos_cigarros.json'),TabacosCigarroGuardar);
                                                        //Aqui redireccionamos los nuevos productos a la vista administrar
                                                        res.redirect('/adminTabacosCigarro');
                                                    },
                                              
                                                    editTabacosCigarro: (req,res) => {
                                                    //Aca pasamos los datos del archivo Json de Habanos a un Array
                                                    let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                                    //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla . 
                                                    const TabacosCigarroId = req.params.id;
                                                
                                                    //Luego dentro de la productoHabanos hay que buscar en el registro lo que hay que Editar:
                                                        let TabacosCigarroEditar= productoTabacosCigarro.find(productoTabacosCigarro => productoTabacosCigarro.id == TabacosCigarroId);
                                                    //Aca pongo lo que le voy a mandar a la vista 
                                                    res.render(path.resolve(__dirname, '..','views','admin','editTabacosCigarro.ejs'), {TabacosCigarroEditar});
                                                
                                                    
                                                
                                                    },
                                               
                                                    updateTabacosCigarro(req,res){
                                                        let productoTabacosCigarro = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","tabacos_cigarros.json")));
                                                        //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
                                                        req.body.id = req.params.id;
                                                        //Aca usamos un if ternario, si la persona no coloco ninguna imagen nueva , es decir no la edito , tendria que volver la Oldimagen ( ver archivo edit). 
                                                        //Si me esta llegando una migen nueva en el req.file entonces guardame el nombre de lo que me esta llegando. En caso de que no haya entrado una imagen nueva, y se mantiene la misma entonces guardame la imagen anterior. 
                                                        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
                                                        //Aca voy a contener el nuevo habano que ya se actualizo
                                                        let TabacosCigarroUpdate = productoTabacosCigarro.map(productoTabacosCigarro => {
                                                            if(productoTabacosCigarro.id == req.body.id){
                                                                return productoTabacosCigarro = req.body;
                                                            }
                                                            return productoTabacosCigarro;
                                                        });
                                                        let TabacosCigarroActualizar = JSON.stringify(TabacosCigarroUpdate,null,2)
                                                        //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                                                        fs.writeFileSync(path.resolve(__dirname,'..','data','tabacos_cigarros.json'),TabacosCigarroActualizar);
                                                        //Aqui redireccionamos los nuevos productos a la vista administrar
                                                        res.redirect('/adminTabacosCigarro');        
                                                    
                                                
                                                    }, 
                                                    
                    
                }
