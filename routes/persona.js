//En este archivo se especifican las rutas que dan acceso a cada una de las funciones de los metodods del controlador
import routerx from 'express-promise-router';
import personaController from '../controllers/PersonaController';
import auth from '../middlewares/auth';

const router = routerx();//Para poder usar como un objeto el modulo npm i express-promise-router --save
router.post('/add', auth.verifyUsuario, personaController.add);//Esta ruta nos dara acceso al metodo add que establecimos y exportamos en controllers/usuarioController
//el vervo post es un metodo de petición http
router.get('/query', auth.verifyUsuario, personaController.query);//Antes de que se ejecute personaController.query primero se verifica el tipo de susario que solicita esa operación mediante auth.verifyAdministrador
router.get('/list', auth.verifyUsuario, personaController.list);
router.get('/listClientes', auth.verifyUsuario, personaController.listClientes);
router.get('/listProveedores', auth.verifyUsuario, personaController.listProveedores);
router.put('/update', auth.verifyUsuario, personaController.update);
router.delete('/remove', auth.verifyUsuario, personaController.remove);
router.put('/activate', auth.verifyUsuario, personaController.activate);
router.put('/deactivate', auth.verifyUsuario, personaController.deactivate);

export default router;