const fs = require('fs');
const path = require('path');

// Aca leemos el archivo json para buscar al usuario. 
//Como estamos usando path y readFile Sync hay que retirarlo
let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));


module.exports = (req,res,next) =>{
    //Variable locals. (Es una variable super global que  vive en   las vistas )
    //va a contener informacion que va a viajar a traves de las vistas.
    //En este caso la variable local va a contener la informacion del usuario. Al ppio lo voy a inicializar con false , porque se que puede comportarse de manera bolleana. Si no tiene nada va a viajar como falsa y si tiene algo va a viajar como true.
    res.locals.usuario = false;
 
 
 // Esta parte del codigo controla si el usuario esta en sesion , si esta logueado yo le doy paso para que entre.
 
 //Si existe algo en esta condicion es porque el usuario esta logueado.
    if(req.session.usuario){

//Si el usuario esta logueado, yo le voy a mandar a la vista los datos  en la variable locals los datos del usuario. Y le voy a mandar el usuario que tengo dentro de sesion que seria el 'session.usuario'.  La variable 'locals.usuarios' es como si fuera una variable de sesion, pero que su comportamiento va a estar sobre las vistas. Es una variable super global.  
        res.locals.usuario = req.session.usuario;
        //Una vez que se cumplen las condiciones vistas anteriormente , es necesario usar el 'next' para que el middleware avance. Si uno no se escapa de los middlewares va a quedar estancado ahi.
        return next();

 //En el caso de que no este en sesion le pregunto si tiene una cookie o no. En el caso de que si tenga una cookie , se va a ejecutar el siguiente codigo.          
    }else if(req.cookies.email){
      // En esta linea se busca al usuario ( que no esta logueado pero si tiene una cookie), y se toma el valor que tiene en la cookie y se pasa ese valor a la vista como si fuera una sesion, para que automaticamente en la vista sepamos que vamos a mostrar.  
        let usuario = archivoUsuarios.find(usuario => usuario.email == req.cookies.email)
        //return res.send(usuario);
        //delete usuario.password;
        // En esta linea vuelvo a meter al usuario en sesion. 
        req.session.usuario = usuario;
        // Aca tengo que mandar adicionalmente esto a la vista.
        res.locals.usuario = usuario;
        return next();
    }else{
        return next();
    }
}