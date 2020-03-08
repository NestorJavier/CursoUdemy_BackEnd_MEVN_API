//En este archivo se especifican las rutas que dan acceso a cada una de las funciones de los metodods del controlador
import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth'

const router = routerx();//Para poder usar como un objeto el modulo npm i express-promise-router --save
router.post('/add', auth.verifyAdministrador, usuarioController.add);//Esta ruta nos dara acceso al metodo add que establecimos y exportamos en controllers/usuarioController
//el vervo post es un metodo de petición http
router.get('/query', auth.verifyAdministrador, usuarioController.query);//Antes de que se ejecute usuarioController.query primero se verifica el tipo de susario que solicita esa operación mediante auth.verifyAdministrador
router.get('/list', auth.verifyAdministrador, usuarioController.list);
router.put('/update', auth.verifyAdministrador, usuarioController.update);
router.delete('/remove', auth.verifyAdministrador, usuarioController.remove);
router.put('/activate', auth.verifyAdministrador, usuarioController.activate);
router.put('/deactivate', auth.verifyAdministrador, usuarioController.deactivate);
router.post('/login', usuarioController.login);//Para acceder al login no es necesario el middleware auth ya que no importa quien va a acceder al metodo de logueo

export default router;
