import jwt from 'jsonwebtoken';
import models from '../models';

async function checkToken(token){//Para hacer que la sesión se mantenga siempre abierta lo que se suele hacer es que cuando el token ha expirado se verifica que este sea valido aun que ya se termino su tiempo, una vez verificado esto, se genera un token nuevo apartir del que ya expiró
    let __id = null;
    try {
        const {_id} = await jwt.decode(token);
        __id = _id;
    } catch (e) {
        return false;
    }
    const user = await models.Usuario.findOne({_id: __id, estado:1});
    if(user){
        const token = jwt.sign({_id: __id}, 'clavesecretatoken', {expiresIn: '1d'});
        return {token, rol:user.rol};
    }else{
        return false;
    }
}

export default{
    encode: async(_id, rol, email) =>{      //Primer parametro es el id, segundo parametro es una cadena de texto que es una clave secreta para generar los token, tercer parametro es el tiempo de duración del token, ya sea un minuto una hora o un dia
        const token = jwt.sign({_id: _id, rol: rol, email: email}, 'clavesecretatoken', {expiresIn: '1d'});
        return token;
    },
    decode: async(token) =>{
        try {//el nombre de la constante se pone entre corchetes cuando se requiere obtener un campo de un objeto y no el objeto completo
            const {_id} = await jwt.verify(token, 'clavesecretatoken');
            //Con el '_id' que se obtuvo, se realiza una busqueda mediante el modelo.findOne, where estado = 1 osea que el usuario este activo
            const user = await models.Usuario.findOne({_id,estado:1});
            if(user){//Si existe el usuario
                return user;
            }else{
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}