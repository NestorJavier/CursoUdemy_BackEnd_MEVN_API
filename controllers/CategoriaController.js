import models from '../models'  //importamos los modelos de la carpeta models, 
                                //no es necesario indicar el archivo que contiene los modelos ya que se sobre entiende
                                //que el archivo del que e importa esa información es el archivo index.js
export default {  // exportamos las funciones 
    add: async(req, res, next) => {
        try {
            const reg = await models.Categoria.create(req.body);//hacemos referencia a models.categoria.create(), la función create pretenece a mongoose
                                                    //req.body es donde se ha de contener la información que el cliente nos esta enviando para que create lo de de alta en la BD
            res.status(200).json(reg);//Mediante res devolvemos el dato que se ha dedo de alta en la BD, el stsus (200) es un codigo http el cual indica que todo ha salido bien
        } catch (e) {//Si hubuiese algun error
            res.status(500).send({//Enviamos el codigo 500 junto con un mensaje
                message:'Ocurrio un error'
            }); 
            next(e);//el next envia el error a el middle ware morgan
        }
    },                  //permite Agregar una categoria
    query: async(req, res, next) => {
        try {                              //Esto es equivalente a where id = id;, solo que en este caso no es '=' si no ':' 
            const reg = await models.Categoria.findOne({_id:req.query._id})//El parametro que le pasamos el _id este parametro logenera automaticamente mongoDB
            if(!reg){//Si no existe el registro
                res.status(404).send({//Enviamos el error 404 de no encontrado y un mensaje
                    message: 'El registro no existe'
                });
            }else{//Sí, si existe enviamos el registro encontrado
                res.status(200).json(reg)
            }
        } catch (e) {
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(e);
        }
    },                  //Consultar una categoria
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Categoria.find({$or:[{'nombre': new RegExp(valor, 'i')},{'descripcion': new RegExp(valor, 'i')}]}, {createdAt: 0}).sort({createdAt:1}); //el segundo parametro de la función find indica que campos se quieren mostra
            res.status(200).json(reg);                                  //Por ejemplo: {createdAt:0} indica que se mostraran todos los campos excepto el "createdAt" 
        } catch (e) {                                                   //o {createdAt:0, nombre: 0} se mostraran todos los campos esceptuando los que se marcan con cero
            res.status(500).send({                                      //o {nombre:1} solo se mostrara el campo "nombre", sort({nombre:-1}) indica que se han de mostrar de manera 
                message:'Ocurrio un error'                              //decendente tomando como referencia el campo "nombre" o sort({nombre:1}) de esta forma de manera acendente
            }); 
            next(e);
        }
    },                 //listar
    update: async(req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {nombre:req.body.nombre, descripcion:req.body.descripcion});//findByIdAndUpdate recive 2 parametros el primero es el parametro de busqueda y el segundo es el valor que se ha de remplazar
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'Ocurrio un error'
            }); 
            next(e);
        }
    },                 //Actualizar
    remove: async(req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});//findByIdAndDelete recive el Id del registro de que se ha de eliminar
            res.status(200).json(reg);//regresamos el registro que se ha eliminado
        } catch (e) {
            res.status(500).send({
                message:'Ocurrio un error'
            }); 
            next(e);
        }
    },                 //Eliminar 
    activate: async(req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'Ocurrio un error'
            }); 
            next(e);
        }
    },               //Activar categoria
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:0});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'Ocurrio un error'
            }); 
            next(e);
        }
    },             //Desactivar categoria
}//Todas estas son funciones asincronas que hacen las solicitudes a mongo DB